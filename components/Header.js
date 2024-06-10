"use client"

import { useState, useEffect } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
    const [providers, setProviders] = useState(null);
    const { data: session } = useSession();
  
    useEffect(() => {
      const setUpProviders = async () => {
        const response = await getProviders();
        console.log(response)
  
        setProviders(response)
      }
  
      setUpProviders()
    }, [])

  return (
    <div className="absolute top-0 text-white left-0 z-30 w-full bg-[#ad4b02]">
        <navbar className="flex justify-between items-center py-6 px-20">
          <div className="flex gap-3 items-center">
            <Link href={'/'} className='font-bold text-3xl'>
              BOUKEN 冒険
            </Link>
            <div className="w-[1px] h-[2rem] bg-black" />
            <Link href='/trending'>Trending</Link>
            <Link href='/cycling'>Cycling</Link>
            <Link href='/language'>Language</Link>
          </div>
        {session?.user ? (
            <div className='flex items-center gap-4'>
            <Link href={'/createPost'}>Create Post</Link>
            <button type='button' className='btn bg-white text-black' onClick={signOut}>Sign Out</button>
            <Image src={session?.user.image} width={37} height={37} alt='profile' className='rounded-full' />
            </div>
        ) : (
            <div className='flex items-center gap-4'>
            {providers && (
                Object.values(providers).map((provider) => (
                <button type='button' className='btn bg-white text-black' key={provider.name} onClick={() => signIn(provider.id)}>Sign In</button>
            )))}
            </div>
        )}
        </navbar>
    </div>
  )
}

export default Header