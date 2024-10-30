import User, {User as UserType} from "../entity/user";
import { Request,Response } from "express";
const bcrypt = require('bcrypt');

import jwt, {JwtPayload} from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
    userId: string;
    role: string;
}

// Generate JWT Token
function generateToken(user: UserType): string {
    return jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user);
    return res.json({ token });
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

export const getUser = async (req: Request, res: Response) => {
    try{
        const {username} = req.params;
        const user = await User.findOne({username: username});
        if(user){
            res.status(200).json(user);
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

export const getAllUsers = async (req: Request,res:Response) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message: "Error while fetching all users",error});
    }
};
