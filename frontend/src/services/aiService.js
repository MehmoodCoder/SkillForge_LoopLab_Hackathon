import API from '../api/axios';

// 1. Auth Login
export const loginUser = async (email, password) => {
  const res = await API.post('/auth/login', { email, password });
  if (res.data?.token) {
    localStorage.setItem('access_token', res.data.token);
  }
  return res.data;
};

// 2. Create or Update Student Profile
export const saveStudentProfile = async (profileData) => {
  const res = await API.post('/student/profile', profileData);
  return res.data;
};

// 3. Submit Assessment
export const submitAssessment = async (assessmentData) => {
  const res = await API.post('/student/assessment', assessmentData);
  return res.data;
};

// 4. Analyze Skills
export const analyzeSkills = async (profileData) => {
  const res = await API.post('/student/analyze-skills', profileData);
  return res.data;
};

// 5. Generate Roadmap
export const generateRoadmap = async (profileData) => {
  const res = await API.post('/student/generate-roadmap', profileData);
  return res.data;
};

// 6. RAG AI Assistant
export const askAIAssistant = async (userQuery) => {
  const res = await API.post('/ai/rag-assistant', { query: userQuery });
  return res.data;
};