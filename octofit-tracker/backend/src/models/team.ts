import mongoose, { type Document } from 'mongoose';

const { Schema, model, models } = mongoose;

export interface TeamDocument extends Document {
  name: string;
  captain: string;
  members: number;
  memberIds: string[];
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    captain: { type: String, required: true },
    members: { type: Number, required: true },
    memberIds: { type: [String], default: [] }
  },
  { timestamps: true }
);

const Team = models.Team || model<TeamDocument>('Team', teamSchema);
export default Team;
