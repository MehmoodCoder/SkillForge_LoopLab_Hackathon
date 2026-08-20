import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './routes/Home.jsx';
import Register from './routes/Register.jsx';
import Login from './routes/Login.jsx';
import StudentList from './routes/StudentList.jsx';
import Profile from './routes/Profile.jsx';
import Navbar from './components/Navbar.jsx';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar user={user} setUser={setUser} />

      <main className="flex-1 container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" replace />} />
          <Route path="/students" element={user ? <StudentList /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}