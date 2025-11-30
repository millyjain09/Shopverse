import React, { useState, useContext } from 'react';
import logo from '../assets/image1.png';

import { useNavigate } from 'react-router-dom';
import google from '../assets/google.webp';
import { IoIosEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase.js';
import { userDataContext } from '../Context/UserContext.jsx';

function Login() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { serverUrl } = useContext(AuthDataContext);
  let { getCurrentUser } = useContext(userDataContext);

  const handleLogin = async(e) => {
      e.preventDefault();
    try{
      const result = await axios.post(serverUrl+'/api/auth/login',{email,password},{withCredentials:true})
        getCurrentUser();
        navigate("/")
    } catch(error){ console.log(error); }
  }

  const googleLogin = async() => {
    try{
      const response = await signInWithPopup(auth,provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      const result = await axios.post(serverUrl+'/api/auth/googlelogin',{name,email},{withCredentials:true})
      getCurrentUser();
      navigate("/");
    } catch(err){ console.log(err); }
  }
  
  return (
    <div className='w-full min-h-screen 
      bg-gradient-to-br from-[#E0F7FA] via-[#E8F5E9] to-[#FFFFFF]  
      flex flex-col items-center justify-center 
      p-4 sm:p-6 md:p-8'  /* responsive */
    >
      
      <div 
        className='absolute top-4 left-4 sm:top-6 sm:left-6 
        flex items-center gap-2 sm:gap-3 
        cursor-pointer hover:scale-105 transition-transform'
        onClick={() => navigate("/")}
      >
        <img className='w-8 sm:w-10 drop-shadow-sm' src={logo} alt="logo" />
        <h1 className='text-lg sm:text-xl font-bold text-teal-900 tracking-wide'>
          ShopVerse
        </h1>
      </div>

      <div className='w-full max-w-[450px] 
        bg-white rounded-2xl shadow-xl border border-teal-50 
        p-6 sm:p-10 
        transform transition-all hover:shadow-2xl'
      >
        
        <div className='text-center mb-6 sm:mb-8'>
           <h2 className='text-2xl sm:text-3xl font-bold text-teal-900 mb-1'>
             Welcome Back
           </h2>
           <p className='text-teal-600/70 text-xs sm:text-sm'>
             Please enter your details to sign in
           </p>
        </div>

        <form className='flex flex-col gap-4 sm:gap-5' onSubmit={handleLogin}>
          
          <div className='flex flex-col gap-1'>
            <label className='text-xs sm:text-sm font-semibold text-teal-800 ml-1'>
              Email Address
            </label>
            <input
              type="email"
              className='w-full px-3 sm:px-4 py-2.5 sm:py-3 
                rounded-xl bg-teal-50/50 text-gray-800 
                border border-teal-100 
                focus:outline-none focus:ring-2 focus:ring-teal-500 
                focus:bg-white transition-all text-sm sm:text-base'
              placeholder='Enter your email'
              required 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
            />
          </div>

          <div className='flex flex-col gap-1 relative'>
            <label className='text-xs sm:text-sm font-semibold text-teal-800 ml-1'>
              Password
            </label>
            <div className='relative'>
              <input
                type={show ? "text" : "password"}
                className='w-full px-3 sm:px-4 py-2.5 sm:py-3 
                  rounded-xl bg-teal-50/50 text-gray-800 border border-teal-100 
                  focus:outline-none focus:ring-2 focus:ring-teal-500 
                  focus:bg-white transition-all text-sm sm:text-base'
                placeholder='Enter your password'
                required 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
              />
              <div 
                className='absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 
                  cursor-pointer text-teal-500 hover:text-teal-700 transition-colors'
                onClick={() => setShow(prev => !prev)}
              >
                {show ? <IoIosEye size={22} /> : <FaRegEyeSlash size={20} />}
              </div>
            </div>
            
            <div className='flex justify-end mt-1'>
               <span className='text-[10px] sm:text-xs text-teal-600 hover:text-teal-800 cursor-pointer font-medium'>
                 Forgot Password?
               </span>
            </div>
          </div>

          <button
            className='w-full py-3 sm:py-3.5 mt-2 
              rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 
              hover:from-teal-700 hover:to-emerald-700 
              text-white font-bold text-base sm:text-lg 
              shadow-lg shadow-teal-500/30 transition-all duration-300 
              transform active:scale-95'
            type='submit'
          >
            Sign In
          </button>

          <div className='flex items-center gap-3 my-2'>
            <div className='h-[1px] w-full bg-teal-100'></div>
            <span className='text-teal-400 text-xs sm:text-sm font-medium'>OR</span>
            <div className='h-[1px] w-full bg-teal-100'></div>
          </div>

          <div 
            className='w-full py-2.5 sm:py-3 rounded-xl border border-teal-200 
              bg-white hover:bg-teal-50 text-teal-800 font-medium 
              flex items-center justify-center gap-2 sm:gap-3 
              cursor-pointer transition-all duration-200 text-sm sm:text-base' 
            onClick={googleLogin}
          >
            <img className='w-4 sm:w-5' src={google} alt="Google" />
            <span>Continue with Google</span>
          </div>

        </form>

        <p className='text-center text-xs sm:text-sm text-gray-600 mt-6 sm:mt-8'>
          Don't have an account?{' '}
          <span
            className='text-teal-700 font-bold cursor-pointer hover:underline'
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login;
