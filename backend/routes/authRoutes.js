import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import User from '../models/UserModel.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;