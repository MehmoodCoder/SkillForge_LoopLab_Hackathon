import express from 'express';
import {
  getProfileById,
  updateProfileById,
  deleteProfileById,
  getAllStudents
} from '../controllers/profileController.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Specific routes pehle aane chahiye (IMPORTANT FIX!)
router.get(
  '/students',
  authenticate,
  authorizeRoles('Mentor', 'Admin'), // Sirf Mentor aur Admin dekh sakte hain
  getAllStudents
);

// Dynamic routes baad me
router.get('/:id', authenticate, getProfileById);
router.put('/:id', authenticate, updateProfileById);
router.delete('/:id', authenticate, authorizeRoles('Admin'), deleteProfileById);

export default router;