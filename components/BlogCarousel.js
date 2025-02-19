"use client"

import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const BlogCarousel = ({ posts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
    };

  return (
    <div className="relative w-[90vw] h-[70vh] overflow-hidden rounded-xl">
        <div className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
            {posts.slice(0, 5).map((post, index) => (
                <div key={index} className="w-full flex-shrink-0 flex justify-center items-center">
                    <img src={post.imgsLand[0]} className="w-full object-cover" />
                </div>
            ))}
        </div>

        <button
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
        </button>

        {/* <div className="absolute right-0 bottom-0 " /> */}
    </div>
  )
}

export default BlogCarousel