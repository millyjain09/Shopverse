import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/image1.png"
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { adminDataContext } from '../Context/AdminContext';
import { IoLogOutOutline } from "react-icons/io5";

function Nav() {
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext)
  let { getAdmin } = useContext(adminDataContext)

  const LogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      getAdmin()
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full h-[70px] bg-white z-30 fixed top-0 flex items-center justify-between px-6 md:px-10 shadow-md border-b border-gray-100 font-sans'>
      
      {/* Logo Section */}
      <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className='w-10 object-contain' />
        <div>
           <h1 className='text-2xl font-bold text-teal-900 tracking-wide italic'>Shopverse</h1>
           <p className='text-[10px] text-gray-400 font-medium tracking-[0.2em] uppercase -mt-1'>Admin Panel</p>
        </div>
      </div>

      {/* Logout Button */}
      <button 
        className='flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm font-bold' 
        onClick={LogOut}
      >
        <IoLogOutOutline className='text-lg'/>
        <span>Logout</span>
      </button>

    </div>
  )
}

export default Nav;