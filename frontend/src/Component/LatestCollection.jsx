import React, { useContext, useState, useEffect } from 'react';
import { ShopDataContext } from '../Context/ShopContext';
import Title from './Title';
import Card from './Card';
import { motion } from 'framer-motion';

function LatestCollection() {
  const { products } = useContext(ShopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8)); // Showing top 8 products
  }, [products]);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } // Fast sequence
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className='py-20 bg-white'>
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='text-center mb-12'
      >
        <Title text1={"LATEST "} text2={"COLLECTIONS"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-teal-700 opacity-80 mt-2 font-medium'>
          Step into Style — New Collection Dropping This Season!
        </p>
      </motion.div>

      {/* Responsive Grid Layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 gap-y-8 px-4 sm:px-10 max-w-7xl mx-auto'
      >
        {latestProducts.length > 0 ? (
          latestProducts.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
                id={item._id} 
                name={item.name} 
                image={item.image1} 
                price={item.price} 
              />
            </motion.div>
          ))
        ) : (
           // Loading State
           <div className='col-span-full text-center py-10'>
              <div className="inline-block w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-teal-600 mt-2 text-sm">Loading New Arrivals...</p>
           </div>
        )}
      </motion.div>

    </div>
  );
}

export default LatestCollection;