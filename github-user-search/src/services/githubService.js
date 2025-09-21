import axios from "axios";

const BASE_URL = "https://api.github.com/search/users";

/**
 * Fetch GitHub users based on search criteria
 * @param {string} username - GitHub username (or partial)
 * @param {string} location - Location filter
 * @param {number} minRepos - Minimum number of public repositories
 */
export const fetchUserData = async (username, location, minRepos) => {
  try {
    let query = "";

    if (username) query += `${username}+`;
    if (location) query += `location:${location}+`;
    if (minRepos) query += `repos:>=${minRepos}`;

    // Clean trailing '+'
    query = query.trim().replace(/\+$/, "");

    const response = await axios.get(`${BASE_URL}?q=${query}`);
    return response.data; // contains items array with users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
