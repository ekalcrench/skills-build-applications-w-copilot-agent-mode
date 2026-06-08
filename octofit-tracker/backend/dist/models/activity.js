import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
const activitySchema = new Schema({
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    userId: { type: String, required: true },
    distanceKm: { type: Number },
    caloriesBurned: { type: Number },
    date: { type: Date, required: true }
}, { timestamps: true });
const Activity = models.Activity || model('Activity', activitySchema);
export default Activity;
