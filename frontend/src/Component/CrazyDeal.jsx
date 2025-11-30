import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBolt, FaArrowRight, FaFire } from "react-icons/fa";
import { motion } from 'framer-motion';
import img1 from '../assets/logo1.jpg';
import img2 from '../assets/logo2.jpeg';
import img3 from '../assets/logo3.jpg';
import img4 from '../assets/logo4.webp';
import img5 from '../assets/logo6.jpg';

const CRAZY_DEALS_DATA_BASE = [
    { mainImage: img1, dealText: 'MIN. 50% OFF Dapper Wear', link: '/collection', subText: "Premium Brands" },
    { mainImage: img2, dealText: 'MIN. 50% OFF Refined Wardrobe', link: '/collection', subText: "Luxury Picks" },
    { mainImage: img3, dealText: 'MIN. 50% OFF Easygoing Styles', link: '/collection', subText: "Daily Comfort" },
    { mainImage: img4, dealText: 'MIN. 55% OFF Casual Appeal', link: '/collection', subText: "Streetwear Special" },
    { mainImage: img5, dealText: 'UNDER ₹899 Regal Charm', link: '/collection', subText: "Wedding Season" },
];

// Desktop = 5
const DEALS_PER_SLIDE_DESKTOP = 5;

// Mobile = 3
const DEALS_PER_SLIDE_MOBILE = 3;

const ALL_DEALS = [
    ...CRAZY_DEALS_DATA_BASE,
    ...CRAZY_DEALS_DATA_BASE.map(d => ({ ...d, dealText: 'Flat 60% OFF Winter Style' })),
    ...CRAZY_DEALS_DATA_BASE.map(d => ({ ...d, dealText: 'Clearance Sale Ends Soon' })),
];

function CrazyDeals() {
    const navigate = useNavigate();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Update on resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const dealsPerSlide = isMobile ? DEALS_PER_SLIDE_MOBILE : DEALS_PER_SLIDE_DESKTOP;

    const SLIDE_COUNT = Math.ceil(ALL_DEALS.length / dealsPerSlide);

    // Timer
    const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 59, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return { hours: 12, minutes: 0, seconds: 0 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % SLIDE_COUNT);
        }, 5000);
        return () => clearInterval(interval);
    }, [SLIDE_COUNT]);

    return (
        <div className="py-20 bg-gradient-to-br from-teal-950 to-emerald-900 text-white overflow-hidden relative">

            <div className="container mx-auto px-4 relative z-10">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 border-b border-teal-800/50 pb-8">

                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="text-center md:text-left"
                    >
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <FaBolt className="text-yellow-400 text-4xl animate-pulse" />
                            <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-200">
                                CRAZY DEALS
                            </h2>
                        </div>
                        <p className="text-teal-200/80 mt-2 text-lg font-medium">
                            Limited Time Offers on Top Brands
                        </p>
                    </motion.div>

                    {/* TIMER */}
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-2xl shadow-xl"
                    >
                        {['hours', 'minutes', 'seconds'].map((unit, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className="bg-white text-teal-900 font-bold text-xl w-10 h-10 flex items-center justify-center rounded-lg shadow-lg">
                                    {String(timeLeft[unit]).padStart(2, '0')}
                                </span>
                                <span className="text-[9px] text-teal-200 mt-1 uppercase font-bold">
                                    {unit.substring(0, 3)}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                </div>

                {/* SLIDER */}
                <div className="overflow-hidden relative w-full">
                    <motion.div
                        className="flex transition-transform duration-700 ease-out"
                        style={{
                            width: `${SLIDE_COUNT * 100}%`,
                            transform: `translateX(-${currentSlide * (100 / SLIDE_COUNT)}%)`,
                        }}
                    >
                        {Array.from({ length: SLIDE_COUNT }).map((_, slideIndex) => {
                            const slideDeals = ALL_DEALS.slice(
                                slideIndex * dealsPerSlide,
                                (slideIndex + 1) * dealsPerSlide
                            );

                            return (
                                <div
                                    key={slideIndex}
                                    className="w-full flex-shrink-0 px-2"
                                    style={{ width: `${100 / SLIDE_COUNT}%` }}
                                >
                                    <div className="grid grid-cols-3 md:flex gap-4 md:gap-6">

                                        {slideDeals.map((deal, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                onClick={() => navigate(deal.link)}
                                                className="
                                                    relative 
                                                    h-[200px] sm:h-[260px] md:h-[360px]
                                                    rounded-2xl overflow-hidden group cursor-pointer
                                                    bg-gray-800 border border-gray-700
                                                    w-full md:w-1/5
                                                "
                                            >
                                                <img 
                                                    src={deal.mainImage}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>

                                                

                                                <div className="absolute bottom-5 left-3 right-3">
                                                    <p className="text-teal-400 text-xs font-bold uppercase tracking-widest">{deal.subText}</p>
                                                    <h3 className="text-white font-extrabold text-sm sm:text-lg leading-tight">
                                                        {deal.dealText}
                                                    </h3>

                                                    {/* BUTTON ONLY DESKTOP */}
                                                    <div className="hidden md:flex mt-2">
                                                        <span className="text-yellow-400 text-xs font-bold flex items-center gap-2 uppercase bg-white/10 px-3 py-2 rounded-lg">
                                                            Shop Now <FaArrowRight />
                                                        </span>
                                                    </div>
                                                </div>

                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* DOTS */}
                <div className="flex justify-center mt-10 space-x-2">
                    {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                currentSlide === index 
                                    ? 'w-8 bg-teal-400'
                                    : 'w-2 bg-gray-600'
                            }`}
                        ></button>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default CrazyDeals;
