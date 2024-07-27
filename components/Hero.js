"use client";

import React, { useState } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { slideIn, staggerContainer, textVariant } from "@/utils/motion";
import Link from "next/link";

const featuredTitles = [
  {
    id: 1,
    titleEng: "A late night adventure through the mystical countryside",
    titleJap: "神秘的な田舎を通った",
    link: "/66682d4bb18e894d7bf99829",
  },
  {
    id: 2,
    titleEng: "Doing hilltop yoga with a group of elderly people",
    titleJap: "丘の上で老人たちと朝体操をした",
    link: "/test",
  },
  {
    id: 3,
    titleEng: "My bike wheel snapped whilst riding through the countryside",
    titleJap: "乗りながら自転車が壊した",
    link: "/test",
  },
  {
    id: 4,
    titleEng: "Praying with a suspiciously kind old couple",
    titleJap: "疑わしいほど優しい婆さんと出会った",
    link: "/test",
  },
  {
    id: 5,
    titleEng: "I took my bike on the bullet train",
    titleJap: "自転車を運んで新幹線を乗った",
    link: "/test",
  },
];

const Hero = () => {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [1, 500]);

  const [hover, setHover] = useState([]);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="h-[128vh] md:h-[90vh] w-full"
    >
      <motion.div
        variants={textVariant(0)}
        className="absolute right-[0.5vw] sm:right-[5vw] top-[9vh] z-10 flex flex-col items-end"
      >
        <h1 className="text-[6rem] sm:text-[10rem] xl:text-[13rem] font-bold background">
          BOUKEN
        </h1>
        <h1 className="text-[5rem] sm:text-[9rem] xl:text-[11rem] font-extrabold -mt-10 sm:-mt-16">
          冒険
        </h1>
        <h1 className="text-xl sm:text-2xl font-semibold text-red">
          By Finn Moffett
        </h1>
      </motion.div>
      {/* <motion.h1
        variants={textVariant(0)}
        className="text-[6rem] sm:text-[10rem] xl:text-[13rem] font-bold absolute right-[0.5vw] sm:right-[5vw] top-[8vh] background z-10"
      >
        BOUKEN
      </motion.h1>
      <motion.h1
        variants={textVariant(0)}
        className="text-[5rem] sm:text-[9rem] xl:text-[11rem] font-extrabold absolute right-[0.5vw] sm:right-[5vw] top-[23vh] sm:top-[33vh] z-10"
      >
        冒険
      </motion.h1>
      <motion.h1
        variants={textVariant(0)}
        className="text-xl sm:text-2xl font-semibold absolute right-[0.5vw] sm:right-[5vw] top-[39vh] sm:top-[65vh] text-red"
      >
        By Finn Moffett
      </motion.h1> */}
      <motion.div
        variants={slideIn("left", "tween", 0, 1.5)}
        className="absolute left-[15vw] md:left-[2vw] -bottom-[48vh] md:bottom-[2vh] flex flex-col w-[70vw] md:w-[45vw] lg:w-[35vw] text-2xl sm:text-3xl md:text-2xl xl:text-4xl font-semibold"
      >
        {featuredTitles.map((title) => (
          <Link
            href={title.link}
            key={title.id}
            onMouseEnter={() => setHover(prev => {
              return [...prev, title.id]
            })}
            onMouseLeave={() => setHover(prev => {
              const index = prev.indexOf(title.id)
              return prev.splice(index, 1)
            })}
            className="h-[6rem] lg:h-[6.5rem] px-4 py-[0.5rem] border-b border-black relative overflow-hidden"
          >
            <span className="block transition-transform duration-300 ease-in-out text-xl sm:text-2xl mb-[1rem] h-[5rem] lg:h-[5.5rem]" 
                  style={{
                    transform: hover.includes(title.id) ? 'translateY(-6rem)' : 'translateY(0)',
                    // opacity: hover.includes(title.id) ? '1' : '0' 
                  }}>
              {title.titleEng}
            </span>
            <span className="block top-full left-0 transition-transform duration-300 ease-in-out h-[5rem] lg:h-[5.5rem]" 
                  style={{ 
                    transform: hover.includes(title.id) ? 'translateY(-6rem)' : 'translateY(0)', 
                    // opacity: hover.includes(title.id) ? '0' : '1' 
                  }}>
              {title.titleJap}
            </span>
          </Link>
        ))}
        {/* <Link
          href="/66682d4bb18e894d7bf99829"
          className="py-4 px-4 border-b border-black"
        >
          神秘的な田舎を通った A late night adventure through the mystical
          countryside
        </Link>
        <div className="py-4 px-4 border-b border-black">
          丘の上で老人たちと朝体操をした Doing hilltop yoga with a group of
          elderly people
        </div>
        <div className="py-4 px-4 border-b border-black">
          乗りながら自転車が壊した My bike wheel snapped whilst riding through
          the countryside
        </div>
        <div className="py-4 px-4 border-b border-black">
          疑わしいほど優しい婆さんと出会った Praying with a suspiciously kind
          old couple
        </div>
        <div className="py-4 px-4 border-b border-black">
          自転車を運んで新幹線を乗った I took my bike on the bullet train
        </div>
        <div className="py-4 px-4 border-b border-black">島で迷子になった</div> */}
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
