import { Router } from 'express';
import Team from '../models/team.js';
const router = Router();
router.get('/', async (_req, res) => {
    const teams = await Team.find();
    res.json(teams);
});
router.post('/', async (req, res) => {
    const newTeam = await Team.create(req.body);
    res.status(201).json(newTeam);
});
export default router;
