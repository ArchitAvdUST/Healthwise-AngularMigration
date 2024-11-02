import mongoose from "mongoose";
import Pharmacy from "./entity/pharmacy";
const pharmacyData = [
  {
    name: 'Paracetamol',
    price: '50',
    stock: '100',
  },
  {
    name: 'Ibuprofen',
    price: '80',
    stock: '200',
  },
  {
    name: 'Crocin',
    price: '35',
    stock: '150',
  },
  {
    name: 'Dolo 650',
    price: '150',
    stock: '75',
  },
  {
    name: 'Metformin',
    price: '12.00',
    stock: '50',
  },
  // Add more entries as needed
];

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/pharmacy_service');
    console.log(`MongoDB connected: ${conn.connection.host}`);
    await Pharmacy.deleteMany({});
    await Pharmacy.insertMany(pharmacyData);
    console.log('Pharmacy data has been successfully seeded!');
  }
  catch (error) {
    console.log(error);
  }
};