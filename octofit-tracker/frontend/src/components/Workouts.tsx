import { useEffect, useState } from 'react';
import { fetchApi, getApiUrl } from '../api';

interface Workout {
  _id: string;
  name: string;
  durationMinutes: number;
  difficulty: string;
  focusArea: string;
}

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchApi<Workout>('workouts');
        setWorkouts(result);
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
      <h2>Workouts</h2>
      <p className="text-muted">
        Endpoint: <code>{getApiUrl('workouts')}</code>
      </p>
      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gy-3">
          {workouts.length === 0 && <div className="alert alert-warning">No workouts found.</div>}
          {workouts.map((workout) => (
            <div key={workout._id} className="col-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">Duration: {workout.durationMinutes} min</p>
                  <p className="card-text">Difficulty: {workout.difficulty}</p>
                  <p className="card-text">Focus: {workout.focusArea}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Workouts;
