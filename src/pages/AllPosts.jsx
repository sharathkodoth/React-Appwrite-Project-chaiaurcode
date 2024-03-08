import React, { useEffect, useState } from "react";
import { PostCard } from "../components";
import appwriteService from "../appwrite/service";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full h-full">
      
      <div>
            <div className="masonry sm:masonry-sm md:masonry-md gap-10 p-20 mx-28">
                {posts.map((post) => (
                    <div key={post.$id} className="pb-2 break-inside">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </div>
      
    </div>
  );
}

export default AllPosts;
