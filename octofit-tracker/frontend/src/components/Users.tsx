import { useEffect, useState } from 'react';
import { fetchApi, getApiUrl, normalizeApiResponse } from '../api';

interface User {
  _id: string;
  name: string;
  email: string;
  age?: number;
  role?: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const fetchedUsers = await fetchApi<User>('users');
        setUsers(fetchedUsers);
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
      <h2>Users</h2>
      <p className="text-muted">
        Endpoint: <code>{getApiUrl('users')}</code>
      </p>
      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age ?? '—'}</td>
                  <td>{user.role ?? 'member'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <div className="alert alert-warning">No users found.</div>}
        </div>
      )}
    </section>
  );
};

export default Users;
