import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from './api/axios.js';
import Home from './routes/Home.jsx';
import Register from './routes/Register.jsx';
import Login from './routes/Login.jsx';
import StudentList from './routes/StudentList.jsx';
import Profile from './routes/Profile.jsx';
import Navbar from './components/Navbar.jsx';

export default function App() {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await API.get('/auth/me');
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("dfghjk",user);
    
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-xs text-slate-400">Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar user={user} setUser={setUser} />

      <main className="flex-1 container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route 
            path="/profile" 
            element={
              user ? (
                <Profile user={user} setUser={setUser} refreshUser={fetchUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/students" 
            element={user ? <StudentList /> : <Navigate to="/login" replace />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}