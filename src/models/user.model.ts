import mongoose, { Document } from "mongoose";

export interface IUser extends Document{
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
    dateOfBirth: string,
    avatar: string
};

const userSchema = new mongoose.Schema<IUser>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    avatar: { type: String, required: true, default: 'default.jpeg' }
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);