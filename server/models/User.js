// models/User.js
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    // Clerk ID to link Clerk user with our local user record
    clerkId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["creator", "reader"],
      default: "reader",
    },
    avatar: {
      type: String,
      default: "default-avatar.jpg",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
