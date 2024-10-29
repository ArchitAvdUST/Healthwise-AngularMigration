import mongoose, { Document, Schema } from 'mongoose';

export interface Billing extends Document {
  patientId: string;       // Reference to the associated patient
  appointmentId: string;   // Reference to the associated appointment
  medicines: string[];     // List of medicines prescribed
  reportId: string;          // Associated report or description
  totalCost: number;       // Total cost of the billing
  dueDate: string;           // Due date for the payment
}

const BillingSchema: Schema = new Schema({
  patientId: { type: String, required: true },
  appointmentId: { type: String, required: true },
  medicines: { type: [String], required: true },
  reportId: { type: String, required: true },
  totalCost: { type: Number, required: true },
  dueDate: { type: String, required: true },
}, { timestamps: false }); // Ensure timestamps are disabled

const Billing = mongoose.model<Billing>('Billing', BillingSchema);

export default Billing;
