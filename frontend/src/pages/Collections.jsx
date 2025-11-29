import React, { useContext, useState, useEffect } from 'react'
import { FaChevronRight, FaAngleDown, FaFilter, FaSortAmountDown } from "react-icons/fa";
import Title from '../Component/Title';
import { ShopDataContext } from '../Context/ShopContext';
import Card from '../Component/Card';
import { motion } from 'framer-motion';

function Collections() {
  let [showFilter, setShowFilter] = useState(false);
  let { products, search, showSearch } = useContext(ShopDataContext);
  
  let [filterProduct, setFilterProduct] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relavant");

  useEffect(() => { setFilterProduct(products); }, [products]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProduct(productCopy);
  };

  const sortProducts = () => {
    let fbCopy = filterProduct.slice();
    switch (sortType) {
      case 'low-high': setFilterProduct(fbCopy.sort((a, b) => (a.price - b.price))); break;
      case 'high-low': setFilterProduct(fbCopy.sort((a, b) => (b.price - a.price))); break;
      default: applyFilter(); break;
    }
  };

  useEffect(() => { sortProducts(); }, [sortType]);
  useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch]);

  return (
    <div className='w-full min-h-screen bg-[#F0FDF4] pt-[100px] pb-10 px-4 sm:px-8 font-sans'>
      
      <div className='max-w-7xl mx-auto mb-8'>
         <div className='flex flex-col md:flex-row justify-between items-end border-b border-teal-200 pb-4'>
            <Title text1={"DISCOVER "} text2={"COLLECTIONS"} />
            <p className='text-teal-600 pb-2 text-sm md:text-base'>Find your perfect style from our premium selection.</p>
         </div>
      </div>

      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-10'>
        
        {/* --- LEFT SIDEBAR (Filters) --- */}
        <div className='min-w-[260px] lg:sticky lg:top-[100px] '>
          
          <div 
            className='lg:hidden flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-teal-100 mb-4 cursor-pointer' 
            onClick={() => setShowFilter(prev => !prev)}
          >
            <p className='font-bold flex items-center gap-2 text-teal-800'>
              <FaFilter className='text-teal-600' /> Filters
            </p>
            {showFilter ? <FaAngleDown className='text-teal-500' /> : <FaChevronRight className='text-teal-500' />}
          </div>

          <div className={`flex flex-col gap-6 lg:block ${showFilter ? "block" : "hidden"}`}>
            
            <div className='bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-teal-50 **lg:max-h-[calc(100vh-120px)] overflow-y-auto**'>
              <h3 className='text-lg font-bold text-teal-900 mb-4 flex items-center gap-2 border-b border-teal-50 pb-2'>
                Category
              </h3>
              <div className='flex flex-col gap-3'>
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                    <input 
                      type="checkbox" 
                      className='w-5 h-5 rounded border-gray-300 accent-teal-600 focus:ring-teal-500 transition-all cursor-pointer' 
                      value={cat} 
                      onChange={toggleCategory} 
                    />
                    <span className='text-gray-600 group-hover:text-teal-600 group-hover:translate-x-1 transition-all duration-200 font-medium'>{cat}</span>
                  </label>
                ))}
              </div>

              <h3 className='text-lg font-bold text-teal-900 mt-8 mb-4 flex items-center gap-2 border-b border-teal-50 pb-2'>
                Type
              </h3>
              <div className='flex flex-col gap-3'>
                {['TopWear', 'BottomWear', 'WinterWear'].map((sub) => (
                  <label key={sub} className='flex items-center gap-3 cursor-pointer group'>
                    <input 
                      type="checkbox" 
                      className='w-5 h-5 rounded border-gray-300 accent-teal-600 focus:ring-teal-500 transition-all cursor-pointer' 
                      value={sub} 
                      onChange={toggleSubCategory} 
                    />
                    <span className='text-gray-600 group-hover:text-teal-600 group-hover:translate-x-1 transition-all duration-200 font-medium'>{sub}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE (Grid) --- */}
        <div className='flex-1'>
          
          <div className='flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-teal-50'>
            <p className='text-gray-500 text-sm'>Showing <span className='font-bold text-teal-900'>{filterProduct.length}</span> Products</p>
            
            <div className='flex items-center gap-2'>
              <FaSortAmountDown className='text-teal-400 hidden sm:block' />
              <select 
                className='border-none bg-transparent text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer outline-none hover:text-teal-600' 
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="relavant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>

          <motion.div 
            layout
            className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'
          >
            {
              filterProduct && filterProduct.length > 0 ? (
                filterProduct.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card name={item.name} image={item.image1} id={item._id} price={item.price} />
                  </motion.div>
                ))
              ) : (
                <div className='col-span-full flex flex-col items-center justify-center py-20 opacity-50'>
                   <p className='text-xl font-bold text-gray-300'>No Products Found</p>
                </div>
              )
            }
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Collections;