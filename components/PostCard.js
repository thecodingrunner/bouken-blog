"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const PostCard = ({post}) => {

  console.log(post)


  return (
    <>
        {post && (
            <div className='flex flex-col back-gray shadow-md'>
                <div>
                  {post.imgsLand && (
                    <img src={post.imgsLand[0]} className='object-cover' />
                  )}
                </div>
                <div className='p-4'>
                  <Link href={`/${post._id}`} className='text-2xl font-semibold'>{post.title}</Link>
                  <div className='flex justify-between items-center mt-3'>
                    <div className='flex gap-2 items-center'>
                      <img src={post.user?.image} className='w-8 h-8 rounded-full' />
                      <Link href={`/${post._id}`}>{post.user?.username}</Link>
                    </div>
                    <div className='text-sm font-bold'>
                      {post.date}
                    </div>
                  </div>
                </div>
            </div>
        )}
    </>
  )
}

export default PostCard