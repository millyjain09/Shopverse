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

  const slides = [
    {
      id: 1,
      tag: "MEGA SALE LIVE",
      title: "Flat 50% Off ",
      subtitle: "Grab the best deals before they are gone.",
      img: hero1,
      bg: "from-teal-100 via-white to-teal-50",
      btnColor: "bg-red-600 hover:bg-red-700",
      icon: <FaFireAlt className="text-orange-500" />
    },
    {
      id: 2,
      tag: "WINTER SPECIAL",
      title: "Buy 1 Get 1 Free ",
      subtitle: "Warm up your style this season.",
      img: hero2,
      bg: "from-emerald-100 via-white to-emerald-50",
      btnColor: "bg-teal-800 hover:bg-teal-900",
      icon: <FaStar className="text-yellow-500" />
    },
    {
      id: 3,
      tag: "ETHNIC ELEGANCE",
      title: "Premium Collection",
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
    }, 2500); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden font-sans">
      <Nav />

      {/* HERO SECTION */}
    {/* HERO SECTION */}
<div
  className="
    relative w-full 
    h-[80vh] sm:h-[85vh] md:h-[90vh]
    overflow-hidden 
    mt-[85px] sm:mt-[70px]
  "
>
  {slides.map((slide, index) => (
    <div
      key={slide.id}
      className={`absolute inset-0 w-full h-full flex flex-col
        md:flex-row items-center justify-between
        transition-opacity duration-1000 ease-in-out px-4 sm:px-10
        ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}
        bg-gradient-to-br ${slide.bg}`}
    >

      {/* TEXT SECTION */}
      <div className="
        flex-1 flex flex-col items-center md:items-start 
        text-center md:text-left gap-2 sm:gap-4 mt-4 sm:mt-6 z-20
      ">

        <motion.div 
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 px-4 py-1 bg-white/80 
            border border-gray-200 rounded-full shadow-sm"
        >
          {slide.icon}
          <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide">
            {slide.tag}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="
            text-3xl sm:text-4xl md:text-6xl font-extrabold 
            leading-tight mt-2 sm:mt-3
          "
        >
          {slide.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-sm sm:text-lg md:text-xl 
            text-gray-700 font-medium max-w-[320px]"
        >
          {slide.subtitle}
        </motion.p>

        {/* BUTTON */}
        <motion.button
          onClick={() => navigate('/collection')}
          className={`
            mt-3 sm:mt-5 px-8 py-3 sm:py-4 
            text-white text-sm sm:text-lg font-bold 
            rounded-full shadow-lg transition-all hover:scale-105 
            flex items-center gap-2 sm:gap-3 ${slide.btnColor}
          `}
        >
          Check Offer <FaTags />
        </motion.button>
      </div>

      {/* IMAGE SECTION (MOBILE OPTIMIZED) */}
      <div className="
        flex-1 flex items-end justify-center 
        relative mt-4 sm:mt-8
      ">
        <motion.img 
          src={slide.img}
          className="
            h-[45vh] sm:h-[55vh] md:h-[80%] 
            object-contain drop-shadow-xl 
            transition-transform duration-700
          "
        />
      </div>

    </div>
  ))}

  {/* DOTS */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
    {slides.map((_, idx) => (
      <div 
        key={idx}
        onClick={() => setCurrentSlide(idx)}
        className={`
          h-2 w-2 sm:h-3 sm:w-3 rounded-full cursor-pointer 
          transition-all border border-gray-400 
          ${currentSlide === idx ? "bg-teal-800 w-6 sm:w-8" : "bg-gray-300"}
        `}
      ></div>
    ))}
  </div>
</div>


      {/* OTHER SECTIONS */}
      <LatestCollection />
      <CrazyDeals />
      <BestSeller />
      <CustomerLove />
      <OurPolicy />

      <div className="py-10 bg-teal-50/30">
        <NewLetterBox />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
