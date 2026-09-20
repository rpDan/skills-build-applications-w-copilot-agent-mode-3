import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex.runner', email: 'alex@example.com', displayName: 'Alex Rivera', fitnessLevel: 'intermediate' },
      { username: 'jamie.lifts', email: 'jamie@example.com', displayName: 'Jamie Chen', fitnessLevel: 'advanced' },
      { username: 'sam.moves', email: 'sam@example.com', displayName: 'Sam Patel', fitnessLevel: 'beginner' },
    ]);
    const teams = await Team.create([
      { name: 'Summit Striders', description: 'A friendly team focused on consistent outdoor training.', captain: users[0]._id, members: users.map((user: { _id: unknown }) => user._id) },
      { name: 'Iron Circuit', description: 'Strength and conditioning enthusiasts.', captain: users[1]._id, members: [users[1]._id] },
    ]);
    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 42, distanceKm: 6.4, calories: 510, completedAt: new Date('2026-09-18T07:30:00Z') },
      { user: users[1]._id, type: 'strength', durationMinutes: 55, calories: 430, completedAt: new Date('2026-09-19T17:00:00Z') },
      { user: users[2]._id, type: 'yoga', durationMinutes: 30, calories: 150, completedAt: new Date('2026-09-19T08:00:00Z') },
    ]);
    await Leaderboard.create([
      { user: users[0]._id, points: 840, activitiesCompleted: 18, rank: 1 },
      { user: users[1]._id, points: 760, activitiesCompleted: 15, rank: 2 },
      { user: users[2]._id, points: 320, activitiesCompleted: 8, rank: 3 },
    ]);
    await Workout.create([
      { title: 'Full-Body Foundation', description: 'A balanced strength session for building dependable movement patterns.', difficulty: 'beginner', durationMinutes: 30, exercises: ['Bodyweight squat', 'Incline push-up', 'Glute bridge', 'Dead bug'], targetMuscles: ['legs', 'chest', 'core'] },
      { title: 'Runner Power Session', description: 'A focused session to support speed, stability, and running economy.', difficulty: 'intermediate', durationMinutes: 40, exercises: ['Split squat', 'Calf raise', 'Single-leg deadlift', 'Plank'], targetMuscles: ['legs', 'glutes', 'core'] },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
    await disconnectDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    await disconnectDatabase();
    process.exit(1);
  }
}

seedDatabase();
