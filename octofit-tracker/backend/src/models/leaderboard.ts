import mongoose, { type Document } from 'mongoose';

const { Schema, model, models } = mongoose;

export interface LeaderboardDocument extends Document {
  userId: string;
  userName: string;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true }
  },
  { timestamps: true }
);

const LeaderboardEntry = models.LeaderboardEntry || model<LeaderboardDocument>('LeaderboardEntry', leaderboardSchema);
export default LeaderboardEntry;
