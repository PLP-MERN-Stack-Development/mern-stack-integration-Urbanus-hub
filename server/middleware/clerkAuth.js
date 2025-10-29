//we can use this or auth.js
//
import { clerkMiddleware, requireAuth } from '@clerk/express';
import User from '../models/User.js';

// Base Clerk middleware - attach auth to req
export const clerkAuth = clerkMiddleware();

// Protect routes - requires authentication
export const protect = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const { userId } = req.auth;

      if (!userId) {
        return res.status(401).json({ 
          success: false,
          message: 'Not authorized - No user ID' 
        });
      }

      // Find or create user in our database
      let user = await User.findOne({ clerkId: userId });

      if (!user) {
        // Get user details from Clerk (already available in req.auth)
        const clerkUser = req.auth.sessionClaims;
        
        // Create new user
        user = await User.create({
          clerkId: userId,
          email: clerkUser.email || clerkUser.primaryEmailAddress?.emailAddress,
          name: clerkUser.fullName || clerkUser.firstName || 'User',
          avatar: clerkUser.imageUrl || 'default-avatar.jpg',
          role: 'reader',
        });
      }

      // Attach user to request
      req.user = user;
      
      next();
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ 
        success: false,
        message: 'Authentication failed',
        error: error.message
      });
    }
  }
];

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};