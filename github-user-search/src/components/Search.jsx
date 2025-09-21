import { fetchUserData } from "../services/githubService";

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const data = await fetchUserData(username, location, minRepos);
    setResults(data.items); // GitHub returns users inside "items"
  } catch (err) {
    setError("Looks like we can’t find any users.");
  } finally {
    setLoading(false);
  }
};
