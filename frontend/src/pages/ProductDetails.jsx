import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopDataContext } from '../Context/ShopContext'
import { FaStar, FaTruck, FaUndo, FaShieldAlt, FaUserCircle } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import RelatedProduct from '../Component/RelatedProduct';
import { useNavigate } from 'react-router-dom';
function ProductDetails() {
  let { productId } = useParams()
  let { products, currency, addToCart } = useContext(ShopDataContext)
  let [productData, setProductData] = useState(false)
   const navigate = useNavigate();
  
  // Image Gallery States
  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  
  const [size, setSize] = useState('')
  const [sizeError, setSizeError] = useState(false)

  
  const [activeTab, setActiveTab] = useState('description');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
        setImage(item.image1)
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className="bg-gradient-to-b from-teal-50/50 to-white min-h-screen pt-[120px] pb-10 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* --- LEFT: IMAGE GALLERY --- */}
          <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col flex-row gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[500px] hide-scrollbar justify-center lg:justify-start py-2">
              {[image1, image2, image3, image4].filter(Boolean).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setImage(img)}
                  className={`w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-xl cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                    image === img ? 'border-teal-600 scale-105 shadow-md' : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

<div
  className="
    flex-1 
    w-full               /* width fix for all screens */
    max-w-[360px]        /* desktop par too wide na ho */
    h-[260px]            /* mobile height */
    sm:h-[350px]         /* small tablets */
    md:h-[430px]         /* tablets */
    lg:h-[500px]         /* desktop */
    bg-white rounded-2xl border border-gray-100 shadow-sm 
    flex items-center justify-center p-4 
    relative overflow-hidden group mx-auto
  "
>

 <img
  src={image}
  alt={productData.name}
  className="
    w-full h-full
    object-contain   /* image full dikhegi, crop nahi hogi */
    transition-transform duration-500 
    group-hover:scale-105
  "
/>

</div>




          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight font-sans">
              {productData.name}
            </h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-yellow-400 text-sm">
                 <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfStroke />
              </div>
              <p className="text-sm text-teal-600 font-medium cursor-pointer hover:underline">(124 Verified Reviews)</p>
            </div>

            <div className="mt-6 flex items-end gap-4">
              <p className="text-4xl font-bold text-teal-700">
                {currency}{productData.price}
              </p>
              <p className="text-lg text-gray-400 line-through mb-1 font-medium">
                {currency}{productData.price + 500}
              </p>
              <span className="mb-2 px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full">
                IN STOCK
              </span>
            </div>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed font-light">
              {productData.description}. Designed for modern styling and maximum comfort. Premium fabric quality ensured by Shopverse.
            </p>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                 <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">Select Size</p>
                 <p className="text-sm text-teal-600 cursor-pointer hover:underline font-medium">Size Chart</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => { setSize(item); setSizeError(false) }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg border font-medium transition-all duration-200 flex items-center justify-center ${
                      item === size ? 'bg-teal-600 text-white border-teal-600 shadow-lg scale-110' : 'bg-white text-gray-700 border-gray-200 hover:border-teal-400 hover:text-teal-600'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {sizeError && (
                 <p className="text-red-500 text-sm mt-2 animate-bounce font-medium">⚠️ Please select a size to proceed.</p>
              )}
            </div>

            <div className="mt-8 flex items-center gap-4">
               {/* <button
                 className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold py-4 rounded-full shadow-xl shadow-teal-200 hover:shadow-teal-300 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-lg uppercase tracking-wider"
                 onClick={() => {
                   if (!size) { setSizeError(true); return; }
                   addToCart(productData._id, size)
                 }}
               >
                 Add To Cart
               </button> */}
   <button
    className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold py-2 rounded-full shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all duration-300 text-sm uppercase tracking-wider"
    onClick={() => {
      if (!size) { setSizeError(true); return; }
      addToCart(productData._id, size);
    }}
  >
    Add To Cart
  </button>
 <button
    className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold py-1.5 rounded-full shadow-md shadow-cyan-300 hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all duration-300 text-sm uppercase tracking-wider"
    onClick={() => {
      if (!size) { setSizeError(true); return; }
      
      // 1. Add item to cart
      addToCart(productData._id, size);
      
      // 2. Redirect to cart page
       navigate("/placeOrder")
    }}
  >
    Buy Now
  </button>
 
               <button className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
               </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
               <div className="flex flex-col items-center justify-center text-center gap-2">
                  <FaTruck className="text-2xl text-teal-600"/>
                  <p className="text-xs text-gray-500 font-medium">Fast Delivery</p>
               </div>
               <div className="flex flex-col items-center justify-center text-center gap-2 border-l border-gray-100">
                  <FaUndo className="text-2xl text-teal-600"/>
                  <p className="text-xs text-gray-500 font-medium">7 Days Return</p>
               </div>
               <div className="flex flex-col items-center justify-center text-center gap-2 border-l border-gray-100">
                  <FaShieldAlt className="text-2xl text-teal-600"/>
                  <p className="text-xs text-gray-500 font-medium">Original Product</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- DESCRIPTION & REVIEWS SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-8 py-4 text-sm font-bold transition-all ${activeTab === 'description' ? 'text-teal-800 border-b-2 border-teal-600 bg-teal-50' : 'text-gray-500 hover:text-teal-600'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-8 py-4 text-sm font-bold transition-all ${activeTab === 'reviews' ? 'text-teal-800 border-b-2 border-teal-600 bg-teal-50' : 'text-gray-500 hover:text-teal-600'}`}
          >
            Reviews (124)
          </button>
        </div>
        
        {/* Content Box */}
        <div className="py-8 px-6 bg-white border border-t-0 border-gray-200 text-gray-600 leading-relaxed text-sm md:text-base rounded-b-xl shadow-sm min-h-[150px]">
          
          {/* 1. Description Content */}
          {activeTab === 'description' && (
            <div className="animate-fade-in">
              <p>
                Elevate your style with this premium piece from Shopverse. Crafted with attention to detail, this product ensures both durability and comfort. Whether you're heading to a casual outing or a formal event, this versatile addition to your wardrobe will keep you looking sharp.
              </p>
              <p className="mt-4">
                Made from high-quality materials that are breathable and soft on the skin. Easy to wash and maintain. Our commitment to quality ensures that this product will last you for seasons to come.
              </p>
            </div>
          )}

          {/* 2. Reviews Content (Dummy Data) */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-6 animate-fade-in">
               {[1, 2, 3].map((item) => (
                 <div key={item} className="flex gap-4 items-start border-b border-gray-100 pb-4 last:border-none">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                       <FaUserCircle size={24} />
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-800 text-sm">Verified Buyer</h4>
                          <div className="flex text-yellow-400 text-xs"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                       </div>
                       <p className="text-sm text-gray-600 italic">"Amazing product! The quality is top-notch and fits perfectly. Delivery was super fast too. Will definitely buy again."</p>
                    </div>
                 </div>
               ))}
               <p className="text-center text-teal-600 text-sm cursor-pointer hover:underline mt-2">View all 124 reviews</p>
            </div>
          )}

        </div>
      </div>

      {/* --- RELATED PRODUCTS --- */}
      <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RelatedProduct 
          category={productData.category} 
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>

    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-teal-50/30">
       <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
    </div>
  )
}

export default ProductDetails