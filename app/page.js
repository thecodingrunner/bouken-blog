"use client"

import About from "@/components/About";
import Book from "@/components/Book";
import Carousel from "@/components/Carousel";
import DarkModeButton from "@/components/DarkModeButton";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {

  return (
    <main className="pt-48 back-blue overflow-hidden">
      <Hero />
      <About />
      <Book />
      <Carousel />
    </main>
  );
}
