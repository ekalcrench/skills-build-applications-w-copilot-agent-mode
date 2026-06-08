import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard.js';
const router = Router();
router.get('/', async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });
    res.json(leaderboard);
});
router.post('/', async (req, res) => {
    const newEntry = await LeaderboardEntry.create(req.body);
    res.status(201).json(newEntry);
});
export default router;
