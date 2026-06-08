import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamId: { type: String },
    age: { type: Number },
    role: { type: String, default: 'member' }
}, { timestamps: true });
const User = models.User || model('User', userSchema);
export default User;
