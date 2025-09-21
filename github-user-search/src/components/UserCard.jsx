// src/components/UserCard.jsx
import React from "react";

function UserCard({ user }) {
  if (!user) return null;

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
      <img src={user.avatar_url} alt={user.login} width="100" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        Visit GitHub Profile
      </a>
    </div>
  );
}

export default UserCard;
