"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { textVariant } from "@/utils/motion";

const CarouselCard = ({ card }) => {

  console.log(card);
  return (
    <>
    {card.imgsPort && (
        <motion.div
        className='w-[30vw] h-[90vh] overflow-hidden shrink-0'
        >
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