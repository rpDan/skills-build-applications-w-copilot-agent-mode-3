import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('/api/users/').then(setUsers).catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <section className="resource-section">
      <div className="section-heading"><span className="eyebrow">Community</span><h1>Members</h1><p>Meet the people building stronger routines.</p></div>
      <div className="resource-grid">
        {users.map((user) => <article className="resource-card" key={user._id}><div className="avatar">{user.displayName?.slice(0, 1)}</div><h2>{user.displayName}</h2><p>@{user.username}</p><span className="badge text-bg-light">{user.fitnessLevel}</span></article>)}
      </div>
      {!users.length && <p className="empty-state">No members found.</p>}
    </section>
  );
}

export default Users;