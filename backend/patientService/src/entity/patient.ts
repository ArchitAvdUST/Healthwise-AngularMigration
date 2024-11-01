import mongoose, { Document, Schema } from 'mongoose';

export interface Patient extends Document {
  name: string;
  sex: string;
  age: number;
  email: string;
  phone: string;
  //adharNumber: number;
  medicalHistory: string; 
  username: string;
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  //adharNumber: { type: Number},
  medicalHistory: { type: String},
  username: {type: String, required: true, unique:true}
});

const Patient = mongoose.model<Patient>('patient', PatientSchema);

export default Patient;
