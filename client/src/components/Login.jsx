import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../../context/AppContext';
import {motion} from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  const [state, setState] = useState('Login');
  const { setShowLogin , backendUrl , setToken , setUser} = useContext(AppContext)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState(''); 
  
  
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    if (state === 'SignUp' && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      if(state==='Login'){
        const {data} = await axios.post(backendUrl + '/api/user/login',{email,password})
        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token',data.token)
          setShowLogin(false)
        }
        else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token',data.token)
          setShowLogin(false)
        }
      }
    } catch (error) {
      toast.error(error.message)

    }
  }
  // Toggle between 'Login' and 'SignUp'
  const toggleState = () => {
    setState(state === 'Login' ? 'SignUp' : 'Login');
  };
  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    
    return ()=>{
          document.body.style.overflow = 'unset';

    }
  })

  return (
    <div>
      <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <motion.form
          onSubmit={onSubmitHandler}
          initial={{opacity:0.2, y:50 }} 
          transition={{duration:0.3}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className='relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-sm'>
          <h1 className='text-center text-2xl text-neutral-650 font-semibold mb-4'>{state}</h1>
          <p className='text-center mb-6'>{state === 'Login' ? 'Welcome Back!!!' : 'Welcome!!!'} Please {state === 'Login' ? 'sign in' : 'create an account'} to continue</p>

          {/* Full Name Field (only for SignUp) */}
          {state !== 'Login' && (
            <div className='border px-6 py-3 flex items-center gap-3 rounded-full mb-4'>
              <img src={assets.profile_icon} width={20} alt="Profile Icon" />
              <input
                onChange={(e)=>setName(e.target.value)}
                value={name} 
                type="text" 
                className='outline-none text-sm w-full' 
                placeholder="Full Name" 
                required 
              />
            </div>
          )}

          {/* Gmail Field */}
          <div className='border px-6 py-3 flex items-center gap-3 rounded-full mb-4'>
            <img src={assets.email_icon} width={20} alt="Gmail Icon" />
            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email} 
              type="email" 
              className='outline-none text-sm w-full' 
              placeholder="Gmail" 
              required 
            />
          </div>

          {/* Password Field */}
          <div className='border px-6 py-3 flex items-center gap-3 rounded-full mb-4'>
            <img src={assets.lock_icon} width={20} alt="Lock Icon" />
            <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password} 
              type="password" 
              className='outline-none text-sm w-full' 
              placeholder="Password" 
              required 
            />
          </div>

          {/* Confirm Password (only for SignUp) */}
          {state === 'SignUp' && (
            <div className='border px-6 py-3 flex items-center gap-3 rounded-full mb-4'>
              <img src={assets.lock_icon} width={20} alt="Lock Icon" />
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                placeholder="Confirm Password" 
                required 
              />

            </div>
          )}

          {/* Forgot Password Link */}
          {state === 'Login' && (
            <div className='text-left mb-4'>
              <p className='text-sm text-gray-600'>
                <a href="/forgot-password" className='text-blue-500 hover:underline'>Forgot Password?</a>
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button className='bg-blue-600 w-full text-white py-3 rounded-full text-sm font-semibold'>
            {state === 'Login' ? 'Login' : 'Create Account'}
          </button>

          {/* Don't have an account / Already have an account Links */}
          {state === 'Login' ? (
            <p className='text-sm text-gray-600'>
              Don't have an account? 
              <span 
                onClick={toggleState} 
                className='text-blue-500 hover:underline cursor-pointer'>
                Create Account
              </span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Already have an account? 
              <span 
                onClick={toggleState} 
                className='text-blue-500 hover:underline cursor-pointer'>
                Login
              </span>
            </p>
          )}

          {/* Cross Icon to Close the Form (optional) */}
          <img 
            src={assets.cross_icon} 
            alt="Close" 
            className='absolute top-5 right-5 cursor-pointer' 
            onClick={() => setShowLogin(false)} // Set to login mode when clicked
          />
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
