import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
const leaderboardSchema = new Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true }
}, { timestamps: true });
const LeaderboardEntry = models.LeaderboardEntry || model('LeaderboardEntry', leaderboardSchema);
export default LeaderboardEntry;
