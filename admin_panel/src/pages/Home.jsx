import React, { useContext, useEffect, useState } from 'react'
import Nav from '../Component/Nav'
import Sidebar from '../Component/Sidebar'
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { FaBoxOpen, FaShoppingBag } from "react-icons/fa";

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const { serverUrl } = useContext(AuthDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {}, { withCredentials: true })
      setTotalProducts(products.data.length)

      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
      setTotalOrders(orders.data.length)
    } catch (error) {
      console.log("Failed to Fetch counts", error)
    }
  }
  useEffect(() => { fetchCounts() }, [])

  return (
    <div className='w-full min-h-screen bg-gray-50 font-sans'>
      <Nav />
      <div className='flex'>
        <Sidebar />
        
        {/* MAIN CONTENT AREA */}
        <div className='flex-1 p-8 lg:ml-[250px] mt-[70px]'>
          <h1 className='text-3xl font-bold text-gray-800 mb-8'>Dashboard Overview</h1>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            
            {/* Total Products Card */}
            <div className='bg-white p-6 rounded-2xl shadow-md border border-teal-100 flex items-center gap-6 hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-2xl'>
                <FaBoxOpen />
              </div>
              <div>
                <p className='text-gray-500 text-sm font-medium uppercase tracking-wide'>Total Products</p>
                <h2 className='text-4xl font-bold text-gray-800'>{totalProducts}</h2>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className='bg-white p-6 rounded-2xl shadow-md border border-emerald-100 flex items-center gap-6 hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl'>
                <FaShoppingBag />
              </div>
              <div>
                <p className='text-gray-500 text-sm font-medium uppercase tracking-wide'>Total Orders</p>
                <h2 className='text-4xl font-bold text-gray-800'>{totalOrders}</h2>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home