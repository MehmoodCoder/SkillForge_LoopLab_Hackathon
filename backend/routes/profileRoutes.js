import express from 'express';
import {
  getProfileById,
  updateProfileById,
  deleteProfileById,
  getAllStudents
} from '../controllers/profileController.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  '/students',
  authenticate,
  authorizeRoles('Mentor', 'Admin'),
  getAllStudents
);

router.get('/:id', authenticate, getProfileById);
router.put('/:id', authenticate, updateProfileById);
router.delete('/:id', authenticate, deleteProfileById);

export default router;