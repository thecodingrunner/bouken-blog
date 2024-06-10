import Posts from '@/components/Posts'
import React from 'react'

const page = () => {
  return (
    <div className='h-[90vh] pt-[20vh] back-blue'>
      <Posts category="cycling" />
    </div>
  )
}

export default page