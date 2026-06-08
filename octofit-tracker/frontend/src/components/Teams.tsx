import { useEffect, useState } from 'react';
import { fetchApi, getApiUrl } from '../api';

interface Team {
  _id: string;
  name: string;
  captain: string;
  members: number;
  memberIds?: string[];
}

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchApi<Team>('teams');
        setTeams(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      <p className="text-muted">
        Endpoint: <code>{getApiUrl('teams')}</code>
      </p>
      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {teams.length === 0 && <div className="alert alert-warning">No teams found.</div>}
          {teams.map((team) => (
            <div key={team._id} className="list-group-item">
              <h5>{team.name}</h5>
              <p className="mb-1">Captain: {team.captain}</p>
              <p className="mb-1">Members: {team.members}</p>
              <p className="mb-0">Member IDs: {team.memberIds?.join(', ') || '—'}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Teams;
