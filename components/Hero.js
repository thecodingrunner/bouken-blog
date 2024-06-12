"use client";

import React from "react";
import morioka from "../public/morioka.jpg";
import murakami from "../public/murakami.jpg";
import sea from "../public/sea.jpg";

import { motion, useScroll, useTransform } from "framer-motion";
import { slideIn, staggerContainer, textVariant } from "@/utils/motion";
import Link from "next/link";

const Hero = () => {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [1, 500]);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="h-[90vh] w-full"
    >
      <motion.h1
        variants={textVariant(0)}
        className="text-[13rem] font-bold absolute right-[5vw] top-[8vh] background z-10"
      >
        BOUKEN
      </motion.h1>
      <motion.h1
        variants={textVariant(0)}
        className="text-[11rem] font-extrabold absolute right-[5vw] top-[33vh] z-10"
      >
        冒険
      </motion.h1>
      <motion.h1
        variants={textVariant(0)}
        className="text-2xl font-semibold absolute right-[5vw] top-[65vh] text-red"
      >
        By Finn Moffett
      </motion.h1>
      <motion.div
        variants={slideIn("left", "tween", 0, 1.5)}
        className="absolute left-[2vw] bottom-[5vh] flex flex-col w-[35vw] text-4xl font-semibold"
      >
        <Link
          href="/66682d4bb18e894d7bf99829"
          className="py-4 px-4 border-b border-black"
        >
          神秘的な田舎を通った
        </Link>
        <div className="py-4 px-4 border-b border-black">
          乗りながら自転車が壊した
        </div>
        <div className="py-4 px-4 border-b border-black">
          疑わしいほど優しい婆さんと出会った
        </div>
        <div className="py-4 px-4 border-b border-black">
          自転車を運んで新幹線を乗った
        </div>
        <div className="py-4 px-4 border-b border-black">島で迷子になった</div>
      </motion.div>
      {/* <div className='w-[20vw] overflow-hidden absolute right-10 bottom-10'>
        <img src={morioka.src} className='object-contain w-full' />
      </div> */}
      {/* <motion.div variants={slideIn('right', 'tween', 0, 1.75)} className='w-[15vw] h-[15vw] overflow-hidden absolute right-10 bottom-[2vw] z-0'>
        <img src={sea.src} className='object-cover h-full' />
      </motion.div>
      <motion.div variants={slideIn('right', 'tween', 0, 1.75)} className='w-[15vw] h-[15vw] overflow-hidden absolute right-10 bottom-[18vw] z-0'>
        <img src={murakami.src} className='object-cover h-full' />
      </motion.div>
      <motion.div variants={slideIn('right', 'tween', 0, 1.75)} className='w-[15vw] h-[15vw] overflow-hidden absolute right-[19vw] bottom-[2vw] z-0'>
        <img src={morioka.src} className='object-cover h-full' />
      </motion.div> */}
    </motion.div>
  );
};

export default Hero;
