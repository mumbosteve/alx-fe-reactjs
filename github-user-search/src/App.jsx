// src/App.jsx
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import { getUser } from "./services/githubService";

function App() {
  const [user, setUser] = useState(null);

  const handleSearch = async (username) => {
    const userData = await getUser(username);
    setUser(userData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      <UserCard user={user} />
    </div>
  );
}

export default App;
