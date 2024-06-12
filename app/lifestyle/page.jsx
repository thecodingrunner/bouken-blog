import Posts from '@/components/Posts'
import React from 'react'

const page = () => {
  return (
    <div className='h-min-screen pt-[15vh] back-blue pb-10'>
      <Posts category="lifestyle" />
    </div>
  )
}

export default page