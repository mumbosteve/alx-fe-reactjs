import { useState } from "react";
import { fetchAdvancedUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);

    try {
      const results = await fetchAdvancedUserData(username, location, minRepos);
      if (results.items.length === 0) {
        setError("Looks like we cant find the user");
      } else {
        setUsers(results.items);
      }
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        GitHub User Search
      </h1>
      
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-white shadow-md rounded-lg p-4"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search by username"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Filter by location"
          className="border p-2 rounded-md"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Minimum repositories"
          className="border p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-6">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {users.length > 0 && (
          <div className="grid gap-4 mt-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 bg-gray-100 rounded-md shadow"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="font-bold text-lg">{user.login}</h2>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
