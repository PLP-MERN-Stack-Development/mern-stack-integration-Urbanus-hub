// routes/userRoutes.js
import express from 'express';
import {
  getMe,
  updateProfile,
  getUsers,
  getUser,
  deleteUser,
  getCreators,
  handleClerkWebhook,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/clerkAuth.js';

const router = express.Router();

// Public routes
router.get('/creators', getCreators);
router.get('/:id', getUser);
router.post('/webhook', handleClerkWebhook); // Clerk webhook endpoint

// Protected routes (require authentication)
router.get('/me/profile', protect, getMe);
router.put('/me/profile', protect, updateProfile);

// Creator routes
router.get('/', protect, authorize('creator'), getUsers);
router.delete('/:id', protect, authorize('creator'), deleteUser);

export default router;