"use client"

import { useState, useEffect } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { slideIn, staggerContainer } from '@/utils/motion'

const Header = () => {
    const [providers, setProviders] = useState(null);
    const { data: session } = useSession();
    const [displayProfile, setDisplayProfile] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);

    const [lastScrollY, setLastScrollY] = useState(0);
    const [hidden, setHidden] = useState(false);

    const pathname = usePathname();

    const isHomePage = pathname === "/";
  
    useEffect(() => {
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

      console.log("triggered");

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);

    }, [lastScrollY])

    useEffect(() => {
      // Set providers
      const setUpProviders = async () => {
        const response = await getProviders();
        console.log(response)
  
        setProviders(response)
      }
  
      setUpProviders()

    },[])

  return (
    <motion.nav
      variants={staggerContainer}
      initial={{ y: "-100%"}}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-48 w-full transition-all z-30"
    >
      <div className={`sm:hidden absolute left-0 flex flex-col items-center w-full py-8 italic gap-4 bg-white text-red text-lg transition-all ease-in-out duration-500 z-30 ${displayMenu ? 'top-0' : '-top-[200%]'}`}>
        <Link href='#Book'>Book</Link>
        <Link href='#Drawings'>Drawings</Link>
        <Link href='/all'>Blog</Link>
        {session?.user ? (
              <div className='flex items-center gap-4 md:hidden'>
                <Link href={'/createPost'} className="dark:text-dark-text text-light-text italic text-lg">Create Post</Link>
                <button type='button' className='btn dark:bg-dark-text dark:text-dark-background bg-light-text text-light-background text-lg' onClick={signOut}>Sign Out</button>
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
              <div className='flex items-center gap-4 md:hidden'>
                {providers && (
                    Object.values(providers).map((provider) => (
                    <button type='button' className='btn dark:bg-dark-text dark:text-dark-background bg-light-text text-light-background text-lg' key={provider.name} onClick={() => signIn(provider.id)}>Log in</button>
                )))}
              </div>
          )}
      </div>
      <motion.div variants={slideIn('down', 'tween', 0, 1.75)} className={`${isHomePage ? "sm:bg-transparent sm:dark:bg-transparent dark:bg-dark-background bg-light-background p-10" : "dark:bg-dark-background bg-light-background"} flex justify-between items-center p-12 z-20 w-full`}>
        
        <Link href={'/'} className="ml-4 relative left-0 font-medium text-4xl tracking-tight translate-x-12">
            <div className="relative">
              <div className="h-24 w-24 dark:bg-dark-highlight bg-light-highlight rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
                <span className="dark:text-white text-light-text">B</span>
                <span className="dark:text-light-text text-white">OUKE</span>
                <span className="dark:text-white text-light-text">N</span>
              </div>
            </div>
        </Link>

        <div className="flex items-center justify-center gap-6">
          <div className="md:flex gap-6 justify-center items-center hidden dark:text-dark-text text-light-text italic text-lg">
            <Link href='/#Book'>Book</Link>
            <Link href='/#Drawings'>Drawings</Link>
            <Link href='/all'>Blog</Link>
          </div>
          {session?.user ? (
              <div className='items-center gap-4 hidden md:flex'>
                <Link href={'/createPost'} className="dark:text-dark-text text-light-text italic text-lg">Create Post</Link>
                <button type='button' className='btn dark:bg-dark-text dark:text-dark-background bg-light-text text-light-background text-lg' onClick={signOut}>Sign Out</button>
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
              <div className='items-center gap-4 hidden md:flex'>
                {providers && (
                    Object.values(providers).map((provider) => (
                    <button type='button' className='btn dark:bg-dark-text dark:text-dark-background bg-light-text text-light-background text-lg' key={provider.name} onClick={() => signIn(provider.id)}>Log in</button>
                )))}
              </div>
          )}
          <button className="flex md:hidden" onClick={() => setDisplayMenu(prev => !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-10 z-30">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

      </motion.div>
    </motion.nav>
  )
}

export default Header