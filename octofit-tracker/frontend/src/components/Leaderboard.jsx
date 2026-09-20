import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard').then((items) => setLeaders([...items].sort((a, b) => a.rank - b.rank))).catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <section className="resource-section">
      <div className="section-heading"><span className="eyebrow">Keep the streak alive</span><h1>Leaderboard</h1><p>Celebrate progress, whatever the pace.</p></div>
      <div className="leaderboard-list">{leaders.map((leader) => <article className="leader-row" key={leader._id}><span className="rank">{String(leader.rank).padStart(2, '0')}</span><div><strong>{leader.user?.displayName || leader.user}</strong><small>{leader.activitiesCompleted} activities</small></div><strong className="points">{leader.points} pts</strong></article>)}</div>
      {!leaders.length && <p className="empty-state">No leaderboard entries found.</p>}
    </section>
  );
}

export default Leaderboard;