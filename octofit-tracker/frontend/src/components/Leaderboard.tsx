import { useEffect, useState } from 'react';
import { fetchApi, getApiUrl } from '../api';

interface Entry {
  _id: string;
  userId: string;
  userName: string;
  score: number;
  rank: number;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchApi<Entry>('leaderboard');
        setEntries(result);
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
      <h2>Leaderboard</h2>
      <p className="text-muted">
        Endpoint: <code>{getApiUrl('leaderboard')}</code>
      </p>
      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center">
                    No leaderboard entries.
                  </td>
                </tr>
              )}
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.rank}</td>
                  <td>{entry.userName}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
