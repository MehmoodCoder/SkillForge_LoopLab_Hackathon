import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await API.get('/profile/students');
        setStudents(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Access Restricted or Failed to load.');
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Student Roster</h1>
      {error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">{error}</div>
      ) : (
        <div className="grid gap-4">
          {students.map((profile) => (
            <div key={profile._id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center shadow-md">
              <div>
                <h3 className="text-lg font-bold text-indigo-300">{profile.userId?.name || 'N/A'}</h3>
                <p className="text-sm text-slate-400">{profile.userId?.email}</p>
              </div>
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-medium rounded-full">
                {profile.userId?.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}