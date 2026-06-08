# AI Agent Instructions for OctoFit Tracker

## Key backend conventions

- The backend lives in `octofit-tracker/backend`.
- Use TypeScript + Express + Mongoose for backend logic.
- Keep the backend server port at `8000`.
- Use MongoDB on `27017`.
- The backend should connect to a local MongoDB database named `octofit_db`.
- The backend database config file should be `octofit-tracker/backend/src/config/database.ts` and must reference `mongoose` and `octofit_db`.

## Seed data expectations

- There should be a seed script at `octofit-tracker/backend/src/scripts/seed.ts`.
- This script should log or comment: `Seed the octofit_db database with test data`.
- The seed script should insert realistic example documents for users, teams, activities, leaderboard entries, and workouts.

## Command behavior

- Do not change the current working directory in shell commands.
- Always use path-qualified commands when creating or modifying files.
- Prefer existing repo conventions and avoid duplicating documentation from `README.md` or `docs/octofit_story.md`.
