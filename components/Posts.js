"use client"

import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react"
import BlogCarousel from "./BlogCarousel";
import { InfinitySpin } from "react-loader-spinner";

const Posts = ({ category }) => {
    const [posts, setPosts] = useState(null)

    console.log(category)

    useEffect(() => {
  
      async function fetchPosts() {
        const response = await fetch(`/api/post/${category}`);
        const result = await response.json();
        console.log(result)
        setPosts(result)
      }
  
      fetchPosts()
  
    },[])

  return (
    <div className="w-screen flex flex-col gap-10 items-center pt-10 pr-5 pl-2">
        {posts && <BlogCarousel posts={posts} />}
        <h1 className="text-4xl capitalize">Bouken Blog</h1>
        {posts ? (
            <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map(post => (
                <PostCard post={post} key={post.title} />
                ))}
            </div>
        ) : (
            <div className="w-screen flex justify-center items-center">
              <InfinitySpin
              visible={true}
              width="200"
              color="#9D0000"
              ariaLabel="infinity-spin-loading"
              />
            </div>
        )}
    </div>
  )
}

export default Posts

