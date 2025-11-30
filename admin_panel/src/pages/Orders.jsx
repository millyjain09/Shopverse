import React, { useState, useEffect, useContext } from 'react'
import Nav from '../Component/Nav'
import Sidebar from '../Component/Sidebar'
import axios from 'axios'
import { AuthDataContext } from '../Context/AuthContext'
import { FaBox } from "react-icons/fa";
import { toast } from 'react-toastify';

function Orders() {
  let [orders, setOrders] = useState([])
  let [filterStatus, setFilterStatus] = useState("All")  
  let { serverUrl } = useContext(AuthDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) { console.log(error) }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) {
        await fetchAllOrders()
        toast.success("Order Status Updated")
      }
    } catch (error) { console.log(error); }
  }

  useEffect(() => { fetchAllOrders() }, [])

  // ⭐ FILTERED LIST BASED ON STATUS
  const filteredOrders = filterStatus === "All"
    ? orders
    : orders.filter(o => o.status === filterStatus)

  return (
    <div className='w-full min-h-screen bg-gray-50 font-sans'>
      <Nav />
      <div className='flex'>
        <Sidebar />

        <div className='flex-1 lg:ml-[250px] mt-[70px] p-8'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold text-gray-800'>Order Management</h1>

            {/* ⭐ FILTER DROPDOWN */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-teal-500'
            >
              <option value="All">All Orders</option>
              <option value="Order Placed">New Orders</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div className='flex flex-col gap-6'>
            {filteredOrders.map((order, index) => (
              <div key={index} className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row justify-between gap-6'>
                
                {/* Left */}
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-teal-50 text-teal-600 rounded-lg text-2xl'><FaBox /></div>
                  <div>
                    <div className='flex flex-col gap-1 mb-2'>
                      {order.items.map((item, idx) => (
                        <p key={idx} className='text-sm font-medium text-gray-800'>
                          {item.name} <span className='text-gray-500'>x {item.quantity}</span>
                          <span className='text-xs bg-gray-100 px-2 py-0.5 rounded ml-2 border'>{item.size}</span>
                        </p>
                      ))}
                    </div>
                    <div className='text-xs text-gray-500 leading-relaxed'>
                      <p className='font-bold text-gray-700'>{order.address.firstName + " " + order.address.lastName}</p>
                      <p>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.pinCode}</p>
                      <p className='text-teal-600 font-medium'>{order.address.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Middle */}
                <div className='text-sm text-gray-600 space-y-1 min-w-[150px]'>
                  <p>Items: <span className='font-bold text-gray-800'>{order.items.length}</span></p>
                  <p>Method: <span className='uppercase font-bold text-gray-800'>{order.paymentMethod}</span></p>
                  <p>Payment: <span className={`font-bold ${order.payment ? 'text-green-600' : 'text-orange-500'}`}>{order.payment ? 'Done' : 'Pending'}</span></p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>

                {/* Right */}
                <div className='flex flex-col justify-between items-end min-w-[180px]'>
                  <p className='text-xl font-bold text-teal-700 mb-4'>₹{order.amount}</p>

                  <select
                    value={order.status}
                    onChange={(e) => statusHandler(e, order._id)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white cursor-pointer'
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Orders
