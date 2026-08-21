import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form States
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [education, setEducation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [careerGoal, setCareerGoal] = useState('');
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', link: '' });
  const [certifications, setCertifications] = useState([]);
  const [newCert, setNewCert] = useState('');

const userId = user?.id || user?._id;

  // Fetch Current User Profile
  useEffect(() => {
    console.log('Fetching profile for user:', userId);
    if (!userId) {
      setLoading(false);
      return;
    }
    
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/profile/${userId}`);
        const data = res.data;
        if (data) {
          setSkills(data.skills || []);
          setEducation(data.education || '');
          setExperienceLevel(data.experienceLevel || 'Beginner');
          setCareerGoal(data.careerGoal || '');
          setProjects(data.projects || []);
          setCertifications(data.certifications || []);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  // Handlers
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleAddProject = () => {
    if (newProject.title.trim()) {
      setProjects([...projects, newProject]);
      setNewProject({ title: '', description: '', link: '' });
    }
  };

  const handleAddCert = () => {
    if (newCert.trim()) {
      setCertifications([...certifications, newCert.trim()]);
      setNewCert('');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await API.put(`/profile/${userId}`, {
        skills,
        education,
        experienceLevel,
        careerGoal,
        projects,
        certifications,
      });

      setMessage({ type: 'success', text: 'Profile saved successfully!' });
      
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (err) {
      console.error('Update Profile Error:', err.response || err);
      const errMsg = err.response?.data?.message || err.message || 'Failed to save profile.';
      setMessage({ type: 'error', text: errMsg });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you absolutely sure? This action is permanent and will delete all your data.')) {
      try {
        await API.delete(`/profile/${userId}`);
        setUser(null);
        navigate('/register');
      } catch (err) {
        setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to delete account.' });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-3">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-xs font-medium">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 px-3 sm:px-0 pb-12">
      
      {/* Header Banner Section */}
      <div className="bg-slate-800/90 border border-slate-700/80 p-5 sm:p-6 rounded-2xl shadow-lg backdrop-blur flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold text-lg flex items-center justify-center shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{user?.name}</h1>
            <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-2">
              <span>{user?.email}</span>
              <span className="text-indigo-400 font-semibold text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md uppercase">
                {user?.role}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={handleDeleteAccount}
          type="button"
          className="w-full sm:w-auto bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5 shrink-0"
        >
          <svg 
            className="w-3.5 h-3.5 shrink-0" 
            style={{ width: '14px', height: '14px', minWidth: '14px' }} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Delete Account</span>
        </button>
      </div>

      {/* Alert Messages */}
      {message.text && (
        <div className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 transition ${
          message.type === 'success'
            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
          {message.text}
        </div>
      )}

      {/* Main Form Section */}
      <form onSubmit={handleUpdateProfile} className="bg-slate-800/90 border border-slate-700/80 p-5 sm:p-7 rounded-2xl shadow-xl space-y-6">
        
        {/* Basic Details Grid */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Education</label>
              <input
                type="text"
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                placeholder="e.g. BS Computer Science"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Experience Level</label>
              <select
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl p-2.5 text-xs text-gray-800 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs text-slate-300 font-medium">Career Goal</label>
              <input
                type="text"
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                placeholder="e.g. Full Stack Developer"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/60"></div>

        {/* Skills & Certifications Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Skills */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Skills</h2>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-slate-900/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                placeholder="Add skill (e.g. React)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 rounded-xl transition text-xs font-medium flex items-center justify-center shrink-0"
              >
                <svg 
                  className="w-3.5 h-3.5 shrink-0" 
                  style={{ width: '14px', height: '14px', minWidth: '14px' }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((skill, i) => (
                <span key={i} className="bg-slate-900 border border-slate-700/80 text-indigo-300 text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  {skill}
                  <button type="button" onClick={() => setSkills(skills.filter(s => s !== skill))} className="text-slate-400 hover:text-red-400 transition">
                    <svg 
                      className="w-3 h-3 shrink-0" 
                      style={{ width: '12px', height: '12px', minWidth: '12px' }} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              {skills.length === 0 && <span className="text-[11px] text-slate-500 italic">No skills added yet.</span>}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Certifications</h2>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-slate-900/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                placeholder="e.g. AWS Certified"
                value={newCert}
                onChange={(e) => setNewCert(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCert())}
              />
              <button
                type="button"
                onClick={handleAddCert}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 rounded-xl transition text-xs font-medium flex items-center justify-center shrink-0"
              >
                <svg 
                  className="w-3.5 h-3.5 shrink-0" 
                  style={{ width: '14px', height: '14px', minWidth: '14px' }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {certifications.map((cert, i) => (
                <div key={i} className="px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg flex justify-between items-center text-xs">
                  <span className="text-slate-300 truncate pr-2">{cert}</span>
                  <button type="button" onClick={() => setCertifications(certifications.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-red-400 transition">
                    <svg 
                      className="w-3 h-3 shrink-0" 
                      style={{ width: '12px', height: '12px', minWidth: '12px' }} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              {certifications.length === 0 && <span className="text-[11px] text-slate-500 italic">No certifications added.</span>}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/60"></div>

        {/* Projects Section */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Portfolio Projects</h2>
          
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/70 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                placeholder="Project Title"
                className="bg-slate-900 border border-slate-700/80 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="GitHub or Live URL"
                className="bg-slate-900 border border-slate-700/80 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              />
            </div>
            <textarea
              placeholder="Short Description..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-indigo-500 h-16 resize-none"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <button
              type="button"
              onClick={handleAddProject}
              className="w-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1"
            >
              <svg 
                className="w-3.5 h-3.5 shrink-0" 
                style={{ width: '14px', height: '14px', minWidth: '14px' }} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {projects.map((proj, i) => (
              <div key={i} className="p-3 bg-slate-900/80 border border-slate-700/80 rounded-xl flex flex-col justify-between hover:border-slate-600 transition">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="font-semibold text-white text-xs truncate">{proj.title}</h4>
                    <button type="button" onClick={() => setProjects(projects.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-red-400 transition shrink-0">
                      <svg 
                        className="w-3 h-3 shrink-0" 
                        style={{ width: '12px', height: '12px', minWidth: '12px' }} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mb-2">{proj.description}</p>
                </div>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] text-indigo-400 hover:underline truncate flex items-center gap-1">
                    <svg 
                      className="w-3 h-3 shrink-0" 
                      style={{ width: '12px', height: '12px', minWidth: '12px' }} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-semibold py-3 rounded-xl transition shadow-md shadow-indigo-600/20 text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"></div>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}