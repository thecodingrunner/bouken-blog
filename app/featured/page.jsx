import Posts from '@/components/Posts'
import React from 'react'

const page = () => {
  return (
    <div className='h-auto pt-[15vh] back-blue pb-10 h-min-[90vh]'>
      <Posts category="featured" />
    </div>
  )
}

export default page