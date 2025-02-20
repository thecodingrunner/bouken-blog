"use client"

import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react"
import BlogCarousel from "./BlogCarousel";
import { InfinitySpin } from "react-loader-spinner";

const Posts = ({ category }) => {
    const [posts, setPosts] = useState(null)

    const [filter, setFilter] = useState("All");

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
    <div className="w-screen flex flex-col gap-10 items-center pt-10">

        {posts && <BlogCarousel posts={posts} />}

        {posts ? (
          <section className="pr-5 pl-2">
            <div className="w-full flex flex-col items-start p-2 gap-4 pb-10">
              <h1 className="text-4xl">
                Bouken Blog
              </h1>
              <p className="text-lg">
                Welcome to BOUKEN, the travel blog of my adventures across Japan. In 2023 I bikepacked the length of Japan, and visited many fascinating places, before living in Tokyo for 4 months.
              </p>
              <div className="flex gap-3 justify-center items-center">
                <button onClick={() => setFilter("All")} className={`py-2 px-4 text-xl rounded-lg ${filter === "All" ? "dark:bg-dark-highlight bg-light-highlight text-light-background" : "text-dark-background dark:text-dark-text"}`}>All</button>
                <button onClick={() => setFilter("Cycling")} className={`py-2 px-4 text-xl rounded-lg ${filter === "Cycling" ? "dark:bg-dark-highlight bg-light-highlight text-light-background" : "text-dark-background dark:text-dark-text"}`}>Cycling</button>
                <button onClick={() => setFilter("Language")} className={`py-2 px-4 text-xl rounded-lg ${filter === "Language" ? "dark:bg-dark-highlight bg-light-highlight text-light-background" : "text-dark-background dark:text-dark-text"}`}>Language</button>
                <button onClick={() => setFilter("Lifestyle")} className={`py-2 px-4 text-xl rounded-lg ${filter === "Lifestyle" ? "dark:bg-dark-highlight bg-light-highlight text-light-background" : "text-dark-background dark:text-dark-text"}`}>Lifestyle</button>
                <button onClick={() => setFilter("Tourism")} className={`py-2 px-4 text-xl rounded-lg ${filter === "Tourism" ? "dark:bg-dark-highlight bg-light-highlight text-light-background" : "text-dark-background dark:text-dark-text"}`}>Tourism</button>
                <button onClick={() => setFilter("Thoughts")} className={`py-2 px-4 text-xl rounded-lg ${filter === "Thoughts" ? "dark:bg-dark-highlight bg-light-highlight text-light-background" : "text-dark-background dark:text-dark-text"}`}>Thoughts</button>
              </div>
            </div>
            <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.filter(post => (filter === "All") || post.categories.includes(filter)).map(post => (
              <PostCard post={post} key={post.title} />
              ))}
            </div>
          </section>
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

