import React, { useState, useContext } from 'react'
import Nav from '../Component/Nav'
import Sidebar from '../Component/Sidebar'
import upload from '../assets/upload.png'
import { AuthDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../Component/Loading'

function Add() {
  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)
  let [name, setName] = useState("")
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("Men")
  let [price, setPrice] = useState("")
  let [subcategory, setsubCategory] = useState("TopWear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)
  let { serverUrl } = useContext(AuthDataContext)

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      let formData = new FormData()
      formData.append("name", name); formData.append("description", description); formData.append("price", price);
      formData.append("category", category); formData.append("subCategory", subcategory); formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1); formData.append("image2", image2); formData.append("image3", image3); formData.append("image4", image4);

      let result = await axios.post(serverUrl + '/api/product/addproduct', formData, { withCredentials: true })
      toast.success("Product Added Successfully! 🚀")
      setLoading(false)
      if (result.data) {
        setName(""); setDescription(""); setImage1(false); setImage2(false); setImage3(false); setImage4(false);
        setPrice(""); setBestSeller(false); setCategory("Men"); setsubCategory("TopWear"); setSizes([]);
      }
    } catch (error) {
      console.log(error); setLoading(false); toast.error("Failed to add product");
    }
  }

  const inputStyle = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all bg-white text-gray-700";

  return (
    <div className='w-full min-h-screen bg-gray-50 font-sans'>
      <Nav />
      <div className='flex'>
        <Sidebar />
        
        {/* MAIN FORM AREA */}
        <div className='flex-1 lg:ml-[250px] mt-[70px] p-8 pb-20'>
          <h1 className='text-2xl font-bold text-gray-800 mb-6'>Add New Product</h1>
          
          <form onSubmit={handleAddProduct} className='max-w-4xl bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col gap-6'>
            
            {/* Image Upload */}
            <div>
              <p className='text-sm font-semibold text-gray-600 mb-3'>Upload Images</p>
              <div className='flex gap-4'>
                {[image1, image2, image3, image4].map((img, index) => (
                  <label key={index} htmlFor={`image${index + 1}`} className='cursor-pointer group'>
                    <img src={!img ? upload : URL.createObjectURL(img)} className='w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300 group-hover:border-teal-500 transition-all' alt="" />
                    <input type="file" id={`image${index + 1}`} hidden onChange={(e) => {
                      if(index===0) setImage1(e.target.files[0]);
                      if(index===1) setImage2(e.target.files[0]);
                      if(index===2) setImage3(e.target.files[0]);
                      if(index===3) setImage4(e.target.files[0]);
                    }} />
                  </label>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <p className='text-sm font-semibold text-gray-600 mb-2'>Product Name</p>
              <input type="text" placeholder='e.g. Classic White Shirt' className={inputStyle} onChange={(e) => setName(e.target.value)} value={name} required />
            </div>

            {/* Description */}
            <div>
              <p className='text-sm font-semibold text-gray-600 mb-2'>Product Description</p>
              <textarea placeholder='Enter details...' className={`${inputStyle} h-32 resize-none`} onChange={(e) => setDescription(e.target.value)} value={description} required />
            </div>

            {/* Categories & Price */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div>
                <p className='text-sm font-semibold text-gray-600 mb-2'>Category</p>
                <select className={inputStyle} onChange={(e) => setCategory(e.target.value)} value={category}>
                  <option value="Men">Men</option><option value="Women">Women</option><option value="Kids">Kids</option>
                </select>
              </div>
              <div>
                <p className='text-sm font-semibold text-gray-600 mb-2'>Sub-Category</p>
                <select className={inputStyle} onChange={(e) => setsubCategory(e.target.value)} value={subcategory}>
                  <option value="TopWear">TopWear</option><option value="BottomWear">BottomWear</option><option value="WinterWear">WinterWear</option>
                </select>
              </div>
              <div>
                <p className='text-sm font-semibold text-gray-600 mb-2'>Price</p>
                <input type="number" placeholder='₹' className={inputStyle} onChange={(e) => setPrice(e.target.value)} value={price} required />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className='text-sm font-semibold text-gray-600 mb-3'>Available Sizes</p>
              <div className='flex gap-3'>
                {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                  <div key={s} onClick={() => setSizes(prev => prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s])}
                    className={`px-4 py-2 rounded cursor-pointer border transition-all font-medium text-sm ${sizes.includes(s) ? 'bg-teal-600 text-white border-teal-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Best Seller Checkbox */}
            <div className='flex items-center gap-2'>
              <input type="checkbox" id='checkbox' className='w-5 h-5 accent-teal-600 cursor-pointer' onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} />
              <label htmlFor="checkbox" className='text-sm text-gray-700 cursor-pointer'>Mark as Best Seller</label>
            </div>

            {/* Button */}
            <button type="submit" className='w-full md:w-auto px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl transition-all shadow-md active:scale-95'>
              {loading ? <Loading /> : "ADD PRODUCT"}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Add