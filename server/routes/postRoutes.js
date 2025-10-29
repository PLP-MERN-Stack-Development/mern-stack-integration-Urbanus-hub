// routes/postRoutes.js
import express from 'express';
import {
  getPosts,
  getPost,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
  getPostsByAuthor,
  getMyPosts,
  togglePublish,
  getPopularPosts,
  getRelatedPosts,
} from '../controllers/postController.js';
import { protect, authorize } from '../middleware/auth.js';
import logger from '../middleware/logger.js';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/popular', getPopularPosts);
router.get('/slug/:slug', getPostBySlug);
router.get('/author/:userId', getPostsByAuthor);
router.get('/:id', getPost);
router.get('/:id/related', getRelatedPosts);

// Protected routes (require authentication)
router.post('/:id/comments', protect,logger, addComment);
router.delete('/:id/comments/:commentId', protect,logger, deleteComment);

// Creator only routes
router.post('/', protect,logger, authorize('creator'), createPost);
router.patch('/:id', protect,logger, authorize('creator'), updatePost);
router.delete('/:id', protect,logger, authorize('creator'), deletePost);
router.patch('/:id/publish', protect,logger, authorize('creator'), togglePublish);
router.get('/me/posts', protect,logger, authorize('creator'), getMyPosts);

export default router;