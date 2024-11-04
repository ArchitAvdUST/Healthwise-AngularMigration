import mongoose, { Document, Schema } from 'mongoose';

export interface Billing extends Document {
  patientId: string;       // Reference to the associated patient
  appointmentId: string;   // Reference to the associated appointment
  medicines: string;     // List of medicines prescribed
  medicinesCost: number;
  consultationCost: number;
  reportId: string;          // Associated report or description
  reportCost: number;       
  dueDate: string;           // Due date for the payment
}

const BillingSchema: Schema = new Schema({
  patientId: { type: String, required: true },
  appointmentId: { type: String, required: true },
  medicines: { type: String },
  medicinesCost: { type: Number},
  consultaionCost: {type: Number},
  reportId: { type: String, },
  reportCost: {type: Number},
  dueDate: { type: String },
}, { timestamps: false }); // Ensure timestamps are disabled

const Billing = mongoose.model<Billing>('Billing', BillingSchema);

export default Billing;

