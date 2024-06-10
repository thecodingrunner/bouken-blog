"use client"

import About from "@/components/About";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RecentPosts from "@/components/RecentPosts";

export default function Home() {

  return (
    <main className="pt-48 back-blue overflow-hidden">
      <Hero />
      <About />
      <Carousel />
      <RecentPosts />
    </main>
  );
}
