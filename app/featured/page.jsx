import Posts from '@/components/Posts'
import React from 'react'

const page = () => {
  return (
    <div className='h-[90vh] pt-[20vh] back-gray'>
      <Posts category="featured" />
    </div>
  )
}

export default page