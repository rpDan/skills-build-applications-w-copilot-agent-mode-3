import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(activitiesEndpoint).then(setActivities).catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <section className="resource-section">
      <div className="section-heading"><span className="eyebrow">Recent movement</span><h1>Activities</h1><p>Small efforts, recorded consistently.</p></div>
      <div className="table-shell"><table className="table align-middle mb-0"><thead><tr><th>Type</th><th>Duration</th><th>Distance</th><th>Calories</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td><strong>{activity.type}</strong></td><td>{activity.durationMinutes} min</td><td>{activity.distanceKm ? `${activity.distanceKm} km` : '-'}</td><td>{activity.calories}</td><td>{new Date(activity.completedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>
      {!activities.length && <p className="empty-state">No activities found.</p>}
    </section>
  );
}

export default Activities;