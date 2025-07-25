import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { delay, motion, scale } from "motion/react"
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  
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
      className='flex flex-col justify-center items-center text-center my-20'
      initial={{opacity:0.2,y:100}}
      transition={{duration:1}}
      whileInView={{opacity : 1,y:0 }}
      viewport={{once:true}}
    >
      <div className="text-stone-500 text-4xl font-semibold inline-flex text-center items-center gap-3 bg-white px-8 py-2 rounded-full border border-neutral-500 shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{opacity:0,y:-20}}
      transition={{delay:0.2,duration:0.8}}
      animate={{opacity:1,y:0}}>
        <p>Best Text-to-Image Generator</p>
        <img src={assets.star_icon} alt="Star icon" className="w-6 h-6"/>
      </div>

      <motion.h1 className="text-4xl sm:text-7xl font-bold
       text-gray-900 sm:max-w-[590px] max-w-[300px] mx-auto mt-10 
       text-center transition-transform transform hover:scale-105">
        Turn text to<span className='text-orange-500'
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.4,duration:2}}> Image</span>, in Seconds
      </motion.h1>
      <motion.p
      initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.6,duration:0.8}} 
      className='text-center max-w-xl mx-auto mt-5 text-gray-500 font-semibold text-lg'>Unleash your creativity with our AI-powered image generator.
        Turn your imagination into visuals in seconds.
      </motion.p>
      <motion.button 
      onClick={onClickHandler}
      className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
      // whileHover={{scale:1.05}}
      // whileTap={{scale:0.95}}
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{default:{duration:0.1},opacity:{delay:0.8,duration:1}}}> Generate Images <img src={assets.star_icon} alt="Star icon" className="w-6 h-6" /></motion.button>
      <div className='flex justify-center items-center mt-10 gap-5 flex-wrap'>
        {Array(6).fill('').map((item,index)=>(
          <motion.img
          whileHover={{scale:1.05,duration:0.1}}
          className='rounded hover:scale-3d transition-all duration-300
          cursor-pointer max-sm:w-10' src={index%2==0 ?assets.sample_img_1:assets.sample_img_2} alt='' key={index} width={70}/>
        ))}
      </div>
      <motion.p 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1.2,duration:0.8}}
      className='mt-2 text-neutral-400'>Generate Image From Imagify</motion.p>
    </motion.div>
  )
}

export default Header
