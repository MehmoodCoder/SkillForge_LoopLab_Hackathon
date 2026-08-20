import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Home({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchUserProfile = async () => {
      try {
        const res = await API.get(`/profile/${user.id}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Home profile error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center mt-20 max-w-xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-white">
          Welcome to SkillForge
        </h1>
        <p className="text-slate-400">
          Connect with mentors, display your tech stack, and manage developer
          profiles.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-medium transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner Card */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl flex justify-between items-center">
        <div>
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full uppercase font-bold tracking-wider">
            {user.role} Dashboard
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">
            Welcome Back, {user.name}!
          </h1>
          <p className="text-slate-400 text-sm mt-1">{user.email}</p>
        </div>
        <Link
          to="/profile"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg"
        >
          Manage Profile
        </Link>
      </div>

      {/* User Dynamic Backend Details */}
      {loading ? (
        <div className="text-slate-400 text-center py-8">
          Loading profile details...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stats & Info */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-2">
              Overview
            </h3>
            <div>
              <p className="text-xs text-slate-400 uppercase">Education</p>
              <p className="text-slate-200 font-medium">
                {profile?.education || "Not Specified"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">
                Experience Level
              </p>
              <span className="inline-block mt-1 px-3 py-1 bg-slate-900 border border-slate-700 text-indigo-400 text-xs rounded-lg font-semibold">
                {profile?.experienceLevel || "Beginner"}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Career Goal</p>
              <p className="text-slate-200 font-medium">
                {profile?.careerGoal || "Not Specified"}
              </p>
            </div>
          </div>

          {/* Skills Display */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-2">
              Your Skills
            </h3>
            {profile?.skills && profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs px-3 py-1.5 rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                No skills added yet. Go to your profile to add skills.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
