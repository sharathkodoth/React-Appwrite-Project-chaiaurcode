import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/service";
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className="bg-neutral-300">
            <div className="masonry sm:masonry-sm md:masonry-md gap-10 p-20 mx-28">
                {posts.map((post) => (
                    <div key={post.$id} className="pb-2 break-inside">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Home