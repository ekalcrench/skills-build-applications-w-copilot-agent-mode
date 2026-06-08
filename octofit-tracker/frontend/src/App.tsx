import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiHost, codespaceName } from './api';

function App() {
  return (
    <main className="container py-5">
      <header className="mb-4">
        <h1 className="mb-3">OctoFit Tracker</h1>
        <p className="lead">
          React 19 presentation tier with Vite and <code>react-router-dom</code> navigation.
        </p>
        <div className="alert alert-info">
          API base URL: <strong>{apiHost}/api</strong>
          <br />
          {codespaceName ? (
            <span>Codespaces: <code>{`https://${codespaceName}-8000.app.github.dev/api`}</code></span>
          ) : (
            <span>Local fallback: <code>http://localhost:8000/api</code></span>
          )}
        </div>
        <div className="mb-3">
          <NavLink className="btn btn-outline-primary me-2" to="/users">
            Users
          </NavLink>
          <NavLink className="btn btn-outline-primary me-2" to="/teams">
            Teams
          </NavLink>
          <NavLink className="btn btn-outline-primary me-2" to="/activities">
            Activities
          </NavLink>
          <NavLink className="btn btn-outline-primary me-2" to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className="btn btn-outline-primary" to="/workouts">
            Workouts
          </NavLink>
        </div>
      </header>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route
          path="/"
          element={
            <div className="alert alert-secondary">
              Select a section above to view data from the backend API.
            </div>
          }
        />
      </Routes>

      <footer className="mt-4">
        <p className="text-muted small">
          Note: `VITE_CODESPACE_NAME` should be defined in your environment (for example in `.env.local`).
        </p>
      </footer>
    </main>
  );
}

export default App;
