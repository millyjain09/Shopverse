import React from 'react'

function Loading() {
  return (
    <div className='flex items-center justify-center'>
      <div className='animate-spin h-6 w-6 border-4 border-teal-100 border-t-teal-600 rounded-full'></div>
    </div>
  )
}

export default Loading;