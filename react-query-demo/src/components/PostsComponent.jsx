import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};

export default function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // cache data for 5 minutes
  });

  if (isLoading)
    return <p className="text-center text-gray-600">Loading posts...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500">
        Error fetching posts: {error.message}
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Posts ({posts.length})
        </h2>
        <button
          onClick={() => refetch()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          {isFetching ? "Refreshing..." : "Refetch Posts"}
        </button>
      </div>

      <ul className="space-y-4">
        {posts.slice(0, 10).map((post) => (
          <li
            key={post.id}
            className="border-b border-gray-200 pb-3 hover:bg-gray-50 p-3 rounded-lg"
          >
            <h3 className="font-semibold text-gray-900">{post.title}</h3>
            <p className="text-gray-700 text-sm">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
