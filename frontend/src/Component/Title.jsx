import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className='inline-flex gap-3 items-center justify-center mb-3'>
      
      {/* Text Part */}
      <p className='text-gray-500 text-2xl sm:text-3xl font-medium uppercase tracking-wide'>
        {text1} 
        <span className='text-teal-700 font-bold ml-2 font-sans'>{text2}</span>
      </p>
      
      {/* Decorative Line */}
      <p className='w-10 sm:w-16 h-[2px] bg-teal-700 rounded-full'></p>
      
    </div>
  )
}

export default Title