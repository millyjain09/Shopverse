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
      await axios.post(
        serverUrl + '/api/auth/registration',
        { name, email, password },
        { withCredentials: true }
      );

      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;

      await axios.post(
        serverUrl + '/api/auth/googlelogin',
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );

      getCurrentUser();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="
        w-full min-h-screen
        bg-gradient-to-br from-[#E0F7FA] via-[#E8F5E9] to-white
        flex flex-col items-center justify-center
        px-4 sm:px-6 md:px-8 py-6
        font-sans
      "
    >

      {/* LOGO TOP LEFT */}
      <div
        className="
          absolute top-4 left-4 sm:top-6 sm:left-6
          flex items-center gap-2 cursor-pointer
          hover:scale-105 transition-transform
        "
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="w-8 sm:w-10 drop-shadow-sm" />
        <h1 className="text-lg sm:text-xl font-bold text-teal-900 italic tracking-wide">
          Shopverse
        </h1>
      </div>

      {/* CARD */}
      <div
        className="
          w-full max-w-[480px]
          bg-white rounded-2xl shadow-xl border border-teal-50
          p-6 sm:p-10
          mt-10
          relative overflow-hidden
        "
      >
        {/* DECOR LINE */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-emerald-500"></div>

        {/* TITLE */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-teal-600/80 text-xs sm:text-sm mt-1">
            Join Shopverse for exclusive deals & trends
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="flex flex-col gap-4 sm:gap-5">

          {/* FULL NAME */}
          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full px-3 sm:px-4 py-2.5 sm:py-3
                rounded-xl bg-teal-50/40 text-gray-800
                border border-teal-100
                text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-teal-500
                focus:bg-white transition-all
              "
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-3 sm:px-4 py-2.5 sm:py-3
                rounded-xl bg-teal-50/40 text-gray-800
                border border-teal-100
                text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-teal-500
                focus:bg-white transition-all
              "
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">
              Password
            </label>

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Create a password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full px-3 sm:px-4 py-2.5 sm:py-3
                  rounded-xl bg-teal-50/40 text-gray-800
                  border border-teal-100
                  text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  focus:bg-white transition-all
                "
              />

              {/* EYE ICON */}
              <div
                className="
                  absolute right-3 sm:right-4 top-1/2 -translate-y-1/2
                  text-teal-500 hover:text-teal-700
                  cursor-pointer transition-colors
                "
                onClick={() => setShow(!show)}
              >
                {show ? <IoIosEye size={22} /> : <FaRegEyeSlash size={20} />}
              </div>
            </div>
          </div>

          {/* CREATE ACCOUNT */}
          <button
            type="submit"
            className="
              w-full py-3 sm:py-3.5 mt-2
              rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600
              hover:from-teal-700 hover:to-emerald-700
              text-white font-bold text-base sm:text-lg
              shadow-lg shadow-teal-500/30
              active:scale-95 transition-all
            "
          >
            Create Account
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 sm:gap-4 my-2">
            <div className="h-[1px] w-full bg-gray-200"></div>
            <span className="text-gray-400 text-xs sm:text-sm">OR</span>
            <div className="h-[1px] w-full bg-gray-200"></div>
          </div>

          {/* GOOGLE SIGNUP */}
          <div
            onClick={googleSignup}
            className="
              w-full py-2.5 sm:py-3
              rounded-xl border border-gray-200
              bg-white hover:bg-gray-50
              flex items-center justify-center gap-2 sm:gap-3
              text-gray-700 font-medium
              text-sm sm:text-base
              cursor-pointer transition-all
            "
          >
            <img src={google} alt="Google" className="w-4 sm:w-5" />
            <span>Sign up with Google</span>
          </div>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-xs sm:text-sm text-gray-600 mt-6 sm:mt-8">
          Already have an account?{" "}
          <span
            className="text-teal-600 font-bold cursor-pointer hover:underline"
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
