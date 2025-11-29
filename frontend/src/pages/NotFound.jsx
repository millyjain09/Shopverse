import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

function NotFound() {
  let navigate = useNavigate();

  return (
    // SEA GREEN THEME BACKGROUND
    <div className='w-full min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex flex-col items-center justify-center text-center px-4 font-sans'>
        
        {/* Animated Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className='max-w-lg'
        >
            {/* Icon */}
            <FaExclamationTriangle className='text-6xl text-yellow-400 mx-auto mb-6 drop-shadow-md' />

            {/* 404 Heading */}
            <h1 className='text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600'>
                404
            </h1>

            {/* Message */}
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mt-4'>
                Oops! Page Not Found
            </h2>
            <p className='text-gray-500 mt-3 text-sm md:text-base'>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            {/* Action Button */}
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='mt-8 px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-full shadow-lg hover:shadow-teal-500/40 transition-all flex items-center gap-2 mx-auto'
                onClick={() => navigate("/")}
            >
                <FaHome /> Back to Home
            </motion.button>

        </motion.div>

        {/* Background Decorative Elements (Circles) */}
        <div className='absolute top-20 left-20 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob'></div>
        <div className='absolute bottom-20 right-20 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000'></div>
    </div>
  )
}

export default NotFound