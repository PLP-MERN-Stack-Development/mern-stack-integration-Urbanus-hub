// routes/categoryRoutes.js
import express from 'express';
import {
  getCategories,
  getCategory,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryPosts,
  getCategoryStats,
} from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', getCategory);
router.get('/:id/posts', getCategoryPosts);
router.get('/:id/stats', getCategoryStats);

// Protected routes (Creator only)
router.post('/', protect, authorize('creator'), createCategory);
router.put('/:id', protect, authorize('creator'), updateCategory);
router.delete('/:id', protect, authorize('creator'), deleteCategory);

export default router;