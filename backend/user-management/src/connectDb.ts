import mongoose from "mongoose";
import User from "./entity/user";
const bcrypt = require('bcrypt');

const doctorCredentials = [
    {
        "username": "dr.lisa.rodriguez",
        "password": "password123",
        "role": "doctor"
    },
    {
        "username": "dr.sarah.collins",
        "password": "password123",
        "role": "doctor"
    },
    {
        "username": "dr.benjamin.tran",
        "password": "password123",
        "role": "doctor"
    },
    {
        "username": "dr.michael.chen",
        "password": "password123",
        "role": "doctor"
    },
    {
        "username": "dr.priya.nair",
        "password": "password123",
        "role": "doctor"
    },
    {
        "username": "dr.raj.patel",
        "password": "password123",
        "role": "doctor"
    },
    {
        "username": "dr.aisha.malik",
        "password": "password123",
        "role": "doctor"
    },
    {
        "username": "dr.kevin.gomez",
        "password": "password123",
        "role": "doctor"
    },
    {
        "username": "dr.emily.zhao",
        "password": "password123",
        "role": "doctor"
    },
    {
        "username": "dr.john.kim",
        "password": "password123",
        "role": "doctor"
    },
    {
        "username": "doctor",
        "password":"doctor123",
        "role":"doctor"
    },
    {
        "username":"pharmacist",
        "password":"pharmacist123",
        "role":"pharmacy"
    }
];

async function hashPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10; // Higher number = more secure but slower
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
}

async function upsertDoctors(doctors: any[]) {
    const upsertPromises = doctors.map(async (doctor: { username: any, password: string}) => {
        const doctorWithHashedPassword = {
            ...doctor,
            password: await hashPassword(doctor.password),
        };
      return User.updateOne(
        { username: doctor.username }, // Match by unique field
        { $set: doctorWithHashedPassword },
        { upsert: true } // Insert if not found, otherwise update
      );
    });
    await Promise.all(upsertPromises); // Wait for all operations to complete
}


export const connectDb = async() => {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/doctor_service');
        console.log(`MongoDB connected: ${conn.connection.host}`);
        upsertDoctors(doctorCredentials);
        console.log('Doctor credentials added');
    }
    catch(error){
        console.log(error);
    }
};