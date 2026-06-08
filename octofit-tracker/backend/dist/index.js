import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const PORT = Number(process.env.PORT ?? 8000);
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const apiBaseUrl = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.githubpreview.dev/api`
    : `http://localhost:${PORT}/api`;
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.get('/api', (_req, res) => {
    res.json({ status: 'ok', apiUrl: apiBaseUrl, port: PORT, environment: CODESPACE_NAME ? 'codespaces' : 'local' });
});
app.get('/', (_req, res) => {
    res.redirect('/api');
});
mongoose
    .connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Backend listening on http://localhost:${PORT}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
});
