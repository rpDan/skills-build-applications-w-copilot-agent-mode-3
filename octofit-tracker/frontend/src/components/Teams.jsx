import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(teamsEndpoint).then(setTeams).catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <section className="resource-section">
      <div className="section-heading"><span className="eyebrow">Find your people</span><h1>Teams</h1><p>Shared goals make the miles more meaningful.</p></div>
      <div className="resource-grid">{teams.map((team) => <article className="resource-card team-card" key={team._id}><span className="card-kicker">{team.members?.length || 0} members</span><h2>{team.name}</h2><p>{team.description}</p></article>)}</div>
      {!teams.length && <p className="empty-state">No teams found.</p>}
    </section>
  );
}

export default Teams;