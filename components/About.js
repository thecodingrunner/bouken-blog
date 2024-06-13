"use client"

import { motion } from 'framer-motion'
import { fadeIn, navVariants, staggerContainer } from '@/utils/motion'
import { TypingText } from './TypingText'


const About = () => {
  return (
    <section className="relative mt-16 mb-28 md:mt-24 md:mb-48">
      <div className='gradient-02 z-0' />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className='mx-auto flex flex-col w-3/5 z-10'
      >
        <TypingText title="About BOUKEN 冒険" textStyles="text-center text-2xl text-red" />

        <motion.p variants={fadeIn("up", "tween", 0.2, 1)} className='mt-3 z-10 sm:text-[36px] text-[20px] text-center'>
          Welcome to BOUKEN, the travel blog of my adventures across Japan. In 2023 I bikepacked the length of Japan, and visited many fascinating places, before living in Tokyo for 4 months.
        </motion.p>
        {/* StrikeSense Pro */}
      </motion.div>
    </section>
  )
}

export default About