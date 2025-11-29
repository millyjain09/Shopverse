import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from "../assets/sv_logo.png";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io"; 
import { motion } from "framer-motion";

function Footer() {
  const navigate = useNavigate();

  const handleNav = (path) => {
    window.scrollTo(0, 0); // Page top par scroll hoga
    navigate(path);
  };

  return (
    // DEEP OCEAN THEME FOOTER
    <div className='w-full mt-20 bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-950 text-gray-300 font-sans'>
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

          {/* 1. BRAND SECTION */}
          <div className='flex flex-col gap-5'>
            <div className='flex items-center gap-3 cursor-pointer' onClick={() => handleNav('/')}>
              <img src={logo} alt="logo" className='w-10 opacity-90 brightness-200' />
              <p className='text-2xl font-bold text-white italic tracking-wider'>Shopverse</p>
            </div>
            <p className='text-sm text-gray-400 leading-relaxed'>
              Shopverse is your premium online shopping destination. We believe in quality, style, and sustainability.
            </p>
            
            <div className='flex gap-3 mt-2'>
              {[FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5, backgroundColor: '#14b8a6', color: '#fff' }} 
                  className='w-9 h-9 rounded-full bg-teal-900/50 flex items-center justify-center cursor-pointer border border-teal-800 transition-colors text-teal-400'
                >
                  <Icon size={14} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* 2. QUICK LINKS (Corrected Paths) */}
          <div>
            <h3 className='text-lg font-bold text-white mb-6 border-b-2 border-teal-600 w-fit pb-1'>QUICK LINKS</h3>
            <ul className='flex flex-col gap-3 text-sm'>
              <li onClick={() => handleNav('/')} className='cursor-pointer flex items-center gap-2 hover:text-teal-400 transition-all'><IoIosArrowForward className='text-teal-600 text-xs' /> Home</li>
              <li onClick={() => handleNav('/collection')} className='cursor-pointer flex items-center gap-2 hover:text-teal-400 transition-all'><IoIosArrowForward className='text-teal-600 text-xs' /> Collection</li>
              <li onClick={() => handleNav('/about')} className='cursor-pointer flex items-center gap-2 hover:text-teal-400 transition-all'><IoIosArrowForward className='text-teal-600 text-xs' /> About Us</li>
              <li onClick={() => handleNav('/contact')} className='cursor-pointer flex items-center gap-2 hover:text-teal-400 transition-all'><IoIosArrowForward className='text-teal-600 text-xs' /> Contact</li>
            </ul>
          </div>

          {/* 3. POLICIES (Mapped to About/Contact for now) */}
          <div>
            <h3 className='text-lg font-bold text-white mb-6 border-b-2 border-teal-600 w-fit pb-1'>POLICIES</h3>
            <ul className='flex flex-col gap-3 text-sm'>
              {/* Policies ke liye abhi hum About page hi khol rahe hain jahan details hain */}
              <li onClick={() => handleNav('/about')} className='cursor-pointer flex items-center gap-2 hover:text-teal-400 transition-all'><IoIosArrowForward className='text-teal-600 text-xs' /> Privacy Policy</li>
              <li onClick={() => handleNav('/about')} className='cursor-pointer flex items-center gap-2 hover:text-teal-400 transition-all'><IoIosArrowForward className='text-teal-600 text-xs' /> Terms & Conditions</li>
              <li onClick={() => handleNav('/about')} className='cursor-pointer flex items-center gap-2 hover:text-teal-400 transition-all'><IoIosArrowForward className='text-teal-600 text-xs' /> Return Policy</li>
              <li onClick={() => handleNav('/about')} className='cursor-pointer flex items-center gap-2 hover:text-teal-400 transition-all'><IoIosArrowForward className='text-teal-600 text-xs' /> Delivery Info</li>
            </ul>
          </div>

          {/* 4. CONTACT INFO */}
          <div>
            <h3 className='text-lg font-bold text-white mb-6 border-b-2 border-teal-600 w-fit pb-1'>CONTACT US</h3>
            <ul className='flex flex-col gap-4 text-sm'>
              <li className='flex items-start gap-3'>
                <div className='mt-1 p-2 bg-teal-900/50 rounded-full text-teal-400'><FaPhoneAlt size={12} /></div>
                <div>
                  <p className='text-gray-400 text-xs'>Call Us</p>
                  <p className='text-white font-medium'>+91 98765 43210</p>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <div className='mt-1 p-2 bg-teal-900/50 rounded-full text-teal-400'><FaEnvelope size={12} /></div>
                <div>
                  <p className='text-gray-400 text-xs'>Email Us</p>
                  <p className='text-white font-medium'>support@shopverse.com</p>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <div className='mt-1 p-2 bg-teal-900/50 rounded-full text-teal-400'><FaMapMarkerAlt size={12} /></div>
                <div>
                  <p className='text-gray-400 text-xs'>Location</p>
                  <p className='text-white font-medium'>New Delhi, India</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* --- COPYRIGHT BAR --- */}
      <div className='border-t border-teal-800/30 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500'>
          <p>© 2025 Shopverse.com — All Rights Reserved.</p>
          <div className='flex gap-4 mt-2 md:mt-0'>
             <span className='hover:text-teal-400 cursor-pointer'>Privacy</span>
             <span className='hover:text-teal-400 cursor-pointer'>Terms</span>
             <span className='hover:text-teal-400 cursor-pointer'>Sitemap</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer;