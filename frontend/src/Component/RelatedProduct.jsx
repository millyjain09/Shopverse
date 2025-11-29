import React, { useContext, useState, useEffect } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import Title from './Title'
import Card from './Card'
import { motion } from 'framer-motion' // Animation ke liye

function RelatedProduct({ category, subCategory, currentProductId }) {
    
    let { products } = useContext(ShopDataContext)
    let [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice()
            // Same category filter
            productsCopy = productsCopy.filter((item) => category === item.category)
            // Same sub-category filter
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            // Exclude current product
            productsCopy = productsCopy.filter((item) => currentProductId !== item._id)
            
            // Take top 4 or 5
            setRelated(productsCopy.slice(0, 4))
        }
    }, [products, category, subCategory, currentProductId])

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 } // Fast domino effect
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        // Container with slight top margin
        <div className='mt-24 mb-10 w-full'>
            
            {/* Header Section - Centered & Clean */}
            <div className='text-center mb-12'>
                <Title text1={"RELATED "} text2={"PRODUCTS"} />
                <p className='w-full md:w-1/2 m-auto text-xs sm:text-sm text-teal-600 mt-2 font-medium opacity-80'>
                    Complete your look with these handpicked suggestions just for you.
                </p>
            </div>

            {/* Animated Grid */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 gap-y-8 px-4 md:px-8 max-w-7xl mx-auto'
            >
                {related.length > 0 ? (
                    related.map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card 
                                id={item._id} 
                                name={item.name} 
                                price={item.price} 
                                image={item.image1}
                            />
                        </motion.div>
                    ))
                ) : (
                    // Empty State (Agar related product na mile)
                    <div className='col-span-full text-center py-10 text-gray-400 italic'>
                        No related products found at the moment.
                    </div>
                )}
            </motion.div>
            
        </div>
    )
}

export default RelatedProduct