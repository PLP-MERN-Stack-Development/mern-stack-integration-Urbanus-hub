// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateProfile,
  updatePassword,
  getUsers,
  getUser,
  deleteUser,
  getCreators,
} from "../controllers/userController.js";
import { protect, authorize } from "../middleware/auth.js";
import logger from "../middleware/logger.js";

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// Auth routes
router.post("/register",  registerUser);
router.post("/login",  loginUser);
router.post("/logout",  logoutUser);

// Public user routes (specific paths BEFORE dynamic params)
router.get("/creators", logger, getCreators);

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

// Current user routes (MUST come before /:id to avoid conflicts)
router.get("/me", protect, getMe);
router.get("/me/profile", protect, getMe); // Alias
router.put("/me/profile", protect, updateProfile);
router.put("/me/password", protect, updatePassword);

// Admin/Creator routes
router.get("/", protect, authorize("admin", "creator"), getUsers);

// 

// These MUST come after all specific routes to avoid matching conflicts
router.get("/:id", logger, getUser); // Public - get user by ID
router.delete("/:id", protect, authorize("admin", "creator"), deleteUser);

export default router;