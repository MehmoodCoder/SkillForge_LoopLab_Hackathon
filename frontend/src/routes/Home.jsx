import { useState, useEffect } from 'react';
import API from '../api/axios.js';
import AIChat from '../components/AIChat';

export default function Home({ user }) {
    console.log("Home.jsx user:", user);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = user?.id || user?._id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    console.log("asdfghjkl", userId);
    

    const fetchHomeProfile = async () => {
      try {
        const res = await API.get(`/profile/${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error('Home profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 text-slate-400 text-xs">
        Loading Home...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h1 className="text-2xl font-bold text-white">
          Welcome Back, {user ? user.name : 'Guest'}!
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {user ? `Role: ${user.role}` : 'Please log in to manage your profile.'}
        </p>
      </div>

      {/* Database Saved Data Display */}
      {user && profile && (
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/80 space-y-4">
          <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">
            Your MongoDB Profile Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 font-medium block">Education:</span>
              <p className="text-slate-200 mt-0.5">{profile.education || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Experience Level:</span>
              <p className="text-slate-200 mt-0.5">{profile.experienceLevel || 'Beginner'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-slate-500 font-medium block mb-1">Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((s, i) => (
                    <span key={i} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-md text-[11px]">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500">No skills added yet</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {user && <AIChat />}
    </div>
  );
}