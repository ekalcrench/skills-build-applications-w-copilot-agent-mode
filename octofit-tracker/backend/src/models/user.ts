import mongoose, { type Document } from 'mongoose';

const { Schema, model, models } = mongoose;

export interface UserDocument extends Document {
  name: string;
  email: string;
  teamId?: string;
  age?: number;
  role?: string;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamId: { type: String },
    age: { type: Number },
    role: { type: String, default: 'member' }
  },
  { timestamps: true }
);

const User = models.User || model<UserDocument>('User', userSchema);
export default User;
