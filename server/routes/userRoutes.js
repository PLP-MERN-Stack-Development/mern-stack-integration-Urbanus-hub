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
  syncUser,
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
// Sync route: call this once after a Clerk sign-in to ensure local user record exists
router.get('/sync', protect, syncUser);

// Creator routes
router.get('/', protect, authorize('creator'), getUsers);
router.delete('/:id', protect, authorize('creator'), deleteUser);

export default router;