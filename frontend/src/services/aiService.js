import { nodeAPI, pythonAPI } from '../api/axios';

// 1. Auth Login (Node.js)
export const loginUser = async (email, password) => {
  const res = await nodeAPI.post('/auth/login', { email, password });
  if (res.data?.token) {
    localStorage.setItem('access_token', res.data.token);
  }
  return res.data;
};

// 2. Create or Update Student Profile (Node.js)
export const saveStudentProfile = async (profileData) => {
  const res = await nodeAPI.post('/student/profile', profileData);
  return res.data;
};

// 3. Submit Assessment (Node.js)
export const submitAssessment = async (assessmentData) => {
  const res = await nodeAPI.post('/student/assessment', assessmentData);
  return res.data;
};

// 4. Analyze Skills (Python FastAPI)
export const analyzeSkills = async (profileData) => {
  const token = localStorage.getItem('access_token');
  const res = await pythonAPI.post('/student/analyze-skills', profileData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// 5. Generate Roadmap (Python FastAPI)
export const generateRoadmap = async (profileData) => {
  const token = localStorage.getItem('access_token');
  const res = await pythonAPI.post('/student/generate-roadmap', profileData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// 6. RAG AI Assistant (Python FastAPI) - Added Token Authorization
export const askAIAssistant = async (userQuery) => {
  const token = localStorage.getItem('access_token');
  const res = await pythonAPI.post('/ai/rag-assistant', 
    { query: userQuery },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.data;
};