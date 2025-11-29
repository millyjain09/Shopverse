import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaBolt, FaArrowRight, FaFire } from "react-icons/fa"; 
import { motion } from 'framer-motion'; // Animation Magic

const CRAZY_DEALS_DATA_BASE = [
    { mainImage: '/src/assets/logo1.jpg', dealText: 'MIN. 50% OFF Dapper Wear', link: '/collection', subText: "Premium Brands" },
    { mainImage: '/src/assets/logo2.jpeg', dealText: 'MIN. 50% OFF Refined Wardrobe', link: '/collection', subText: "Luxury Picks" },
    { mainImage: '/src/assets/logo3.jpg', dealText: 'MIN. 50% OFF Easygoing Styles', link: '/collection', subText: "Daily Comfort" },
    { mainImage: '/src/assets/logo4.webp', dealText: 'MIN. 55% OFF Casual Appeal', link: '/collection/', subText: "Streetwear Special" },
    { mainImage: '/src/assets/logo6.jpg', dealText: 'UNDER ₹899 Regal Charm', link: '/collection/', subText: "Wedding Season" },
];

const DEALS_PER_SLIDE = 5;
const ALL_DEALS = [
    ...CRAZY_DEALS_DATA_BASE,
    ...CRAZY_DEALS_DATA_BASE.map(d => ({ ...d, dealText: 'Flat 60% OFF Winter Style' })),
    ...CRAZY_DEALS_DATA_BASE.map(d => ({ ...d, dealText: 'Clearance Sale Ends Soon' })),
];
const SLIDE_COUNT = Math.ceil(ALL_DEALS.length / DEALS_PER_SLIDE);

function CrazyDeals() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 59, seconds: 59 });

    // Timer Logic
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

    // Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % SLIDE_COUNT);
        }, 5000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-20 bg-gradient-to-br from-teal-950 to-emerald-900 text-white overflow-hidden relative">
            
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 border-b border-teal-800/50 pb-8">
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left"
                    >
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <FaBolt className="text-yellow-400 text-4xl animate-pulse" />
                            <h2 className="text-4xl md:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200 drop-shadow-lg">
                                CRAZY DEALS
                            </h2>
                        </div>
                        <p className="text-teal-200/80 mt-2 text-lg font-medium">Limited Time Offers on Top Brands</p>
                    </motion.div>

                    {/* Timer */}
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl shadow-xl"
                    >
                        <div className="text-right mr-2 hidden sm:block">
                            <p className="text-[10px] text-teal-300 font-bold uppercase tracking-widest animate-pulse">Ends In</p>
                        </div>
                        <div className="flex gap-3 text-center">
                            {['hours', 'minutes', 'seconds'].map((unit, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="bg-white text-teal-900 font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-lg shadow-lg font-mono">
                                        {String(timeLeft[unit]).padStart(2, '0')}
                                    </span>
                                    <span className="text-[9px] text-teal-200 mt-1 uppercase font-bold">{unit.substr(0, 3)}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
                
                {/* --- SLIDER --- */}
                <div className="overflow-hidden relative">
                    <motion.div 
                        className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                        style={{ width: `${SLIDE_COUNT * 100}%`, transform: `translateX(-${currentSlide * (100 / SLIDE_COUNT)}%)` }}
                    >
                        {Array.from({ length: SLIDE_COUNT }).map((_, slideIndex) => {
                            const slideDeals = ALL_DEALS.slice(slideIndex * DEALS_PER_SLIDE, (slideIndex + 1) * DEALS_PER_SLIDE);

                            return (
                                <div key={slideIndex} className="w-full flex-shrink-0" style={{ width: `${100 / SLIDE_COUNT}%` }}>
                                    <div className="flex w-full gap-4 md:gap-6 justify-center px-2">
                                        {slideDeals.length > 0 && slideDeals.map((deal, index) => (
                                            
                                            // --- ANIMATED CARD ---
                                            <motion.div 
                                                key={index} 
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                                viewport={{ once: true }}
                                                onClick={() => navigate(deal.link)} 
                                                className="relative h-[300px] md:h-[360px] rounded-2xl overflow-hidden group cursor-pointer 
                                                           transform transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_10px_30px_rgba(20,184,166,0.4)]
                                                           w-[45%] md:w-1/5 flex-grow bg-gray-800 border border-gray-700" 
                                            >
                                                {/* Image */}
                                                <img 
                                                    src={deal.mainImage} 
                                                    alt={deal.dealText} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                                                />
                                                
                                                {/* Dark Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>

                                                {/* Flash Tag */}
                                                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                                    <FaFire /> HOT DEAL
                                                </div>

                                                {/* Content Overlay */}
                                                <div className="absolute bottom-5 left-4 right-4">
                                                    <p className="text-teal-400 text-xs font-bold mb-1 tracking-widest uppercase">{deal.subText || "Limited Offer"}</p>
                                                    <h3 className="text-white font-extrabold text-lg leading-tight mb-3 drop-shadow-md">
                                                        {deal.dealText}
                                                    </h3>
                                                    
                                                    {/* Slide-up Button */}
                                                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                                                        <span className="text-yellow-400 text-xs font-bold flex items-center gap-2 uppercase tracking-widest bg-white/10 w-fit px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-white hover:text-black transition-colors">
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

                {/* --- DOTS --- */}
                <div className="flex justify-center mt-10 space-x-2">
                    {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                currentSlide === index ? 'w-8 bg-teal-400 shadow-lg shadow-teal-400/50' : 'w-2 bg-gray-600 hover:bg-gray-500'
                            }`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CrazyDeals;