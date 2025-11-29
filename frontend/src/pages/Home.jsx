import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import Nav from '../Component/Nav';
import Footer from '../Component/Footer.jsx';
import { FaTags, FaFireAlt, FaShoppingBag, FaStar } from "react-icons/fa";

// --- COMPONENTS IMPORT ---
import LatestCollection from '../Component/LatestCollection';
import BestSeller from '../Component/BestSeller';
import CrazyDeals from '../Component/CrazyDeal';
import OurPolicy from '../Component/OurPolicy';
import NewLetterBox from '../Component/NewLetterBox';
import CustomerLove from '../Component/CustomerLove';

// --- ASSETS IMPORT ---
import hero1 from '../assets/men.webp'; 
import hero2 from '../assets/products/product7/jack4.webp';
import hero3 from '../assets/products/product9/kurti4.webp';
import hero4 from '../assets/products/product3/pant3.webp'; 
import hero5 from '../assets/l.webp'; 

function Home() {
  const navigate = useNavigate();

  // --- HERO SLIDER LOGIC ---
  const slides = [
    {
      id: 1,
      tag: "MEGA SALE LIVE",
      title: "Flat 50% Off On Men's Wear",
      subtitle: "Grab the best deals before they are gone.",
      img: hero1,
      bg: "from-teal-100 via-white to-teal-50",
      btnColor: "bg-red-600 hover:bg-red-700",
      icon: <FaFireAlt className="text-orange-500" />
    },
    {
      id: 2,
      tag: "WINTER SPECIAL",
      title: "Buy 1 Get 1 Free on Jackets",
      subtitle: "Warm up your style this season.",
      img: hero2,
      bg: "from-emerald-100 via-white to-emerald-50",
      btnColor: "bg-teal-800 hover:bg-teal-900",
      icon: <FaStar className="text-yellow-500" />
    },
    {
      id: 3,
      tag: "ETHNIC ELEGANCE",
      title: "Premium Kurti Collection",
      subtitle: "Starting at just ₹999. Limited Stock!",
      img: hero3,
      bg: "from-cyan-100 via-white to-cyan-50",
      btnColor: "bg-gray-900 hover:bg-black",
      icon: <FaShoppingBag className="text-purple-500" />
    },
    {
      id: 4,
      tag: "CASUAL VIBES",
      title: "Comfort Meets Style",
      subtitle: "Up to 40% Off on Trousers & Pants.",
      img: hero4,
      bg: "from-blue-100 via-white to-blue-50",
      btnColor: "bg-blue-700 hover:bg-blue-800",
      icon: <FaTags className="text-blue-500" />
    },
    {
      id: 5,
      tag: "STEP UP",
      title: "Sneaker Heads Special",
      subtitle: "Walk the talk with our new footwear range.",
      img: hero5,
      bg: "from-orange-100 via-white to-orange-50",
      btnColor: "bg-orange-600 hover:bg-orange-700",
      icon: <FaFireAlt className="text-red-500" />
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4500); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden font-sans">
      <Nav />

      {/* =========================================
          1. HERO SLIDER (First Impression)
         ========================================= */}
      <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden mt-[70px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            } bg-gradient-to-br ${slide.bg}`}
          >
            {/* Text Content */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-20 gap-4 md:gap-6 z-20">
              
              <motion.div 
                key={`tag-${index}`}
                initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
                className="flex items-center gap-2 px-4 py-1 bg-white border border-gray-200 rounded-full shadow-sm"
              >
                {slide.icon}
                <span className="text-sm font-bold text-gray-800 tracking-wider">{slide.tag}</span>
              </motion.div>

              <motion.h1 
                key={`title-${index}`}
                initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-7xl font-extrabold text-gray-900 leading-tight"
              >
                {slide.title}
              </motion.h1>
              
              <motion.p 
                key={`sub-${index}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 font-medium"
              >
                {slide.subtitle}
              </motion.p>
              
              <motion.button
                key={`btn-${index}`}
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
                onClick={() => navigate('/collection')}
                className={`mt-6 px-10 py-4 text-white text-lg font-bold rounded-full shadow-xl transition-transform transform hover:scale-105 flex items-center gap-3 ${slide.btnColor}`}
              >
                Check Offer <FaTags />
              </motion.button>
            </div>

            {/* Image Content */}
            <div className="flex-1 h-[50%] md:h-full flex items-center justify-center relative">
               <motion.img 
                  key={`img-${index}`}
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}
                  src={slide.img} 
                  alt="Hero" 
                  className="h-[80%] md:h-[85%] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
               />
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all border border-gray-400 ${currentSlide === idx ? 'bg-teal-800 w-10' : 'bg-transparent'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* =========================================
          2. LATEST COLLECTION
         ========================================= */}
      <section className="w-full">
        <LatestCollection />
      </section>

      {/* =========================================
          3. CRAZY DEALS (Visual Break)
         ========================================= */}
      <CrazyDeals />

      {/* =========================================
          4. BEST SELLERS
         ========================================= */}
      <section className="w-full">
         <BestSeller />
      </section>

      {/* =========================================
          5. CUSTOMER LOVE
         ========================================= */}
      <CustomerLove />

      {/* =========================================
          6. FOOTER & EXTRAS
         ========================================= */}
      <OurPolicy />
      
      <div className="py-10 bg-teal-50/30">
        <NewLetterBox />
      </div>

      <Footer />
    </div>
  );
}

export default Home;