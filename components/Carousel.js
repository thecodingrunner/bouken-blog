"use client"

import React, { useEffect, useState } from 'react'

import { motion, useTransform, useScroll } from 'framer-motion'
import { useRef } from 'react'
import CarouselCard from './CarouselCard'

const Carousel = () => {
    const carouselRef = useRef(null);

  const [cards, setCards] = useState([])

  useEffect(() => {

    async function fetchPosts() {
      const response = await fetch('/api/post/recent');
      const result = await response.json();
      console.log(result)
      setCards(result)
    }

    fetchPosts()
  },[])

  return ( 
    <>
        {cards && (
        <section className='w-screen h-screen overflow-hidden mx-auto'>
            <div ref={carouselRef} className='flex overflow-x-auto scroll-smooth no-scrollbar'>
                <div className='w-[30vw] h-[90vh] back-red shrink-0 text-white flex flex-col gap-4 items-center justify-center'>
                    <h1 className='text-6xl'>Featured Posts</h1>
                </div>
                {cards.map((card) => {
                return <CarouselCard card={card} key={card.id} />
                })}
            </div>
        </section>
        )}
    </>
  )
}

export default Carousel