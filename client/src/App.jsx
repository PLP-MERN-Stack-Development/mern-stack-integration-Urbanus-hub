import React from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CategoryFilter from "./components/CategoryFilter";
import PostGrid from "./components/PostGrid";
import Footer from "./components/Footer";
import { PostProvider } from "./context/PostContext";
import { AuthProvider } from "./context/AuthContext";

// Your Clerk Publishable Key
const clerkPubKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_your-key-here";
  import CreatorDashboard from "./pages/CreatorDashboard";

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AuthProvider>
        <PostProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            
            <CreatorDashboard/>
          </div>
        </PostProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default App;
