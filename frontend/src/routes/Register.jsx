import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      {error && <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-slate-300">Name</label>
          <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm mb-1 text-slate-300">Email</label>
          <input type="email" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm mb-1 text-slate-300">Password</label>
          <input type="password" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm mb-1 text-slate-300">Role</label>
          <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
            <option value="Student">Student</option>
            <option value="Mentor">Mentor</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition">Sign Up</button>
      </form>
      <p className="text-center text-sm text-slate-400 mt-4">Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Login</Link></p>
    </div>
  );
}