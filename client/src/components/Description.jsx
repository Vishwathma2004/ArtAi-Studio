import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'
const Description = () => {
  return (
    <motion.div
    initial={{opacity:0.2, y:100}} 
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='flex flex-col items-center justify-center my-20 px-4'>
      <h1 className='text-4xl font-bold text-center mt-10 mb-5 text-gray-800'>Create AI Images</h1>
      <p className='text-gray-500 text-center max-w-xl mb-12'>Turn Your imagination into visuals</p>
      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center justify-between w-full max-w-4xl'>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg'/>
        <div>
             <h2 className='text-3xl font-semibold text-gray-800mb-4 max-w-lg'>Introducing the AI-Powered Text to Image Generator</h2>
             <p className='text-gray-500 mb-4'>Easily bring Ur ideas to life with our free AI image generator.
                Whether you need stunning visuals or unique imaginary,Our tool transforms your text into eye-catching images with just a few clicks.
                Imagine it,describe it and watch it come to life instantly</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
