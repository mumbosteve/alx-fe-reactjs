import React from "react";
import { Link, Outlet, Routes, Route } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

export default function Profile() {
  return (
    <div>
      <h1>👤 User Profile</h1>
      <nav className="flex gap-4 mt-2">
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>

      {/* Alternatively, you can use <Outlet /> for nested routing */}
      <Outlet />
    </div>
  );
}
