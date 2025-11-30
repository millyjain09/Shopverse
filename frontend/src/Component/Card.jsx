import React, { useContext, useMemo } from 'react';
import { ShopDataContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";

function Card({ id, image, name, price }) {
  const { currency } = useContext(ShopDataContext);
  
  const ratingData = useMemo(() => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rating = (3.5 + (hash % 16) / 10).toFixed(1);
    const reviews = 50 + (hash % 450);
    return { rating, reviews };
  }, [id]);

  return (
    <Link 
      to={`/productDetail/${id}`} 
      className="group relative block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-teal-50 cursor-pointer h-full"
    >
<div className="relative w-full 
  h-[180px]        /* mobile */
  sm:h-[230px]     /* small devices */
  md:h-[260px]     /* medium tablets */
  lg:h-[320px]     /* desktop */
  overflow-hidden bg-gray-100">

  <img 
    src={image}
    alt={name}
    className="
      w-full h-full 
      object-cover object-bottom
      transition-transform duration-700 ease-out 
      group-hover:scale-110 group-hover:opacity-95
    "
  />
</div>


      <div className="p-4 flex flex-col gap-2 bg-white relative z-10">
        <h3 className="text-gray-700 font-semibold text-[15px] leading-tight line-clamp-1 group-hover:text-teal-600 transition-colors duration-300">
          {name}
        </h3>

        <div className="flex items-center gap-1">
           {[...Array(5)].map((_, i) => (
             <FaStar key={i} className={`text-xs ${i < Math.round(ratingData.rating) ? "text-yellow-400" : "text-gray-200"}`} />
           ))}
           <span className="text-xs text-gray-400 ml-1">({ratingData.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-1">
           <div className="flex flex-col">
             <span className="text-lg font-bold text-teal-700 font-sans">
               {currency}{price}
             </span>
           </div>
           
           <div className="w-8 h-8 rounded-full border border-teal-100 flex items-center justify-center group-hover:bg-teal-50 group-hover:border-teal-200 transition-colors">
              <span className="text-teal-400 group-hover:text-teal-700 text-sm transition-colors">➜</span>
           </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;