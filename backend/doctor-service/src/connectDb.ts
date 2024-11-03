import mongoose from "mongoose";
import Doctor from "./entity/doctor";
const doctors = require('../doctors.json');

async function upsertDoctors(doctors: any[]) {
    const upsertPromises = doctors.map((doctor: { username: any}) => {
      return Doctor.updateOne(
        { username: doctor.username }, // Match by unique field
        { $set: doctor },
        { upsert: true } // Insert if not found, otherwise update
      );
    });
    await Promise.all(upsertPromises); // Wait for all operations to complete
}  

export const connectDb = async() => {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/doctor_service');
        console.log(`MongoDB connected: ${conn.connection.host}`);
        upsertDoctors(doctors);
        console.log('Doctors seeded');
    }
    catch(error){
        console.log(error);
    }
};