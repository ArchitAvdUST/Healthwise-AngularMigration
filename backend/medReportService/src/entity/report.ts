import mongoose, { Document, Schema } from 'mongoose';

export interface Report extends Document {
  appointmentId: string; // Reference to the associated appointment
  report: string;        // The report content
}

const ReportSchema: Schema = new Schema({
  appointmentId: { type: String, required: true },
  report: { type: String, required: true },
});

const Report = mongoose.model<Report>('Report', ReportSchema);

export default Report;
