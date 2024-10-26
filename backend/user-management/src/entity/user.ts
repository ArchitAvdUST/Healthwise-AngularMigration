import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    username: string;
    password: string;
    role: string
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, required: true}
});

const User = mongoose.model<User>('user', UserSchema);

export default User;