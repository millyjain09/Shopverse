import React, { useState, useEffect, useContext } from 'react';
import Title from '../Component/Title';
import { ShopDataContext } from '../Context/ShopContext';
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { FaBoxOpen } from "react-icons/fa";

function Order() {
    let [orderData, setOrderData] = useState([]);
    let { currency } = useContext(ShopDataContext);
    let { serverUrl } = useContext(AuthDataContext);

    const loadOrderData = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/order/userOrder', {}, { withCredentials: true });
            if (result.data) {
                let allOrdersItem = [];
                result.data.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrdersItem.push(item);
                    });
                });
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, []);

    return (
        // BACKGROUND: Sea Green Gradient
        <div className='w-full min-h-screen pt-[100px] pb-20 px-4 md:px-10 bg-gradient-to-br from-[#E0F7FA] via-[#E8F5E9] to-white font-sans'>
            
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-10'>
                    <Title text1={'MY '} text2={'ORDERS'} />
                    <p className='text-teal-600 mt-2'>Track your order history and status</p>
                </div>

                <div className='flex flex-col gap-6'>
                    {orderData.length === 0 ? (
                        // EMPTY STATE
                        <div className='flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-teal-50 opacity-70'>
                            <FaBoxOpen className='text-6xl text-teal-200 mb-4' />
                            <p className='text-xl text-gray-500'>No orders found yet.</p>
                        </div>
                    ) : (
                        // ORDER LIST
                        orderData.map((item, index) => (
                            <div key={index} className='bg-white rounded-xl p-6 shadow-sm border border-teal-50 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                                
                                {/* LEFT: Image & Details */}
                                <div className='flex items-start gap-6'>
                                    <img src={item.image1} alt={item.name} className='w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-teal-100 bg-gray-50' />
                                    
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-lg font-bold text-gray-800'>{item.name}</p>
                                        
                                        <div className='flex items-center gap-4 text-sm text-gray-600 mt-1'>
                                            <p className='font-bold text-teal-700'>{currency}{item.price}</p>
                                            <p>Qty: <span className='font-medium text-gray-800'>{item.quantity}</span></p>
                                            <p>Size: <span className='bg-teal-50 px-2 py-0.5 rounded border border-teal-100 text-teal-800 text-xs'>{item.size}</span></p>
                                        </div>

                                        <p className='text-xs text-gray-400 mt-2'>
                                            Ordered on: <span className='text-gray-600 font-medium'>{new Date(item.date).toDateString()}</span>
                                        </p>
                                        <p className='text-xs text-gray-400'>
                                            Payment: <span className='text-gray-600 font-medium uppercase'>{item.paymentMethod}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* RIGHT: Status & Button */}
                                <div className='flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4'>
                                    
                                    {/* Status Indicator */}
                                    <div className='flex items-center gap-2'>
                                        <div className={`w-3 h-3 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-400 animate-pulse'}`}></div>
                                        <p className={`text-sm font-semibold ${item.status === 'Delivered' ? 'text-green-600' : 'text-gray-600'}`}>
                                            {item.status}
                                        </p>
                                    </div>

                                    {/* Track Order Button */}
                                    <button
                                        onClick={loadOrderData}
                                        className='px-6 py-2 rounded-full border border-teal-200 text-teal-700 text-sm font-medium hover:bg-teal-50 hover:border-teal-400 transition-all'
                                    >
                                        Track Order
                                    </button>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Order;