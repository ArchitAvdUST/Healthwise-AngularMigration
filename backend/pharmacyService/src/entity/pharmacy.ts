import mongoose, { Document, Schema } from 'mongoose';

export interface Pharmacy extends Document {
  name: string;    // Name of the medicine
  price: string;   // Price of the medicine
  stock: string;   // Quantity in stock
}

const PharmacySchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
}, { timestamps: false }); // Disable timestamps

const Pharmacy = mongoose.model<Pharmacy>('Pharmacy', PharmacySchema);

export default Pharmacy;
