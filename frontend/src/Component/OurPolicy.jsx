import React from 'react'
import { FaExchangeAlt, FaCheckCircle, FaHeadset } from "react-icons/fa";

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      {/* Easy Exchange */}
      <div className='flex flex-col items-center gap-3 group cursor-pointer'>
        <div className='p-4 bg-teal-50 rounded-full mb-2 group-hover:bg-teal-100 transition-colors duration-300'>
            <FaExchangeAlt className='w-8 h-8 text-teal-600' />
        </div>
        <p className='font-bold text-gray-800 group-hover:text-teal-700'>Easy Exchange Policy</p>
        <p className='text-gray-500'>We offer hassle free exchange policy</p>
      </div>

      {/* Return Policy */}
      <div className='flex flex-col items-center gap-3 group cursor-pointer'>
        <div className='p-4 bg-teal-50 rounded-full mb-2 group-hover:bg-teal-100 transition-colors duration-300'>
            <FaCheckCircle className='w-8 h-8 text-teal-600' />
        </div>
        <p className='font-bold text-gray-800 group-hover:text-teal-700'>7 Days Return Policy</p>
        <p className='text-gray-500'>We provide 7 days free return policy</p>
      </div>

      {/* Customer Support */}
      <div className='flex flex-col items-center gap-3 group cursor-pointer'>
        <div className='p-4 bg-teal-50 rounded-full mb-2 group-hover:bg-teal-100 transition-colors duration-300'>
            <FaHeadset className='w-8 h-8 text-teal-600' />
        </div>
        <p className='font-bold text-gray-800 group-hover:text-teal-700'>Best Customer Support</p>
        <p className='text-gray-500'>we provide 24/7 customer support</p>
      </div>

    </div>
  )
}

export default OurPolicy