import mongoose, { type Document } from 'mongoose';

const { Schema, model, models } = mongoose;

export interface WorkoutDocument extends Document {
  name: string;
  durationMinutes: number;
  difficulty: string;
  focusArea: string;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    name: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focusArea: { type: String, required: true }
  },
  { timestamps: true }
);

const Workout = models.Workout || model<WorkoutDocument>('Workout', workoutSchema);
export default Workout;
