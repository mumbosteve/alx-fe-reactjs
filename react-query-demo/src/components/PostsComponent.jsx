import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

const PostsComponent = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    // 👇 React Query Caching Options
    cacheTime: 1000 * 60 * 5, // Keep data in cache for 5 minutes (even if component unmounts)
    staleTime: 1000 * 30, // Data considered fresh for 30 seconds
    refetchOnWindowFocus: true, // Refetch when the user focuses the window
    keepPreviousData: true, // Keep old data while new data is being fetched
  });

  if (isLoading) return <p className="text-gray-500 text-center">Loading posts...</p>;
  if (isError) return <p className="text-red-500 text-center">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-blue-600">📜 Posts List</h1>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          🔄 Refetch Posts
        </button>
      </div>

      <ul className="space-y-3">
        {posts.slice(0, 10).map((post) => (
          <li
            key={post.id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
