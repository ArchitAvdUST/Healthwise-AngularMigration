import mongoose, { Document, Schema } from 'mongoose';

export interface History extends Document {
  patientId: string; // Reference to the associated patient
  history: string;    // The report content
}

const HistorySchema: Schema = new Schema({
  patientId: { type: String, required: true },
  history: { type: String, required: true },
});

const History = mongoose.model<History>('History', HistorySchema);

export default History;
