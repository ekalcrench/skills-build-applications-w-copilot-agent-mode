import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
const teamSchema = new Schema({
    name: { type: String, required: true },
    captain: { type: String, required: true },
    members: { type: Number, required: true },
    memberIds: { type: [String], default: [] }
}, { timestamps: true });
const Team = models.Team || model('Team', teamSchema);
export default Team;
