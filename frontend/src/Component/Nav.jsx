import React, { useContext, useState, useEffect } from 'react';

 import log from "../assets/image1.png";




import { RiSearchLine, RiUserLine, RiShoppingBagLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdOutlineContactPage } from "react-icons/md";
import { userDataContext } from '../Context/UserContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { ShopDataContext } from '../Context/ShopContext.jsx';

function Nav() {
  let { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(AuthDataContext);
  let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(ShopDataContext);

  let [showProfile, setShowProfile] = useState(false);
  let [showNavbar, setShowNavbar] = useState(true);
  let [lastScrollY, setLastScrollY] = useState(0);

  let navigate = useNavigate();
  let location = useLocation(); 

  const handleLogOut = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true });
      getCurrentUser();
      navigate("/login")

    } catch (error) {
      console.log(error);
    }
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); 
    } else {
      setShowNavbar(true); 
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      {/* TOP NAVBAR */}
      <div className={`w-full h-[80px] fixed top-0 left-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
          showNavbar 
          ? 'translate-y-0 bg-white/90 backdrop-blur-md shadow-sm' 
          : '-translate-y-[100%]'
      }`}>
          
        {/* --- LOGO --- */}
        <div className='flex items-center gap-2 cursor-pointer group' onClick={()=>navigate('/')}>
         <img 
    src={log} 
    alt="logo" 
    className='w-[45px] object-contain transition-opacity' 
/>
          <h1 className='text-2xl italic font-bold text-teal-900 tracking-wide font-sans group-hover:text-teal-700 transition-colors'>
            Shopverse
          </h1>
        </div>

        {/* --- DESKTOP MENU --- */}
        <div className='hidden md:flex gap-10 font-medium text-sm text-gray-500'>
          {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
             <p 
               key={item}
               onClick={() => navigate(item === 'HOME' ? '/' : `/${item.toLowerCase()}`)} 
               className={`cursor-pointer hover:text-teal-600 transition-all tracking-widest text-[13px] relative group ${location.pathname === (item === 'HOME' ? '/' : `/${item.toLowerCase()}`) ? 'text-teal-600 font-bold' : ''}`}
             >
               {item}
               <span className='absolute -bottom-1 left-0 w-0 h-[2px] bg-teal-600 transition-all duration-300 group-hover:w-full'></span>
             </p>
          ))}
        </div>

        {/* --- ICONS SECTION (The Part You Wanted to Change) --- */}
        <div className='flex items-center gap-6'>
          
          {/* 1. SEARCH ICON */}
          <div className='group cursor-pointer p-2 rounded-full hover:bg-teal-50 transition-all' onClick={() => { setShowSearch(!showSearch); navigate("/collection"); }}>
             <RiSearchLine className={`text-2xl transition-colors ${showSearch ? 'text-teal-600' : 'text-gray-700 group-hover:text-teal-600'}`} />
          </div>

          {/* 2. PROFILE ICON */}
          <div className='relative group cursor-pointer' onClick={() => setShowProfile(prev => !prev)}>
            {!userData ? (
               <div className='p-2 rounded-full hover:bg-teal-50 transition-all'>
                  <RiUserLine className='text-2xl text-gray-700 group-hover:text-teal-600 transition-colors' />
               </div>
            ) : (
               // Logged In Avatar (Gradient Circle)
               <div className='w-9 h-9 bg-gradient-to-tr from-teal-600 to-emerald-400 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-transparent group-hover:ring-teal-200 transition-all'>
                  {userData?.name.slice(0, 1).toUpperCase()}
               </div>
            )}

            {/* Dropdown Menu */}
            {showProfile && (
              <div className='absolute top-12 right-0 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 animate-fade-in'>
                <ul className='flex flex-col text-gray-600 text-sm'>
                  {!userData ? 
                    <li className='hover:bg-teal-50 hover:text-teal-700 px-5 py-3 transition cursor-pointer' onClick={() => { navigate('/login'); setShowProfile(false); }}>Login</li> 
                    : 
                    <li className='hover:bg-red-50 hover:text-red-500 px-5 py-3 transition cursor-pointer' onClick={() => {handleLogOut(); setShowProfile(false); }}>Logout</li>
                  }
                  <li className='hover:bg-teal-50 hover:text-teal-700 px-5 py-3 transition cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false) }}>My Orders</li>
                </ul>
              </div>
            )}
          </div>

          {/* 3. CART ICON (Bag Style) */}
          <div className='relative cursor-pointer hidden md:block group' onClick={() => navigate('/cart')}>
             <div className='p-2 rounded-full hover:bg-teal-50 transition-all'>
                <RiShoppingBagLine className='text-2xl text-gray-700 group-hover:text-teal-600 transition-colors' />
             </div>
             {/* Cart Badge */}
             <span className='absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm transform group-hover:scale-110 transition-transform'>
               {getCartCount()}
             </span>
          </div>

        </div>

        {/* Search Input Overlay */}
        <div className={`absolute top-[80px] left-0 w-full bg-white border-b border-gray-100 shadow-md overflow-hidden transition-all duration-300 ${showSearch ? 'h-[70px]' : 'h-0'}`}>
           <div className='flex items-center justify-center h-full px-6'>
              <div className='relative w-full max-w-2xl'>
                 <input
                   type="text"
                   placeholder='Search for items...'
                   className='w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-3 rounded-full outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all pl-12'
                   onChange={(e) => { setSearch(e.target.value) }}
                   value={search}
                 />
                 <RiSearchLine className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
              </div>
              <RiCloseLine className='text-2xl text-gray-500 cursor-pointer ml-4 hover:text-red-500' onClick={() => setShowSearch(false)} />
           </div>
        </div>

      </div>

      {/* MOBILE BOTTOM NAVIGATION (Fixed) */}
      <div className='md:hidden fixed bottom-0 left-0 w-full h-[65px] bg-white border-t border-gray-200 shadow-[0_-5px_15px_rgba(0,0,0,0.03)] flex justify-around items-center z-[100] pb-safe'>
        <div onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 cursor-pointer p-2 ${location.pathname === '/' ? 'text-teal-600' : 'text-gray-400'}`}>
          <IoMdHome className={`text-2xl ${location.pathname === '/' ? 'scale-110' : ''}`} />
          <span className='text-[9px] font-semibold uppercase tracking-wide'>Home</span>
        </div>
        <div onClick={() => navigate('/collection')} className={`flex flex-col items-center gap-1 cursor-pointer p-2 ${location.pathname === '/collection' ? 'text-teal-600' : 'text-gray-400'}`}>
          <HiOutlineCollection className={`text-2xl ${location.pathname === '/collection' ? 'scale-110' : ''}`} />
          <span className='text-[9px] font-semibold uppercase tracking-wide'>Shop</span>
        </div>
        <div onClick={() => navigate('/cart')} className={`flex flex-col items-center gap-1 cursor-pointer p-2 relative ${location.pathname === '/cart' ? 'text-teal-600' : 'text-gray-400'}`}>
          <div className='relative'>
             <RiShoppingBagLine className={`text-2xl ${location.pathname === '/cart' ? 'scale-110' : ''}`} />
             {getCartCount() > 0 && <span className='absolute -top-2 -right-2 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold border-2 border-white'>{getCartCount()}</span>}
          </div>
          <span className='text-[9px] font-semibold uppercase tracking-wide'>Cart</span>
        </div>
        <div onClick={() => navigate('/contact')} className={`flex flex-col items-center gap-1 cursor-pointer p-2 ${location.pathname === '/contact' ? 'text-teal-600' : 'text-gray-400'}`}>
          <MdOutlineContactPage className={`text-2xl ${location.pathname === '/contact' ? 'scale-110' : ''}`} />
          <span className='text-[9px] font-semibold uppercase tracking-wide'>Contact</span>
        </div>
      </div>
    </>
  );
}

export default Nav;