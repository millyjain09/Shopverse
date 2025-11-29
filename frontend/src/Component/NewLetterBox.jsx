import React from 'react'

const NewLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault(); // Page reload na ho
    }

  return (
    <div className='text-center py-8 px-4'>
        <p className='text-2xl font-bold text-gray-800'>
            Subscribe now & get <span className='text-teal-600'>20% off</span>
        </p>
        <p className='text-gray-500 mt-3 max-w-xl mx-auto'>
            Join our community to get the latest updates on new arrivals, exclusive offers, and fashion tips directly to your inbox.
        </p>
        
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-teal-200 pl-3 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-teal-400 transition-all'>
            <input 
                className='w-full sm:flex-1 outline-none text-gray-600 px-2 placeholder:text-gray-400' 
                type="email" 
                placeholder='Enter your email' 
                required
            />
            <button 
                type='submit' 
                className='bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-bold px-8 py-4 hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 uppercase tracking-wider'
            >
                Subscribe
            </button>
        </form>
    </div>
  )
}

export default NewLetterBox