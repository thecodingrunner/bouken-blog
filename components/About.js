import { motion } from 'framer-motion'
import { fadeIn, navVariants, staggerContainer } from '@/utils/motion'
import { TypingText } from './TypingText'


const About = () => {


  return (
    <section className="h-screen flex justify-center items-center relative">

      <div className="gradient-light z-0 h-[85vh] w-[90vw] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className='mx-auto flex flex-col w-3/5 z-10'
      >
        <TypingText title="About BOUKEN 冒険" textStyles="text-center text-4xl dark:text-dark-highlight text-light-highlight" />

        <motion.p variants={fadeIn("up", "tween", 0.1, 1)} className='mt-3 z-10 text-[34px] text-center dark:text-dark-text text-light-text italic'>
        Bouken is the Japanese word for adventure. This website is dedicated to both my Japanese adventures, and my self exploration through several creative forms. 
        </motion.p>
        {/* StrikeSense Pro */}
      </motion.div>
    </section>
  )
}

export default About