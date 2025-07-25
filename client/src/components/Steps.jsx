import React from 'react'
import { stepsData } from '../assets/assets'
import {motion} from 'framer-motion'
const Steps = () => {
  return (
    <motion.div
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='flex flex-col items-center justify-center my-32 px-4'>
      <h1 className='text-4xl font-bold text-center mt-10 mb-5 text-gray-800'>
        How it Works
      </h1>
      <p className='text-lg text-center text-neutral-500 mb-12'>
        Transform Words into Amazing Images
      </p>
      <div className='space-y-6 w-full max-w-4xl'>
        {stepsData.map((item, index) => (
          <div
            key={index}
            className='flex items-start justify-start w-full gap-6 px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer'
          >
            <img
              width={50}
              src={item.icon}
              alt={item.title}
              className='rounded-full border-2 border-white'
            />
            <div>
              <h2 className='text-2xl font-semibold text-white'>{item.title}</h2>
              <p className='text-lg text-neutral-200 mt-2'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps
