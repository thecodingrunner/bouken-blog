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
    <section
      // variants={staggerContainer}
      // initial="hidden"
      // whileInView="show"
      // viewport={{ once: true, amount: 0.25 }}
      className="h-screen w-full relative"
    >
      <div 
        // variants={slideIn("left", "tween", 0, 1.5)}
        className="z-10 h-[90vh] aspect-square rounded-full dark:bg-dark-highlight bg-light-highlight absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:glow"
      >
      </div>
      <div 
        // variants={textVariant(0)}
        className="text-[8rem] font-semibold z-20 absolute top-1/2 left-1/2 -translate-x-[505px] -translate-y-[140px]"
      >
        <span className="dark:text-dark-text text-light-text">BO</span>
        <span className="dark:text-light-text text-dark-text">UKEN</span>
      </div>
      <div className="italic absolute z-20 left-1/2 top-1/2 -translate-x-1/2 translate-y-[50px] text-dark-text text-4xl">
        A site for exploration
      </div>
      <div className="vertical-text text-[8rem] font-semibold absolute right-48 bottom-16 z-10">
        冒険
      </div>
      {/* <motion.div
        variants={textVariant(0)}
        className="absolute right-[0.5vw] sm:right-[5vw] top-[9vh] z-10 flex flex-col items-end"
      >
        <h1 className="text-[6rem] sm:text-[10rem] xl:text-[13rem] font-bold background">
          BOUKEN
        </h1>
        <h1 className="text-[5rem] sm:text-[9rem] xl:text-[11rem] font-extrabold -mt-10 sm:-mt-16">
          冒険
        </h1>
        <h1 className="text-xl sm:text-2xl font-semibold">
          By Finn Moffett
        </h1>
      </motion.div> */}
      {/* <motion.div
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
      </motion.div> */}
    </section>
  );
};

export default Hero;
