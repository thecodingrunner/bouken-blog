"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const PostCard = ({post}) => {

  console.log(post)


  return (
    <>
        {post && (
            <div className='flex flex-col gap-2'>
                <div>
                  {post.imgsLand && (
                    <img src={post.imgsLand[0]} className='object-cover' />
                  )}
                </div>
                <Link href={`/${post._id}`} className='text-2xl font-semibold'>{post.title}</Link>
                <div className='flex gap-2'>
                  <img src={post.user?.image} className='w-8 h-8 rounded-full' />
                  <Link href={`/${post._id}`}>{post.user?.username}</Link>
                </div>
            </div>
        )}
    </>
  )
}

export default PostCard