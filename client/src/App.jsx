import React from "react";
import { PostProvider } from "./context/PostContext";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import CreatorDashboard from "./pages/CreatorDashboard";
import Reader from "./pages/Reader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Routes>
            <Route path="/*" element={<Reader />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<CreatorDashboard />} />
          </Routes>
        </div>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
