"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer, textVariant, textVariantCarousel } from "@/utils/motion";
import Link from "next/link";

const CarouselCard = ({ card, index }) => {
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseOver() {
    setIsHovering((prev) => !prev);
  }

  function handleMouseOut() {
    setIsHovering((prev) => !prev);
  }

  console.log(card);
  return (
    <Link href={`/${card._id}`}>
      {card.imgsPort && (
        <motion.div
          className="w-[60vw] sm:w-[50vw] md:w-[30vw] overflow-hidden shrink-0 relative"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className="flex flex-col items-start ml-4 my-4 font-semibold">
            <p className="mb-10 text-xl">.0{index + 1}</p>
            <p className="mb-2">{card.title}</p>
            <p>{card.date}</p>
          </div>

          {/* {isHovering && (
            <motion.div
              variants={textVariantCarousel(0.6)}
              initial="hidden"
              animate={isHovering ? "show" : "hidden"}
              className="absolute top-0 left-0 h-full w-full bg-opacity-75 bg-black flex justify-center items-center z-50"
            >
              <Link href={`/${card._id}`} className="text-white text-3xl opacity-100">{card.title}</Link>
            </motion.div>
          )} */}
          <div className="overflow-hidden">
            <motion.img
              src={card.imgsLand[0]}
              className="object-cover w-full h-full hover:scale-[1.02] transition ease-in-out duration-300"
            />
          </div>

        </motion.div>
      )}
    </Link>
  );
};

export default CarouselCard;
