import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
const workoutSchema = new Schema({
    name: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focusArea: { type: String, required: true }
}, { timestamps: true });
const Workout = models.Workout || model('Workout', workoutSchema);
export default Workout;
