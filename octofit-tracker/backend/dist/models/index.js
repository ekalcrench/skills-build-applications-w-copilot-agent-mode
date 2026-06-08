import mongoose from 'mongoose';
import User from './user.js';
import Team from './team.js';
import Activity from './activity.js';
import LeaderboardEntry from './leaderboard.js';
import Workout from './workout.js';
export const connectToDatabase = async (uri) => {
    await mongoose.connect(uri);
};
export { mongoose, User, Team, Activity, LeaderboardEntry, Workout };
