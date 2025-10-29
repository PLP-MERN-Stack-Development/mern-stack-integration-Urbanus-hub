import React from 'react'
import HeroSection from "../components/HeroSection";
import CategoryFilter from "../components/CategoryFilter";
import PostGrid from "../components/PostGrid";

const Home = () => {
  return (
    <>
         <HeroSection />
          <CategoryFilter />
          <PostGrid />
    </>
  )
}

export default Home