import mongoose from 'mongoose';
import User from '../models/user.ts';
import Team from '../models/team.ts';
import Activity from '../models/activity.ts';
import LeaderboardEntry from '../models/leaderboard.ts';
import Workout from '../models/workout.ts';
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
console.log('Seed the octofit_db database with test data');
async function seed() {
    await mongoose.connect(MONGO_URI);
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        LeaderboardEntry.deleteMany({}),
        Workout.deleteMany({})
    ]);
    const users = await User.create([
        { name: 'Maya Chen', email: 'maya.chen@octofit.com', age: 28, role: 'athlete' },
        { name: 'Noah Patel', email: 'noah.patel@octofit.com', age: 32, role: 'athlete' },
        { name: 'Avery Lewis', email: 'avery.lewis@octofit.com', age: 26, role: 'coach' }
    ]);
    const teams = await Team.create([
        { name: 'OctoRunners', captain: users[0]._id.toString(), members: 5, memberIds: users.slice(0, 2).map((user) => user._id.toString()) },
        { name: 'Wave Warriors', captain: users[1]._id.toString(), members: 4, memberIds: [users[1]._id.toString()] }
    ]);
    await Activity.create([
        { type: 'running', durationMinutes: 38, userId: users[0]._id.toString(), distanceKm: 6.2, caloriesBurned: 420, date: new Date('2026-06-01T07:30:00Z') },
        { type: 'cycling', durationMinutes: 52, userId: users[1]._id.toString(), distanceKm: 18.9, caloriesBurned: 630, date: new Date('2026-06-02T15:00:00Z') },
        { type: 'strength training', durationMinutes: 45, userId: users[2]._id.toString(), caloriesBurned: 310, date: new Date('2026-06-03T18:00:00Z') }
    ]);
    await Workout.create([
        { name: 'Morning Mobility Flow', durationMinutes: 20, difficulty: 'beginner', focusArea: 'flexibility' },
        { name: 'High-Intensity Interval Run', durationMinutes: 30, difficulty: 'advanced', focusArea: 'endurance' },
        { name: 'Upper Body Strength Circuit', durationMinutes: 40, difficulty: 'intermediate', focusArea: 'strength' }
    ]);
    await LeaderboardEntry.create([
        { userId: users[0]._id.toString(), userName: users[0].name, score: 1180, rank: 1 },
        { userId: users[1]._id.toString(), userName: users[1].name, score: 1045, rank: 2 },
        { userId: users[2]._id.toString(), userName: users[2].name, score: 980, rank: 3 }
    ]);
    const [userCount, teamCount, activityCount, workoutCount, leaderboardCount] = await Promise.all([
        User.countDocuments(),
        Team.countDocuments(),
        Activity.countDocuments(),
        Workout.countDocuments(),
        LeaderboardEntry.countDocuments()
    ]);
    console.log('Seed complete:');
    console.log(`  users: ${userCount}`);
    console.log(`  teams: ${teamCount}`);
    console.log(`  activities: ${activityCount}`);
    console.log(`  workouts: ${workoutCount}`);
    console.log(`  leaderboard entries: ${leaderboardCount}`);
    await mongoose.disconnect();
}
seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
