import mongoose, { type Document } from 'mongoose';

const { Schema, model, models } = mongoose;

export interface ActivityDocument extends Document {
  type: string;
  durationMinutes: number;
  userId: string;
  distanceKm?: number;
  caloriesBurned?: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    userId: { type: String, required: true },
    distanceKm: { type: Number },
    caloriesBurned: { type: Number },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

const Activity = models.Activity || model<ActivityDocument>('Activity', activitySchema);
export default Activity;
