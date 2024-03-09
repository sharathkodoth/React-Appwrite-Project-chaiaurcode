import React, { useEffect, useState } from "react";
import { PostCard, Spinner } from "../components";
import appwriteService from "../appwrite/service";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts([]);
        if (response) {
          setPosts(response.documents);
        } else {
          console.error("Failed to fetch posts"); // Optional error handling
        }
      } catch (error) {
        console.error("Error fetching posts:", error); // Error handling
      } finally {
        setIsLoading(false); // Ensure loading state is updated even on errors
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="mt-5 w-full h-full">
      {isLoading ? (
        <Spinner/>
      ) : (
        <div>
          <div className="masonry sm:masonry-sm md:masonry-md gap-10 p-20 mx-28">
            {posts.map((post) => (
              <div key={post.$id} className="pb-2 break-inside">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPosts;
