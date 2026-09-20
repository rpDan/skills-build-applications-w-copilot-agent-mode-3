import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { API_BASE_URL } from './api';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar"><NavLink to="/" className="brand"><span className="brand-mark"><img src="/octofitapp-small.png" alt="" /></span><span>Octofit <em>Tracker</em></span></NavLink><span className="api-status"><span className="status-dot" /> API connected</span></header>
      <div className="app-body">
        <aside className="sidebar"><p className="nav-label">Explore</p><nav>{[['/', 'Overview'], ['/activities', 'Activities'], ['/workouts', 'Workouts'], ['/teams', 'Teams'], ['/leaderboard', 'Leaderboard'], ['/users', 'Members']].map(([path, label]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}</nav><div className="sidebar-note"><small>Connected to</small><strong>{API_BASE_URL.replace('https://', '').replace('http://', '')}</strong></div></aside>
        <main className="content"><Routes><Route path="/" element={<Navigate to="/activities" replace />} /><Route path="/activities" element={<Activities />} /><Route path="/workouts" element={<Workouts />} /><Route path="/teams" element={<Teams />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/users" element={<Users />} /></Routes></main>
      </div>
    </div>
  );
}

export default App;
