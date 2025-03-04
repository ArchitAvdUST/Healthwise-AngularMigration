import mongoose from "mongoose";

export const connectDb = async() => {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/admin_service');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log(error);
    }
};