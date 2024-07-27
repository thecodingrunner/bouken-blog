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
  
    useEffect(() => {
      const setUpProviders = async () => {
        const response = await getProviders();
        console.log(response)
  
        setProviders(response)
      }
  
      setUpProviders()
    }, [])

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="w-auto h-auto"
    >
      <div className={`md:hidden absolute left-0 w-screen flex flex-col items-center gap-6 bg-white text-red text-3xl transition-all ease-in-out duration-500 ${displayMenu ? 'top-[5vh]' : '-top-full'} z-20`}>
        <Link href='/featured' className="py-8 pt-20" onClick={() => setDisplayMenu(prev => !prev)}>Featured</Link>
        <Link href='/cycling' className="py-8" onClick={() => setDisplayMenu(prev => !prev)}>Cycling</Link>
        <Link href='/language' className="py-8" onClick={() => setDisplayMenu(prev => !prev)}>Language</Link>
        <Link href='/lifestyle' className="py-8" onClick={() => setDisplayMenu(prev => !prev)}>Lifestyle</Link>
        <Link href='/thoughts' className="py-8" onClick={() => setDisplayMenu(prev => !prev)}>Thoughts</Link>
      </div>
      <motion.div variants={slideIn('down', 'tween', 0, 1.75)} className="absolute top-0 text-white left-0 z-30 w-full bg-[#ad4b02]">
          <div className="flex justify-between items-center py-6 sm:px-20 px-2 z-60">
            <div className="flex gap-3 items-center">
              <Link href={'/'} className='font-bold text-3xl'>
                BOUKEN 冒険
              </Link>
              <div className="w-[1px] h-[2rem] bg-white items-center" />
              <div className="md:flex gap-2 justify-center items-center hidden">
                <Link href='/featured'>Featured</Link>
                <Link href='/cycling'>Cycling</Link>
                <Link href='/language'>Language</Link>
                <Link href='/lifestyle'>Lifestyle</Link>
                <Link href='/thoughts'>Thoughts</Link>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
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
                        <button type='button' className='btn bg-white text-black' key={provider.name} onClick={() => signIn(provider.id)}>Sign In</button>
                    )))}
                  </div>
              )}
            </div>
            </div>
      </motion.div>
    </motion.div>
  )
}

export default Header