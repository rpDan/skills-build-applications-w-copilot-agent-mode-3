import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const resources = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: Leaderboard,
  workouts: Workout,
};

app.use(express.json());

app.get('/', (_request, response) => {
  response.json({ name: 'OctoFit Tracker API', baseUrl });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

for (const [resourceName, model] of Object.entries(resources)) {
  app.get(`/api/${resourceName}/`, async (_request, response, next) => {
    try {
      const documents = await model.find().lean();
      response.json(documents);
    } catch (error) {
      next(error);
    }
  });

  app.post(`/api/${resourceName}/`, async (request, response, next) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });
}

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });