import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <section className="resource-section">
      <div className="section-heading"><span className="eyebrow">Your next session</span><h1>Workouts</h1><p>Choose a focused session and get moving.</p></div>
      <div className="resource-grid">{workouts.map((workout) => <article className="resource-card workout-card" key={workout._id}><div className="workout-meta"><span className="badge text-bg-light">{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><div className="tag-list">{workout.targetMuscles?.map((muscle) => <span key={muscle}>{muscle}</span>)}</div></article>)}</div>
      {!workouts.length && <p className="empty-state">No workouts found.</p>}
    </section>
  );
}

export default Workouts;