"use client"

import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react"

const RecentPosts = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
  
      async function fetchPosts() {
        const response = await fetch('/api/post');
        const result = await response.json();
        console.log(result)
        setPosts(result)
      }
  
      fetchPosts()
  
    },[])

  return (
    <div className="w-screen flex flex-col gap-10 items-center">
        <h1 className="text-4xl">Recent Posts</h1>
        {posts ? (
            <div className="mx-auto w-[70vw] grid grid-cols-3 gap-10">
                {posts.map(post => (
                <PostCard post={post} key={post.title} />
                ))}
            </div>
        ) : (
            <div className="mx-auto">You currently have no posts</div>
        )}
    </div>
  )
}

export default RecentPosts

