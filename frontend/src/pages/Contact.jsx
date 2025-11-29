import React from "react";
import Title from "../Component/Title";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import NewLetterBox from "../Component/NewLetterBox"; 
import Footer from "../Component/Footer"; 

const Contact = () => {
  // ✅ FIX: Direct URL use kar rahe hain taaki missing file ka error na aaye
  const contactImg = "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="w-full min-h-screen bg-white pt-[100px] font-sans">
      
      {/* Header Title */}
      <div className="text-center mb-16 mt-10">
        <Title text1={"Contact "} text2={"Us"} />
        <p className="text-gray-500 mt-2">We'd love to hear from you! Reach out for any queries.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex flex-col md:flex-row gap-12 items-start justify-center mb-20">
        
        {/* --- LEFT: CONTACT CARDS & IMAGE --- */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
           <motion.img 
             initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
             src={contactImg} 
             alt="Contact" 
             className="w-full md:max-w-md h-auto rounded-xl shadow-lg mb-4 mx-auto md:mx-0 border border-gray-200 object-cover"
           />
           
           <div className="flex flex-col gap-4">
              {/* Phone Card */}
              <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-teal-500 hover:shadow-md transition-all group">
                 <div className="p-4 bg-teal-50 rounded-full text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors"><FaPhoneAlt /></div>
                 <div>
                    <h3 className="font-bold text-gray-800">Call Us</h3>
                    <p className="text-gray-600 text-sm">+91 98765 43210</p>
                 </div>
              </div>

              {/* Email Card */}
              <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-teal-500 hover:shadow-md transition-all group">
                 <div className="p-4 bg-teal-50 rounded-full text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors"><FaEnvelope /></div>
                 <div>
                    <h3 className="font-bold text-gray-800">Email Us</h3>
                    <p className="text-gray-600 text-sm">support@shopverse.com</p>
                 </div>
              </div>

              {/* Address Card */}
              <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-teal-500 hover:shadow-md transition-all group">
                 <div className="p-4 bg-teal-50 rounded-full text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors"><FaMapMarkerAlt /></div>
                 <div>
                    <h3 className="font-bold text-gray-800">Visit Us</h3>
                    <p className="text-gray-600 text-sm">Shopverse HQ, New Delhi, India</p>
                 </div>
              </div>
           </div>
        </div>

        {/* --- RIGHT: CONTACT FORM --- */}
        <motion.form 
          initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}
          className="w-full md:w-[45%] bg-white p-8 rounded-2xl shadow-xl border border-teal-50 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-emerald-500"></div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            Send a Message <span className="text-teal-500 text-sm font-normal">(We reply fast!)</span>
          </h3>
          
          <div className="flex flex-col gap-5">
             <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all bg-gray-50 focus:bg-white" />
             </div>
             
             <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input type="email" placeholder="Your Email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all bg-gray-50 focus:bg-white" />
             </div>

             <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea rows="5" placeholder="How can we help you?" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all bg-gray-50 focus:bg-white resize-none"></textarea>
             </div>

             <button className="mt-2 w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-teal-500/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
               Send Message <FaPaperPlane className="text-sm"/>
             </button>
          </div>
        </motion.form>

      </div>

      {/* --- FOOTER & NEWSLETTER --- */}
      <NewLetterBox />
      <Footer />
    </div>
  );
};

export default Contact;