import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const GenerateBtn = () => {
  const {user,setShowLogin} = useContext(AppContext)
  
  const navigate = useNavigate()
  const onClickHandler = () =>{
    if(user){
      navigate('/result')
    }
    else{
       setShowLogin(true);
    }
  }

  return (
    <motion.div
    initial={{opacity:0.2, y:100}} 
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='flex flex-col items-center justify-center my-16'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-10 mb-5 text-gray-800'>
        See the magic... Try Now!!!
      </h1>
      <button 
      onClick={onClickHandler}
      className='inline-flex items-center gap-4 px-12 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500'>
        Generate Images
        <img src={assets.star_group} alt="stars" className='w-6 h-6'/>
      </button>
    </motion.div>
  )
}

export default GenerateBtn
