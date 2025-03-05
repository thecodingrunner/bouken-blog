"use client"

import About from "@/components/About";
import Book from "@/components/Book";
import Hero from "@/components/Hero";
import DrawingsCarousel from "@/components/DrawingsCarousel"
import Carousel from "@/components/Carousel";

export default function Home() {

  return (
    <main className="">
      <Hero />
      <About />
      <Carousel />
      <Book />
      <DrawingsCarousel />
    </main>
  );
}
