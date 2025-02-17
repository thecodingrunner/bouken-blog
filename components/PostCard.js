"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const PostCard = ({post}) => {

  console.log(post)


  return (
    <>
        {post && (
            <Link href={`/${post._id}`} className='flex flex-col relative'>
                <div className='rounded-lg overflow-hidden'>
                  {post.imgsLand && (
                    <img src={post.imgsLand[0]} className='object-cover' onerror="this.src=post.imgsLand[-1]" />
                  )}
                </div>
                <div className='absolute top-2 left-2 bg-light-highlight text-dark-text py-1 px-2 rounded-full text-sm'>
                  {post.categories[0]}
                </div>
                <div className='p-4'>
                  <h2 className='text-2xl font-semibold'>{post.title}</h2>
                  <div className='flex justify-between items-center mt-3'>
                    <div className='flex gap-2 items-center'>
                      <img src={post.user?.image} className='w-8 h-8 rounded-full' />
                      <p>{post.user?.username}</p>
                    </div>
                    <div className='text-sm font-bold'>
                      {post.date}
                    </div>
                  </div>
                </div>
            </Link>
        )}
    </>
  )
}

export default PostCard