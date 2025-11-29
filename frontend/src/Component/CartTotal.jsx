import React, { useContext } from 'react';
import { ShopDataContext } from '../Context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopDataContext);

  return (
    <div className='w-full'>
      <div className='text-2xl mb-4'>
        <Title text1={'CART '} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm bg-white p-6 rounded-xl shadow-md border border-blue-50'>
        {/* Subtotal */}
        <div className='flex justify-between py-2'>
          <p className='text-gray-500 font-medium'>Subtotal</p>
          <p className='text-gray-800 font-bold'>{currency} {getCartAmount()}.00</p>
        </div>
        
        <hr className='border-gray-100' />

        {/* Shipping Fee */}
        <div className='flex justify-between py-2'>
          <p className='text-gray-500 font-medium'>Shipping Fee</p>
          <p className='text-green-600 font-bold'>+ {currency} {delivery_fee}.00</p>
        </div>

        <hr className='border-gray-200 border-dashed' />

        {/* Grand Total */}
        <div className='flex justify-between py-4'>
          <b className='text-lg text-gray-900'>Total Amount</b>
          <b className='text-xl text-blue-600'>
            {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </b>
        </div>
        
        <p className='text-xs text-gray-400 text-center mt-2'>Inclusive of all taxes</p>
      </div>
    </div>
  );
};

export default CartTotal;