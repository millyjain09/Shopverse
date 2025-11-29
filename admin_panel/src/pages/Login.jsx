import React, { useContext, useState } from 'react'
import logo from '../assets/vcart_logo.png' // Ensure logo path is correct
import { IoIosEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { AuthDataContext } from '../Context/AuthContext.jsx';
import { adminDataContext } from '../Context/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { serverUrl } = useContext(AuthDataContext)
  let { getAdmin } = useContext(adminDataContext)
  let navigate = useNavigate();

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + '/api/auth/adminlogin', { email, password }, { withCredentials: true })
      toast.success("Welcome Back, Boss! 😎")
      getAdmin();
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Invalid Admin Credentials")
    }
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#E8F5E9] to-[#FFFFFF] flex flex-col items-center justify-center font-sans'>
      
      {/* Brand Header */}
      <div className='absolute top-8 left-8 flex items-center gap-3'>
        <img className='w-10 object-contain drop-shadow-sm' src={logo} alt="logo" />
        <h1 className='text-2xl font-bold text-teal-900 tracking-wide italic'>Shopverse Admin</h1>
      </div>

      {/* Login Card */}
      <div className='w-[90%] max-w-[450px] bg-white rounded-2xl shadow-2xl border border-teal-50 p-10 relative overflow-hidden'>
        
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 to-emerald-600"></div>

        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>Admin Portal</h2>
          <p className='text-teal-600 text-sm mt-2'>Sign in to manage your store</p>
        </div>

        <form onSubmit={adminLogin} className='flex flex-col gap-5'>
          
          <div className='flex flex-col gap-1'>
            <label className='text-xs font-bold text-gray-500 uppercase tracking-wider ml-1'>Email Address</label>
            <input
              type="email"
              className='w-full px-4 py-3 rounded-xl bg-teal-50/30 text-gray-800 border border-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all'
              placeholder='admin@gmail.com'
              required onChange={(e) => setEmail(e.target.value)} value={email}
            />
          </div>

          <div className='flex flex-col gap-1 relative'>
            <label className='text-xs font-bold text-gray-500 uppercase tracking-wider ml-1'>Password</label>
            <div className='relative'>
              <input
                type={show ? "text" : "password"}
                className='w-full px-4 py-3 rounded-xl bg-teal-50/30 text-gray-800 border border-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all'
                placeholder='Enter password'
                required onChange={(e) => setPassword(e.target.value)} value={password}
              />
              <div className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-teal-600' onClick={() => setShow(prev => !prev)}>
                {show ? <IoIosEye size={20} /> : <FaRegEyeSlash size={18} />}
              </div>
            </div>
          </div>

          <button
            className='w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-bold text-lg shadow-lg shadow-teal-500/30 transform active:scale-95 transition-all'
            type='submit'
          >
            Access Dashboard
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login