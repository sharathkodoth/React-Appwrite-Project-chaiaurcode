import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/service";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initial loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts(); // Use async/await
                if (response) {
                    setPosts(response.documents);
                } else {
                    console.error("Failed to fetch posts"); // Optional error logging
                }
            } catch (error) {
                console.error("Error fetching posts:", error); // Error handling
                setError(error); // Update error state
            } finally {
                setIsLoading(false); // Ensure loading state update even on errors
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="bg-neutral-900">
            {isLoading ? (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex justify-center">
                            <div className="p-2">
                                <h1 className="text-2xl font-bold">Loading posts...</h1>
                            </div>
                        </div>
                    </Container>
                </div>
            ) : error ? (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex justify-center">
                            <div className="p-2">
                                <h1 className="text-2xl font-bold text-red-500">
                                    Error fetching posts: {error.message}
                                </h1>
                                <button onClick={() => fetchPosts()}>Retry</button>
                            </div>
                        </div>
                    </Container>
                </div>
            ) : (
                posts.length === 0 ? (
                    <div className="w-full py-8 mt-4 text-center">
                        <Container>
                            <div className="flex justify-center">
                                <div className="p-2">
                                    <h1 className="text-2xl font-bold hover:text-gray-500">
                                        Login to read posts
                                    </h1>
                                </div>
                            </div>
                        </Container>
                    </div>
                ) : ( // Only render posts if present
                    <div className="masonry sm:masonry-sm md:masonry-md gap-10 p-20 mx-28">
                        {posts.map((post) => (
                            <div key={post.$id} className="pb-2 break-inside">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}

export default Home;
