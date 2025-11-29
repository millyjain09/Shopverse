import React, { useState, useEffect, useContext } from 'react'
import Nav from '../Component/Nav'
import Sidebar from '../Component/Sidebar'
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

function Lists() {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(AuthDataContext);

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data);
    } catch (error) { console.log(error) }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) {
        toast.error("Product Removed");
        fetchList();
      }
    } catch (error) { console.log(error) }
  }

  useEffect(() => { fetchList() }, [])

  return (
    <div className='w-full min-h-screen bg-gray-50 font-sans'>
      <Nav />
      <div className='flex'>
        <Sidebar />
        
        <div className='flex-1 lg:ml-[250px] mt-[70px] p-8'>
          <h1 className='text-2xl font-bold text-gray-800 mb-6'>All Products List</h1>

          {/* Table Header */}
          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-4 bg-teal-700 text-white py-3 px-4 rounded-t-lg text-sm font-bold uppercase'>
            <p>Image</p> <p>Name</p> <p>Category</p> <p>Price</p> <p className='text-center'>Action</p>
          </div>

          {/* List Items */}
          <div className='flex flex-col bg-white shadow-sm border border-gray-200 rounded-b-lg'>
            {list?.length > 0 ? (list.map((item, index) => (
              <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-4 items-center p-4 border-b border-gray-100 hover:bg-teal-50 transition-colors last:border-none'>
                <img src={item.image1} className='w-12 h-12 object-cover rounded border border-gray-200' alt="" />
                <p className='text-gray-800 font-medium text-sm truncate'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.category}</p>
                <p className='text-teal-700 font-bold text-sm'>₹{item.price}</p>
                <div className='flex justify-center'>
                   <button onClick={() => removeList(item._id)} className='text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all'>
                     <FaTrash />
                   </button>
                </div>
              </div>
            ))) : (
              <p className='text-center py-10 text-gray-500'>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lists