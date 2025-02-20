"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { GoDot } from "react-icons/go";

const BlogCarousel = ({ posts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 2500);

        return () => clearInterval(interval);
    },[currentIndex])

  return (
    <div className="relative w-[99vw] h-[70vh] overflow-hidden rounded-xl">
        <div className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
            {posts.slice(0, 5).map((post, index) => (
                <div key={index} className="w-full flex-shrink-0 flex justify-center items-center relative">
                    <img src={post.imgsLand[0]} className="w-full object-cover" />
                    <Link href={`/${post._id}`} className="absolute w-full left-0 flex items-center justify-between p-6 bottom-10 text-white">
                        <div className="flex items-start flex-col p-3 rounded-2xl bg-black/40">
                            <div className="text-sm py-2 px-3 bg-dark-highlight rounded-full mb-3">{post.categories[0]}</div>
                            <h2 className="text-3xl font-semibold">{post.title}</h2>
                        </div>
                        <div className="p-2 rounded-full bg-black/40">
                            <div className="flex gap-3 justify-center items-center">
                                <div className="rounded-full overflow-hidden h-12 w-12">
                                    {/* {post.user} */}
                                    <img src={post.user.image} />
                                </div>
                                <p className="text-lg">{post.user.username}</p>
                            </div>
                        </div>

                    </Link>
                </div>
            ))}
        </div>

        {/* <button
            className="absolute left-0 top-0 text-white text-[6rem] px-8 bg-gradient-to-l from-black/0 to-black h-full"
            onClick={prevSlide}
        >
            <FaChevronLeft />
        </button>
        <button
            className="absolute right-0 top-0 text-white text-[6rem] px-8 bg-gradient-to-r from-black/0 to-black h-full"
            onClick={nextSlide}
        >
            <FaChevronRight />
        </button> */}

        {/* <div className="absolute right-0 bottom-0 " /> */}
        <div className="flex gap-[-6px] text-4xl absolute left-2 bottom-2 text-white p-2 bg-black/40 rounded-full">
            {[...Array(5)].map((x, i) =>
                <button onClick={() => setCurrentIndex(i)}>
                    {currentIndex === i ? <GoDotFill /> : <GoDot />}
                </button>
            )}
        </div>
    </div>
  )
}

export default BlogCarousel