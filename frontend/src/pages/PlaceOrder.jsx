import React, { useState, useContext } from 'react';
import Title from '../Component/Title';
import CartTotal from '../Component/cartTotal';
import razorpay from "../assets/razorpay.png"; 
import { ShopDataContext } from '../Context/ShopContext';
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaLock } from "react-icons/fa"; 
import { Country, State, City } from 'country-state-city'; 

function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(ShopDataContext);
  
  const [formData, setFormData] = useState({
    firstName:'', lastName:'', email:'', street:'', 
    city:'', state:'', pinCode:'', country:'', phone:'',
  });

  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const code = e.target.value; 
    const countryData = Country.getCountryByCode(code);
    setSelectedCountryCode(code);
    setSelectedStateCode(""); 
    setFormData(prev => ({ 
      ...prev, country: countryData ? countryData.name : "", state: '', city: '' 
    }));
  };

  const handleStateChange = (e) => {
    const code = e.target.value; 
    const stateData = State.getStateByCodeAndCountry(code, selectedCountryCode);
    setSelectedStateCode(code);
    setFormData(prev => ({ 
      ...prev, state: stateData ? stateData.name : "", city: '' 
    }));
  };

  const handleCityChange = (e) => {
    setFormData(prev => ({ ...prev, city: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee };

      switch(method){
        case 'cod':
          const result = await axios.post(serverUrl + '/api/order/placeOrder', orderData, { withCredentials:true });
          if(result.data){ setCartItem({}); navigate('/order'); }
          break;
        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials:true });
          if(resultRazorpay.data){ 
              const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: resultRazorpay.data.amount,
                currency: resultRazorpay.data.currency,
                name: 'Order Payment',
                description: 'Order Payment',
                order_id: resultRazorpay.data.id,
                receipt: resultRazorpay.data.receipt,
                handler: async (response) => {
                    const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true });
                    if (data) { navigate('/order'); setCartItem({}); }
                }
              };
              const rzp = new window.Razorpay(options);
              rzp.open();
          }
          break;
        default: break;
      }
    } catch(error){ console.log(error); }
  };

  // SEA GREEN INPUT STYLE
  const inputClass = "border border-gray-300 rounded-lg py-3.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all bg-white text-gray-700";

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#E8F5E9] to-[#FFFFFF] pt-[120px] pb-20 px-4 sm:px-10'>
      
      <style>{`
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>

      <form onSubmit={onSubmitHandler} className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20'>

        {/* LEFT SIDE: Delivery Details */}
        <div className='w-full lg:w-[60%]'>
          <div className='mb-8'>
            <Title text1={"Delivery "} text2={"Information"} />
            <p className='text-teal-600 text-sm mt-2'>Complete your order by providing your details.</p>
          </div>

          <div className='flex flex-col gap-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-teal-50'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <input required name='firstName' onChange={onChangeHandler} value={formData.firstName} className={inputClass} type="text" placeholder='First name' />
              <input required name='lastName' onChange={onChangeHandler} value={formData.lastName} className={inputClass} type="text" placeholder='Last name' />
            </div>
            <input required name='email' onChange={onChangeHandler} value={formData.email} className={inputClass} type="email" placeholder='Email address' />
            <input required name='street' onChange={onChangeHandler} value={formData.street} className={inputClass} type="text" placeholder='Street Address' />

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div className="relative">
                <select required name='country' onChange={handleCountryChange} className={inputClass}>
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <select required name='state' onChange={handleStateChange} className={`${inputClass} ${!selectedCountryCode ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!selectedCountryCode}>
                  <option value="">Select State</option>
                  {selectedCountryCode && State.getStatesOfCountry(selectedCountryCode).map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
               <div className="relative">
                <select required name='city' onChange={handleCityChange} className={`${inputClass} ${!selectedStateCode ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!selectedStateCode}>
                  <option value="">Select City</option>
                  {selectedStateCode && City.getCitiesOfState(selectedCountryCode, selectedStateCode).map((city) => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
              </div>
              <input required name='pinCode' onChange={onChangeHandler} value={formData.pinCode} className={inputClass} type="number" placeholder='Zipcode' />
            </div>
            <input required name='phone' onChange={onChangeHandler} value={formData.phone} className={inputClass} type="number" placeholder='Phone Number' />
          </div>
        </div>

        {/* RIGHT SIDE: Summary */}
        <div className='w-full lg:w-[40%]'>
          <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-teal-100 sticky top-24'>
            <CartTotal />
            
            <div className='mt-8'>
              <Title text1={"Payment "} text2={"Method"} />
              <div className='flex flex-col gap-4 mt-4'>
                <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-300 ${method === 'razorpay' ? 'border-teal-600 bg-teal-50 shadow-md' : 'border-gray-200 hover:bg-gray-50'}`}>
                   <img src={razorpay} className="h-6 object-contain" alt="Razorpay" />
                   <span className='font-medium ml-auto'>Online Payment</span>
                </div>
                <div onClick={() => setMethod('cod')} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-300 ${method === 'cod' ? 'border-teal-600 bg-emerald-50 shadow-md' : 'border-gray-200 hover:bg-gray-50'}`}>
                   <FaMoneyBillWave className="text-emerald-600 text-xl" />
                   <span className='font-medium'>Cash on Delivery</span>
                </div>
              </div>

              <div className='w-full mt-8'>
                <button type='submit' className='w-full bg-teal-900 text-white font-bold text-lg py-4 rounded-xl shadow-xl hover:bg-teal-950 transition-all flex items-center justify-center gap-2'>
                  PLACE ORDER <FaLock className='text-sm text-teal-400'/>
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default PlaceOrder;