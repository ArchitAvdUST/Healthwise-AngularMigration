import mongoose, { Document, Schema } from 'mongoose';

export interface History extends Document {
  patientId: string; // Reference to the associated patient
  history: string;    // The report content
  date: string;       // Date of the appointment
  time: string;       // Time of the appointment
  doctorUserName: string; // Doctor's username for reference
  symptoms: string;       // Symptoms reported during the appointment
}

const HistorySchema: Schema = new Schema({
  patientId: { type: String, required: true },
  history: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  doctorUserName: { type: String, required: true },
  symptoms: { type: String, required: true },
});

const History = mongoose.model<History>('History', HistorySchema);

export default History;
