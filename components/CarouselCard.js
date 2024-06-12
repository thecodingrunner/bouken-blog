"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer, textVariant, textVariantCarousel } from "@/utils/motion";
import Link from "next/link";

const CarouselCard = ({ card }) => {
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseOver() {
    setIsHovering((prev) => !prev);
  }

  function handleMouseOut() {
    setIsHovering((prev) => !prev);
  }

  console.log(card);
  return (
    <>
      {card.imgsPort && (
        <motion.div
          className="w-[30vw] h-[90vh] overflow-hidden shrink-0 relative"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {isHovering && (
            <motion.div
              variants={textVariantCarousel(0.6)}
              initial="hidden"
              animate={isHovering ? "show" : "hidden"}
              className="absolute top-0 left-0 h-full w-full bg-opacity-75 bg-black flex justify-center items-center z-50"
            >
              <Link href={`/${card._id}`} className="text-white text-3xl opacity-100">{card.title}</Link>
            </motion.div>
          )}
          <motion.img
            src={card.imgsPort[0]}
            className="object-cover w-full h-full hover:scale-[1.02] transition ease-in-out duration-300"
          />
        </motion.div>
      )}
    </>
  );
};

export default CarouselCard;
