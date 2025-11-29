import React from "react";
import Title from "../Component/Title";
import { FaShippingFast, FaTags, FaHeadset, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import NewLetterBox from "../Component/NewLetterBox"; // ✅ Added
import Footer from "../Component/Footer"; // ✅ Added
import aboutImg from "../assets/about.png"; 

const About = () => {
  const features = [
    { icon: <FaShippingFast />, title: "Super Fast Delivery", desc: "We ensure your style reaches you before the trend fades." },
    { icon: <FaTags />, title: "Best Prices", desc: "Premium fashion that doesn't break the bank." },
    { icon: <FaHeadset />, title: "24/7 Support", desc: "We are always here to help you with your queries." },
    { icon: <FaLeaf />, title: "Eco Friendly", desc: "Sustainable packaging for a better tomorrow." },
  ];

  return (
    <div className="w-full min-h-screen bg-white pt-[100px] font-sans">
      
      {/* --- TOP SECTION: STORY --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex flex-col md:flex-row items-center gap-12 mb-20 mt-10">
        
        {/* Image Side */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <img src={aboutImg} alt="About Us" className="w-full h-auto rounded-2xl shadow-xl border border-teal-100 hover:scale-[1.02] transition-transform duration-500" />
        </motion.div>

        {/* Text Side */}
        <motion.div 
           initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}
           className="w-full md:w-1/2 flex flex-col gap-6"
        >
          <div className="text-left">
            <Title text1={"About "} text2={"Shopverse"} />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome to <b className="text-teal-700">Shopverse</b>, where fashion meets convenience. 
            Born out of a passion for style and a commitment to quality, we bring you the latest trends right to your doorstep.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our mission is simple: To empower you to look and feel your best without compromise. 
            Whether you are looking for casual wear, office attire, or party outfits, we have got you covered.
          </p>
          
          <div className="mt-4 p-4 bg-teal-50 border-l-4 border-teal-600 rounded-r-lg">
            <h3 className="font-bold text-gray-800 text-xl mb-2">Our Vision</h3>
            <p className="text-gray-600 italic">"To become the world's most customer-centric fashion destination."</p>
          </div>
        </motion.div>
      </div>

      {/* --- MIDDLE SECTION: WHY CHOOSE US --- */}
      <div className="bg-[#F0FDF4] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
            <div className="text-center mb-12">
            <Title text1={"Why "} text2={"Choose Us"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
                <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}
                className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:border-teal-500 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                >
                <div className="text-4xl text-teal-600 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
            ))}
            </div>
        </div>
      </div>
      
      {/* --- BOTTOM SECTION: NEWSLETTER & FOOTER --- */}
      <div className="mt-10">
        <NewLetterBox />
      </div>
      <Footer />

    </div>
  );
};

export default About;