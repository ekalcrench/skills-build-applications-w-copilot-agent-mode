import { useEffect, useState } from 'react';
import { fetchApi, getApiUrl } from '../api';

interface Activity {
  _id: string;
  type: string;
  durationMinutes: number;
  userId: string;
  distanceKm?: number;
  caloriesBurned?: number;
  date?: string;
}

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchApi<Activity>('activities');
        setActivities(result);
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
      <h2>Activities</h2>
      <p className="text-muted">
        Endpoint: <code>{getApiUrl('activities')}</code>
      </p>
      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gy-3">
          {activities.length === 0 && <div className="alert alert-warning">No activities found.</div>}
          {activities.map((activity) => (
            <div key={activity._id} className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{activity.type}</h5>
                  <p className="card-text mb-1">Duration: {activity.durationMinutes} min</p>
                  <p className="card-text mb-1">User ID: {activity.userId}</p>
                  {activity.distanceKm != null && <p className="card-text mb-1">Distance: {activity.distanceKm} km</p>}
                  {activity.caloriesBurned != null && <p className="card-text mb-1">Calories: {activity.caloriesBurned}</p>}
                  {activity.date && <p className="card-text"><small className="text-muted">{new Date(activity.date).toLocaleString()}</small></p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Activities;
