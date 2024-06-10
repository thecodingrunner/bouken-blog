"use client"

import Footer from '@/components/Footer'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = (pageProps) => {
    const postId = pageProps.params.postId
    const session = useSession()
    const router = useRouter()
    const [view, setView] = useState('')

    console.log(session)

    const [blogPost, setBlogPost] = useState(null)
    console.log(blogPost)
  
    useEffect(() => {
  
      async function fetchPosts() {
        const response = await fetch(`/api/post/${postId}`);
        const result = await response.json();
        console.log(result)
        setBlogPost(result)
      }
  
      fetchPosts()
  
    },[])
 
    async function deletePost() {
        const confirmed = confirm('Are you sure you want to delete this post?');

        if (confirmed) {
            await fetch(`/api/post/${postId}`, { method: "DELETE" })
        }

        router.push('/')
    }

  return (
    <div className='back-blue pb-10'>
    {blogPost && (
        <>
        <main className='relative w-3/4 mx-auto py-20 px-10 flex flex-col mt-[50vh] gap-8 items-center justify-center back-gray z-20 shadow-md'>
            <h1 className='text-5xl font-semibold'>{blogPost.title}</h1>
            <div className='flex gap-4 items-center'>
                <img src={blogPost.user?.image} className='w-12 h-12 rounded-full' />
                <h2 className='text-xl'>{blogPost.user.username}</h2>
            </div>
            {session && (
                <div className='flex gap-4 items-center'>
                    <Link href={`/editPost/${postId}`} className='btn bg-black text-white'>Edit Post</Link>
                    <button className='btn bg-red-600 text-white' onClick={deletePost}>Delete Post</button>
                </div>
            )}
            <p className='text-2xl leading-10' dangerouslySetInnerHTML={{__html: blogPost.postContent}}></p>
            <div className='grid grid-cols-3 gap-3'>
                {blogPost.imgsLand.map(img => (
                    <button onClick={() => setView(img)} className='h-[30vh] overflow-hidden'>
                        <img src={img} className='object-contain' />
                    </button>
                ))}
            </div>
            <div className='grid grid-cols-4 gap-3'>
                {blogPost.imgsPort.map(img => (
                    <button onClick={() => setView(img)} className='h-[40vh] overflow-hidden'>
                        <img src={img} className='object-contain' />
                    </button>
                ))}
            </div>

            {view && (
                <div className='fixed left-0 top-0 h-full w-full flex justify-center items-center bg-black bg-opacity-25 z-50' onClick={() => setView(null)}>
                    <div className='h-[80vh] overflow-hidden z-50'>
                        <img src={view} className='object-contain h-full z-50' />
                    </div>
                </div>
            )}
        </main>
        <div className='h-[80vh] absolute top-0 left-0 w-full overflow-hidden flex items-start z-0'>
            <img src={blogPost.imgsLand[0]} className='object-cover z-0' />
        </div>
        </>
    )}
    </div>
  )
}

export default page