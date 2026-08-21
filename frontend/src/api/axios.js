import axios from 'axios';

// 1. Node.js Backend (Auth & Database)
export const nodeAPI = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// 2. Python FastAPI AI Engine (Updated Ngrok URL)
export const pythonAPI = axios.create({
  baseURL: import.meta.env.VITE_PYTHON_API_URL || 'https://single-subdivide-kilogram.ngrok-free.dev/api/v1',
  withCredentials: true,
});

export default nodeAPI;