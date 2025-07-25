import React, { useContext } from 'react'
import { assets, plans } from '../src/assets/assets';
import { AppContext } from '../context/AppContext';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const BuyCredit = () => {
  const { user , backendUrl,loadCreditsData,token,setShowLogin} = useContext(AppContext);
  const navigate = useNavigate()
  const initPay = async (order)=>{
    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Credits Payment',
      description:'Credits Payment',
      order_id:order.id,
      receipt: order.receipt,
      handler:async(response)=>{
        try {
          const {data} = await axios.post(backendUrl+'/api/user/verify',response,{headers:{token}})
          if(data.success){
            loadCreditsData();
            navigate('/')
            toast.message('Credit Added')
          }
        } catch (error) {
          toast.error(error.message)
        }

      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  const paymentRazorpay = async (planId)=>{
    try{
      if(!user){
        setShowLogin(true)
      }
      const {data} = await axios.post(backendUrl+'/api/user/pay',{planId},{headers:{token}})
      if(data.success){
        initPay(data.order)
      }
    }
    catch(error){
      toast.error(error.message)
    }

  }

  return (
    <motion.div
      initial={{opacity:0.2, y:100}} 
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-amber-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>Choose the plan</h1>
      
      <div className='flex flex-wrap justify-center gap-6 text-left mt-8'>
        {plans.map((plan, index) => (
          <div
            key={index}
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-6 text-gray-600 hover:scale-105 transition-all duration-500 max-w-xs w-full'
          >
            <img width={40} src={assets.logo_icon} alt="Logo" />
            <p className='mt-3 mb-1 font-semibold'>{plan.id}</p>
            <p className='text-sm'>{plan.desc}</p>

            {/* Price Section */}
            <p className='mt-6'>
              <span className='text-2xl font-bold text-black'>${plan.price}</span>
              <span className='ml-1'>/ {plan.credits} credits</span>
            </p>

            <button onClick={()=>paymentRazorpay(plan.id)} 
            className='mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition'>
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
