import User from "../entity/user";
import { Request,Response } from "express";
const bcrypt = require('bcrypt');

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
