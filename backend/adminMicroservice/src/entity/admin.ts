import mongoose, { Document, Schema } from 'mongoose';

export interface Admin extends Document {
  id: string;  // Unique identifier for the admin
  name: string; // Admin's name
}

const AdminSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const Admin = mongoose.model<Admin>('Admin', AdminSchema);

export default Admin;
