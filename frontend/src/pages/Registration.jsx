import React, { useState, useContext } from 'react';
import logo from '../assets/image1.png';
import { useNavigate } from 'react-router-dom';
import google from '../assets/google.webp';
import { IoIosEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import { AuthDataContext } from '../Context/AuthContext.jsx';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase.js';
import { userDataContext } from '../Context/UserContext.jsx';

function Registration() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(AuthDataContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { getCurrentUser } = useContext(userDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration', { name, email, password }, { withCredentials: true });
      getCurrentUser();
      navigate("/");
      console.log("Registered");
    } catch (error) {
      console.log(error);
    }
  }

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(serverUrl + '/api/auth/googlelogin', { name, email }, { withCredentials: true });
      getCurrentUser();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    // SEA GREEN THEME BACKGROUND
    <div className='w-full min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#E8F5E9] to-[#FFFFFF] flex flex-col items-center justify-center p-4 font-sans'>
      
      {/* Logo Header - Click to go Home */}
      <div
        className='absolute top-6 left-6 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform'
        onClick={() => navigate("/")}
      >
        <img className='w-10 drop-shadow-sm' src={logo} alt="logo" />
        <h1 className='text-xl font-bold text-teal-900 tracking-wide italic'>Shopverse</h1>
      </div>

      {/* Registration Card */}
      <div className='w-full max-w-[480px] bg-white rounded-2xl shadow-xl border border-teal-50 p-8 sm:p-10 relative overflow-hidden'>
        
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-emerald-500"></div>

        <div className='text-center mb-8'>
           <h2 className='text-3xl font-bold text-gray-800 mb-2'>Create Account</h2>
           <p className='text-teal-600/80 text-sm'>Join Shopverse for exclusive deals & trends</p>
        </div>

        <form onSubmit={handleSignup} className='flex flex-col gap-5'>
          
          {/* Name Input */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-semibold text-gray-600 ml-1'>Full Name</label>
            <input
              id="username"
              name="name"
              type="text"
              className='w-full px-4 py-3 rounded-xl bg-teal-50/30 text-gray-800 border border-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all'
              placeholder='John Doe'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          {/* Email Input */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-semibold text-gray-600 ml-1'>Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className='w-full px-4 py-3 rounded-xl bg-teal-50/30 text-gray-800 border border-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all'
              placeholder='john@example.com'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          {/* Password Input */}
          <div className='flex flex-col gap-1 relative'>
            <label className='text-sm font-semibold text-gray-600 ml-1'>Password</label>
            <div className='relative'>
              <input
                type={show ? "text" : "password"}
                id="password"
                name="password"
                className='w-full px-4 py-3 rounded-xl bg-teal-50/30 text-gray-800 border border-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all'
                placeholder='Create a password'
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div 
                className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-teal-500 hover:text-teal-700 transition-colors'
                onClick={() => setShow(prev => !prev)}
              >
                {show ? <IoIosEye size={22} /> : <FaRegEyeSlash size={20} />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className='w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-lg shadow-lg shadow-teal-500/30 transition-all duration-300 transform active:scale-95'
            type='submit'
          >
            Create Account
          </button>

          {/* Divider */}
          <div className='flex items-center gap-4 my-1'>
            <div className='h-[1px] w-full bg-gray-200'></div>
            <span className='text-gray-400 text-sm font-medium'>OR</span>
            <div className='h-[1px] w-full bg-gray-200'></div>
          </div>

          {/* Google Button */}
          <div 
            className='w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium flex items-center justify-center gap-3 cursor-pointer transition-all duration-200' 
            onClick={googleSignup}
          >
            <img className='w-5' src={google} alt="Google" />
            <span>Sign up with Google</span>
          </div>

        </form>

        {/* Footer Link */}
        <p className='text-center text-sm text-gray-500 mt-8'>
          Already have an account?{' '}
          <span
            className='text-teal-600 font-bold cursor-pointer hover:underline'
            onClick={() => navigate("/Login")}
          >
            Login here
          </span>
        </p>

      </div>
    </div>
  );
}

export default Registration;