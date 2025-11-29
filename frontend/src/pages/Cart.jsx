import React, { useContext, useState, useEffect } from 'react';
import Title from '../Component/Title';
import { ShopDataContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri"; 
import CartTotal from '../Component/CartTotal';
import { FaArrowRight } from "react-icons/fa6";

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(ShopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    Object.keys(cartItem).forEach((productId) => {
      Object.keys(cartItem[productId]).forEach((size) => {
        const quantity = cartItem[productId][size];
        if (!size || quantity <= 0) return;
        const productData = products.find((p) => p._id === productId);
        if (!productData) return;
        tempData.push({
          _id: productId,
          size: size,
          quantity: quantity,
        });
      });
    });
    setCartData(tempData);
  }, [cartItem, products]);

  return (
    <div className='w-full min-h-screen pt-[100px] pb-[50px] px-4 md:px-8 bg-gradient-to-br from-[#E0F7FA] via-[#E8F5E9] to-[#FFFFFF]'>
      
      {/* Page Title */}
      <div className='text-center mb-10'>
        <Title text1={'YOUR '} text2={'CART'} />
      </div>

      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-10'>
        
        {/* LEFT SIDE: Cart Items */}
        <div className='w-full lg:w-[65%] flex flex-col gap-6'>
          {cartData.length === 0 ? (
            <div className='text-center py-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-teal-50'>
              <p className='text-2xl text-teal-800 font-light'>Your cart is feeling light.</p>
              <button onClick={() => navigate('/collection')} className='mt-4 text-teal-600 font-semibold hover:underline cursor-pointer'>
                Start Shopping
              </button>
            </div>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              return (
                <div 
                  key={index} 
                  className='bg-white rounded-2xl p-5 shadow-sm border border-teal-50 hover:shadow-md transition-all duration-300 relative overflow-hidden'
                >
                  <div className='flex gap-5 items-center'>
                    <div className='w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl border border-teal-100'>
                      <img className='w-full h-full object-cover hover:scale-110 transition-transform duration-500' src={productData.image1} alt="" />
                    </div>

                    <div className='flex-1'>
                      <div className='flex justify-between items-start'>
                        <h3 className='text-lg font-bold text-gray-800 truncate w-[80%]'>{productData.name}</h3>
                        <p className='text-teal-700 font-bold text-lg'>{currency}{productData.price}</p>
                      </div>

                      <div className='flex items-center gap-4 mt-2 text-sm text-gray-500'>
                        <span className='px-3 py-1 bg-teal-50 border border-teal-100 text-teal-800 rounded-lg'>Size: {item.size}</span>
                      </div>

                      <div className='flex justify-between items-center mt-4'>
                        <div className='flex items-center gap-2'>
                          <span className='text-xs text-gray-400 font-medium'>QTY:</span>
                          <input
                            type="number"
                            min={1}
                            defaultValue={item.quantity}
                            className="w-16 py-1 px-2 text-center text-gray-800 font-semibold bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 transition-all"
                            onChange={(e) =>
                              e.target.value === "" || e.target.value === "0"
                                ? null
                                : updateQuantity(item._id, item.size, Number(e.target.value))
                            }
                          />
                        </div>

                        <button 
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className='text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50'
                        >
                          <RiDeleteBin6Line size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT SIDE: Summary */}
        {cartData.length > 0 && (
          <div className='w-full lg:w-[35%] h-fit lg:sticky lg:top-[120px]'>
            <div className='bg-white rounded-2xl shadow-lg border border-teal-100 p-6 md:p-8'>
              <h2 className='text-xl font-bold text-teal-900 mb-6 border-b border-teal-50 pb-4'>Order Summary</h2>
              
              <div className='mb-6'>
                 <CartTotal />
              </div>

              <button
                className='w-full py-4 rounded-xl text-white font-bold text-lg tracking-wide bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 shadow-xl shadow-teal-200 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95'
                onClick={() => navigate("/placeOrder")}
              >
                CHECKOUT NOW <FaArrowRight />
              </button>
              
              <div className='mt-6 flex flex-col gap-2 text-xs text-gray-400 text-center'>
                 <p>Free shipping on all orders over {currency}500</p>
                 <p>Secure Checkout • 100% Buyer Protection</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;