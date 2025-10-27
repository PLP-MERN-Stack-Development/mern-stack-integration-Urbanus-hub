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

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/popular', getPopularPosts);
router.get('/slug/:slug', getPostBySlug);
router.get('/author/:userId', getPostsByAuthor);
router.get('/:id', getPost);
router.get('/:id/related', getRelatedPosts);

// Protected routes (require authentication)
router.post('/:id/comments', protect, addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);

// Creator only routes
router.post('/', protect, authorize('creator'), createPost);
router.put('/:id', protect, authorize('creator'), updatePost);
router.delete('/:id', protect, authorize('creator'), deletePost);
router.patch('/:id/publish', protect, authorize('creator'), togglePublish);
router.get('/me/posts', protect, authorize('creator'), getMyPosts);

export default router;