"use client"

import { useState, useEffect } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { slideIn, staggerContainer } from '@/utils/motion'

const Header = () => {
    const [providers, setProviders] = useState(null);
    const { data: session } = useSession();
    const [displayProfile, setDisplayProfile] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);

    const [lastScrollY, setLastScrollY] = useState(0);
    const [hidden, setHidden] = useState(false);
  
    useEffect(() => {
      // Set providers
      const setUpProviders = async () => {
        const response = await getProviders();
        console.log(response)
  
        setProviders(response)
      }
  
      setUpProviders()

      // Handle scrolling
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
  
        if (currentScrollY > lastScrollY) {
          setHidden(true); // Hide on scroll down
        } else {
          setHidden(false); // Show on scroll up
        }
  
        setLastScrollY(currentScrollY);
      };


      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);

    }, [lastScrollY])

  return (
    <motion.nav
      variants={staggerContainer}
      initial={{ y: "-100%"}}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-48 w-full transition-all z-50"
    >
      <div className={`md:hidden absolute left-0 w-screen flex flex-col items-center gap-6 bg-white text-red text-3xl transition-all ease-in-out duration-500 ${displayMenu ? 'top-[5vh]' : '-top-full'} z-20`}>
        <Link href='/featured' className="py-8 pt-20" onClick={() => setDisplayMenu(prev => !prev)}>Featured</Link>
        <Link href='/cycling' className="py-8" onClick={() => setDisplayMenu(prev => !prev)}>Cycling</Link>
      </div>
      <motion.div variants={slideIn('down', 'tween', 0, 1.75)} className="fixed top-0 text-white left-0 z-30 w-full bg-transparent">
          <div className="flex justify-between items-center py-12 sm:px-28 px-18 z-60">
            <div className="flex gap-3 items-center">
              <Link href={'/'} className='font-medium text-4xl tracking-tight'>
                <div className="relative">
                  <div className="h-24 w-24 dark:bg-dark-highlight bg-light-highlight rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div>
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
                    <span className="dark:text-white text-light-text">B</span>
                    <span className="text-white">OUKE</span>
                    <span className="dark:text-white text-light-text">N</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="md:flex gap-4 justify-center items-center hidden dark:text-dark-text text-light-text italic text-lg">
                <Link href=''>Book</Link>
                <Link href=''>Drawings</Link>
                <Link href=''>Blog</Link>
              </div>
              <button className="flex md:hidden" onClick={() => setDisplayMenu(prev => !prev)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              {session?.user ? (
                  <div className='flex items-center gap-4'>
                    <Link href={'/createPost'} className="hidden lg:block">Create Post</Link>
                    <button type='button' className='btn bg-white text-black hidden lg:flex' onClick={signOut}>Sign Out</button>
                    <button onClick={() => setDisplayProfile(prev => !prev)}>
                      <Image src={session?.user.image} width={37} height={37} alt='profile' className='rounded-full' />
                    </button>
                    {displayProfile && (
                      <div className="p-4 absolute top-[11vh] bg-white right-[5vw] flex flex-col gap-3 justify-center shadow-lg lg:hidden">
                        <Link href={'/createPost'} className="mx-auto text-center text-black" onClick={() => setDisplayProfile(prev => !prev)}>Create Post</Link>
                        <button type='button' className='btn back-red text-white' onClick={() => {
                          signOut()
                          setDisplayProfile(prev => !prev)
                        }}>Sign Out</button>
                      </div>
                    )}
                  </div>
              ) : (
                  <div className='flex items-center gap-4'>
                    {providers && (
                        Object.values(providers).map((provider) => (
                        <button type='button' className='btn dark:bg-dark-text dark:text-dark-background bg-light-text text-light-background text-lg' key={provider.name} onClick={() => signIn(provider.id)}>Log in</button>
                    )))}
                  </div>
              )}
            </div>
            </div>
      </motion.div>
    </motion.nav>
  )
}

export default Header