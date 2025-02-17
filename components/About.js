"use client"

import { motion } from 'framer-motion'
import { fadeIn, navVariants, staggerContainer } from '@/utils/motion'
import { TypingText } from './TypingText'


const About = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className='gradient-02 z-0' />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className='mx-auto flex flex-col w-4/5 z-10'
      >
        <TypingText title="About BOUKEN 冒険" textStyles="text-center text-4xl dark:text-dark-highlight text-light-highlight" />

        <motion.p variants={fadeIn("up", "tween", 0.1, 1)} className='mt-3 z-10 sm:text-[40px] text-[30px] text-center dark:text-dark-text text-light-text italic'>
          Welcome to BOUKEN, the travel blog of my adventures across Japan. In 2023 I bikepacked the length of Japan, and visited many fascinating places, before living in Tokyo for 4 months.
        </motion.p>
        {/* StrikeSense Pro */}
      </motion.div>
    </section>
  )
}

export default About