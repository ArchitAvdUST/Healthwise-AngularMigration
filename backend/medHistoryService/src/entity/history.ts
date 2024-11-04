import mongoose, { Document, Schema } from 'mongoose';

export interface History extends Document {
  patientId: string;
  history: {
    date: string;
    time: string;
    doctorUserName: string;
    symptoms: string;
  }[];
}

const HistorySchema = new Schema<History>({
  patientId: {
    type: String,
    required: true,
  },
  history: [
    {
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      doctorUserName: {
        type: String,
        required: true,
      },
      symptoms: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model<History>('History', HistorySchema);
