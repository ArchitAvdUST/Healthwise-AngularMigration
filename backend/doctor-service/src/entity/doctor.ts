import mongoose, { Document, Schema } from 'mongoose';

export interface Doctor extends Document {
  name: string;
  sex : string;
  age: number;
  email: string;
  phone: string;
  specialization: string; 
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  age: {type: Number, required: true},
  specialization: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const Doctor = mongoose.model<Doctor>('doctor', DoctorSchema);

export default Doctor;
