import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import Home from "../pages/Home";
import DiscoverPage from "../pages/DiscoverPage";
import CategoriesPage from "../pages/CategoriesPage";
import AboutPage from "../pages/AboutPage";
import { Routes,Route } from "react-router-dom";

const Reader = () => {
  return (
    <>
      <Navbar />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/discover' element={<DiscoverPage/>}/>
        <Route path='/categories' element={<CategoriesPage/>}/>
       
        
       </Routes>
      <Footer />
    </>
  );
};

export default Reader;
