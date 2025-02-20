"use client"
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import grandadDrawing from "../public/grandad-drawing.jpg";
import yumaDrawing from "../public/yuma-drawing.jpg";
import meDrawing from "../public/me-drawing.jpg";
import Image from "next/image";

const DrawingsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [expandedIndex, setExpandedIndex] = useState(null);

    const imgs = [grandadDrawing, yumaDrawing, meDrawing];
    const totalImages = imgs.length;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    return (
        <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden py-10" id="Drawings">
            <div className="relative w-[80%] flex justify-center items-center h-full overflow-hidden">
                {imgs.map((img, index) => {
                    let position = (index - currentIndex + totalImages) % totalImages;
                    let width = position === 0 ? "w-[400px]" : "w-[300px]";
                    let opacity = position === 0 ? "opacity-100" : "opacity-80";
                    let translateX = position === 0 ? "translate-x-0" : position === 1 ? "translate-x-[110%]" : "-translate-x-[110%]";
                    let zIndex = position === 0 ? "z-10" : "z-0";

                    return (
                        <button onClick={() => {
                            if (position === 0) {
                                setExpandedIndex(expandedIndex === index ? null : index);
                            } else {
                                setCurrentIndex(index)
                            }
                            }} 
                            className={`absolute transition-all duration-500 ease-in-out object-cover rounded-lg shadow-xl transform ${expandedIndex === index ? "w-[600px]" : width} ${translateX} ${zIndex}`}>
                            <Image
                                key={index}
                                src={img}
                                alt={`Drawing ${index + 1}`}
                            />
                        </button>
                    );
                })}
            </div>

            {/* <button
                className="absolute left-5 text-white text-4xl bg-black/50 p-2 rounded-full"
                onClick={prevSlide}
            >
                <FaChevronLeft />
            </button>
            <button
                className="absolute right-5 text-white text-4xl bg-black/50 p-2 rounded-full"
                onClick={nextSlide}
            >
                <FaChevronRight />
            </button> */}
        </div>
    );
};

export default DrawingsCarousel;
