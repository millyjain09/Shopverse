import React, { useContext, useState, useEffect } from 'react';
import { ShopDataContext } from '../Context/ShopContext';
import Title from './Title';
import Card from './Card';
import { motion } from 'framer-motion';

function BestSeller() {
  const { products } = useContext(ShopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filterProduct = products.filter((item) => item.bestSeller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Har card 0.2s ke gap pe aayega
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring" } },
  };

  return (
    <div className='py-20 bg-[#F0FDF4] overflow-hidden'> 
      
      {/* Header Section with Fade In */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='text-center mb-12'
      >
        <Title text1={"BEST "} text2={"SELLERS"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-teal-700 opacity-80 mt-2 font-medium'>
          Tried, Tested, Loved. Discover Our All-Time Customer Favorites.
        </p>
      </motion.div>

      {/* Grid with Staggered Animation */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 gap-y-8 px-4 sm:px-10 max-w-7xl mx-auto'
      >
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants} // Applying individual animation
              whileHover={{ y: -10, transition: { duration: 0.3 } }} // Hover pe upar uthega
            >
              <Card 
                id={item._id} 
                name={item.name} 
                image={item.image1} 
                price={item.price} 
              />
            </motion.div>
          ))
        ) : (
           <div className='col-span-full text-center py-10'>
              <div className="inline-block w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-teal-600 mt-2 text-sm">Loading Best Sellers...</p>
           </div>
        )}
      </motion.div>
    </div>
  );
}

export default BestSeller;