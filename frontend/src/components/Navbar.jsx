import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import API from '../api/axios';

export default function Navbar({ user, setUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Active Link Checker
  const isActive = (path) => location.pathname === path;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
      setUser(null);
      setDropdownOpen(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md px-4 sm:px-8 py-3 flex justify-between items-center shadow-xl sticky top-0 z-50">
      
      {/* Brand Logo - Navigates to Home */}
      <Link 
        to="/" 
        className="flex items-center gap-2 group transition-all duration-200"
      >
        <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-white group-hover:opacity-90">
          SkillForge
        </span>
        <span className="text-lg sm:text-xl transform group-hover:scale-110 group-hover:rotate-12 transition duration-200">
          🚀
        </span>
      </Link>

      {/* Right Navigation & Profile Section */}
      <div className="flex gap-2 sm:gap-6 items-center">
        {user ? (
          <>
            {/* Upper Main Nav Links */}
            <div className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
              <Link
                to="/"
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive('/') 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Home
              </Link>

              <Link
                to="/profile"
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive('/profile') 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Profile
              </Link>

              {(user.role === 'Mentor' || user.role === 'Admin') && (
                <Link
                  to="/students"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive('/students') 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Students Roster
                </Link>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative ml-1" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 hover:brightness-110 text-white font-bold flex items-center justify-center border border-indigo-400/30 shadow-lg shadow-indigo-500/20 transition-all uppercase focus:outline-none"
              >
                {user.name ? user.name.charAt(0) : 'U'}
              </button>

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 border-b border-slate-800/80">
                    <p className="text-xs font-bold text-slate-100 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] rounded-md uppercase font-bold tracking-wider">
                      {user.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/80 hover:text-white transition font-medium"
                    >
                      <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Home
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/80 hover:text-white transition font-medium"
                    >
                      <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>

                    {(user.role === 'Mentor' || user.role === 'Admin') && (
                      <Link
                        to="/students"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/80 hover:text-white transition font-medium"
                      >
                        <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        Students Roster
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-slate-800/80 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition font-medium"
                    >
                      <svg className="w-3.5 h-3.5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Link 
              to="/login" 
              className="text-slate-300 hover:text-white px-3.5 py-1.5 text-xs font-semibold transition"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition shadow-md shadow-indigo-600/20"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}