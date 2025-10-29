
// routes/categoryRoutes.js
import logger from '../middleware/logger.js';
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
router.post('/', protect,logger, authorize('creator'), createCategory);
router.put('/:id', protect,logger, authorize('creator'), updateCategory);
router.delete('/:id', protect, logger,authorize('creator'), deleteCategory);

export default router;