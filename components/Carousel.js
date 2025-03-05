"use client"

import React, { useEffect, useState } from 'react'

import { motion, useTransform, useScroll } from 'framer-motion'
import { useRef } from 'react'
import CarouselCard from './CarouselCard'
import Link from 'next/link'
import { MdKeyboardArrowRight } from "react-icons/md";

const Carousel = () => {
    const carouselRef = useRef(null);

  const [cards, setCards] = useState([])

  useEffect(() => {

    async function fetchPosts() {
      const response = await fetch('/api/post/featured');
      const result = await response.json();
      console.log(result)
      setCards(result)
    }

    fetchPosts()
  },[])

  return ( 
    <section className='h-screen w-screen hidden md:flex flex-col relative overflow-hidden my-10'>
      {cards && (
      <section className='w-full mx-auto h-[50vh]'>
          <div ref={carouselRef} className='flex overflow-x-auto scroll-smooth no-scrollbar'>
              {cards.map((card, index) => {
              return <CarouselCard card={card} key={card._id} index={index} />
              })}
          </div>
      </section>
      )}
      <div className='absolute bottom-0 left-4 flex justify-center items-end gap-8'>
        <h1 className='text-[7rem] md:text-[9rem] text-center italic'>Bouken Blog</h1>
        <Link className='text-xl pb-8 flex justify-center items-center' href={`/all`}>
          <span>Read</span>
          <MdKeyboardArrowRight className='text-4xl' />
        </Link>
      </div>
    </section>
  )
}

export default Carousel