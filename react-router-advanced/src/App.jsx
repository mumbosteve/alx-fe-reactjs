import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./components/Profile";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div className="p-6">
        <nav className="flex gap-4 mb-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/blog/1">Blog Post 1</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Protected Route */}
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Dynamic Blog Route */}
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
