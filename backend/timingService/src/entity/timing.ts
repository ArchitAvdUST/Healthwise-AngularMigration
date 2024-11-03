import mongoose, { Document, Schema } from 'mongoose';

export interface Timing extends Document {
  doctorId: string;
  date: Date;  // Full date and time combined if storing as a single timestamp
  time: { start: Date, end: Date }[]; // Alternatively, array of time intervals
}


// Updated TimingSchema to include availability for each slot
const TimingSchema: Schema = new Schema({
  doctorId: { type: String, required: true },
  date: { type: Date, required: true },
  slots: [
    {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
      isAvailable: { type: Boolean, default: true }
    }
  ]
}, { timestamps: false });



const Timing = mongoose.model<Timing>('Timing', TimingSchema);

export default Timing;
