import mongoose from "mongoose";
import Doctor from "./entity/doctor";
const doctors = require('../doctors.json');

export const connectDb = async() => {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/doctor_service');
        console.log(`MongoDB connected: ${conn.connection.host}`);
        await Doctor.deleteMany({});
        await Doctor.insertMany(doctors);
        console.log('Doctors seeded');
    }
    catch(error){
        console.log(error);
    }
};