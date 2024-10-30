import User, {User as UserType} from "../entity/user";
import { Request,Response } from "express";
const bcrypt = require('bcrypt');

import jwt, {JwtPayload} from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface TokenPayload extends JwtPayload {
    userId: string;
    role: string;
}

// Generate JWT Token
function generateToken(user: UserType): string {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
    }
    return jwt.sign(
        {
            username: user.username,
            role: user.role,
        },
        jwtSecret, // Ensure JWT_SECRET is a string
        { expiresIn: '1h' }
    );
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    try {
        // Retrieve user directly in the login function
        const user = await User.findOne({ username });
        
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = generateToken(user);
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Error during login", error });
    }
};


async function hashPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10; // Higher number = more secure but slower
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
}

export const createUser = async (req: Request, res: Response) => {
    try{
        const user = new User(req.body);
        user.password = await hashPassword(user.password);
        await user.save();
        res.status(201).json(user);
    }
    catch(error){
        res.status(500).json({message:"Error while creating a user",error});
    }
};

export const getUser = async (username: string): Promise<{ user?: any; error?: string }> => {
    try {
        const user = await User.findOne( {username} );
        if (user) {
            return { user };
        } else {
            return { error: "User not found" };
        }
    } catch (error) {
        return { error: "Error while fetching user" };
    }
};

export const getAllUsers = async (req: Request,res:Response) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message: "Error while fetching all users",error});
    }
};

export const getRoleByUsername = async (req: Request, res: Response) => {
    try{
        const {username} = req.params;
        const user = await User.findOne({username: username});
        if(user){
            res.status(200).json(user.role);
        }
        else
        {
            res.status(404).json({message:"User not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Error while fetching user",error});
    }
};
