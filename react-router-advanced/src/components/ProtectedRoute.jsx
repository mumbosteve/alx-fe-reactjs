import React from "react";
import { Navigate } from "react-router-dom";

// Simple custom hook to simulate authentication
function useAuth() {
  // You can replace this with real auth logic later
  const user = localStorage.getItem("user"); // or a state variable
  return { isAuthenticated: !!user };
}

// ProtectedRoute component
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login page
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if authenticated
  return children;
}
