import { useState } from "react";
import { getUser } from "./services/githubService";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await getUser(username);
      setUserData(data);
    } catch (error) {
      setUserData(null);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🔍 GitHub User Search</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {userData && (
        <div style={{ marginTop: "20px" }}>
          <img src={userData.avatar_url} alt="avatar" width="100" />
          <h2>{userData.login}</h2>
          <p>{userData.bio || "No bio available"}</p>
          <a href={userData.html_url} target="_blank">View Profile</a>
        </div>
      )}
    </div>
  );
}

export default App;
