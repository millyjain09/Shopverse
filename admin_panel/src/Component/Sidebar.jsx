import React from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaList, FaBoxOpen } from "react-icons/fa"; // Improved Icons
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  let navigate = useNavigate();
  let location = useLocation(); // To highlight active tab

  // Helper function for active style
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center justify-center md:justify-start gap-4 px-6 py-4 cursor-pointer transition-all duration-300 border-r-4 
    ${isActive 
      ? 'bg-teal-900/50 border-teal-400 text-teal-300' 
      : 'border-transparent hover:bg-gray-800 text-gray-400 hover:text-white'
    }`;
  };

  return (
    <div className='w-[18%] lg:w-[250px] min-h-screen bg-gray-900 text-white fixed left-0 top-[70px] border-r border-gray-800 z-20 font-sans shadow-xl'>
      
      <div className='flex flex-col pt-10 gap-2'>
        
        {/* Add Items */}
        <div className={getLinkClass("/add")} onClick={() => navigate("/add")}>
          <IoMdAddCircleOutline className="text-2xl" />
          <p className='hidden md:block font-medium tracking-wide'>Add Items</p>
        </div>

        {/* List Items */}
        <div className={getLinkClass("/lists")} onClick={() => navigate("/lists")}>
          <FaList className="text-xl" />
          <p className='hidden md:block font-medium tracking-wide'>List Items</p>
        </div>

        {/* Orders */}
        <div className={getLinkClass("/orders")} onClick={() => navigate("/orders")}>
          <FaBoxOpen className="text-xl" />
          <p className='hidden md:block font-medium tracking-wide'>Orders</p>
        </div>

      </div>

      {/* Bottom Version Info (Optional) */}
      <div className='absolute bottom-10 left-0 w-full text-center hidden md:block'>
         <p className='text-xs text-gray-600'>Admin Panel v1.0</p>
      </div>

    </div>
  )
}

export default Sidebar;