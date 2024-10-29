import mongoose, { Document, Schema } from 'mongoose';

export interface Timing extends Document {
  doctorId: string;  // Reference to the associated doctor
  date: string;      // Date of the appointment
  time: string;      // Time of the appointment
}

const TimingSchema: Schema = new Schema({
  doctorId: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
}, { timestamps: false }); // Ensure timestamps are disabled

const Timing = mongoose.model<Timing>('Timing', TimingSchema);

export default Timing;
