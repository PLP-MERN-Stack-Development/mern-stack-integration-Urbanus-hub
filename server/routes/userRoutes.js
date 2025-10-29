// routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  updatePassword,
  getUsers,
  getUser,
  deleteUser,
  getCreators,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/creators', getCreators);
router.get('/:id', getUser);

// Protected routes (require authentication)
router.get('/me/profile', protect, getMe);
router.put('/me/profile', protect, updateProfile);
router.put('/me/password', protect, updatePassword);

// Admin/Creator routes
router.get('/', protect, authorize('creator'), getUsers);
router.delete('/:id', protect, authorize('creator'), deleteUser);

export default router;