import User from "../models/User.js";
import { clerkClient } from '@clerk/backend';

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, role } = req.body;

    const fieldsToUpdate = {};

    if (name) fieldsToUpdate.name = name;
    if (role) fieldsToUpdate.role = role;

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    // Also update in Clerk if name changed
    if (name) {
      const [firstName, ...lastNameParts] = name.split(" ");
      await clerkClient.users.updateUser(req.user.clerkId, {
        firstName: firstName,
        lastName: lastNameParts.join(" "),
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all users (Creator only)
// @route   GET /api/users
// @access  Private/Creator
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Public
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Creator
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Also delete from Clerk
    await clerkClient.users.deleteUser(user.clerkId);

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all creators
// @route   GET /api/users/creators
// @access  Public
export const getCreators = async (req, res) => {
  try {
    const creators = await User.find({ role: "creator" });

    res.status(200).json({
      success: true,
      count: creators.length,
      data: creators,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Sync user from Clerk webhook
// @route   POST /api/users/webhook
// @access  Public (but verified by Clerk)
export const handleClerkWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    switch (type) {
      case "user.created":
        // Create user in our database when created in Clerk
        await User.create({
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          name:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
          avatar: data.image_url,
          role: "reader",
        });
        break;

      case "user.updated":
        // Update user in our database
        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses[0]?.email_address,
            name:
              `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
              "User",
            avatar: data.image_url,
          }
        );
        break;

      case "user.deleted":
        // Delete user from our database
        await User.findOneAndDelete({ clerkId: data.id });
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Sync Clerk-authenticated user into local DB (create if missing)
// @route   GET /api/users/sync
// @access  Private (Clerk)
export const syncUser = async (req, res) => {
  try {
    // The clerkAuth.protect middleware will ensure req.user exists (it finds or creates the user)
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
