import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import {motion} from 'framer-motion';
const Testimonials = () => {
  return (
    <motion.div 
    initial={{opacity:0.2, y:100}} 
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='flex flex-col items-center justify-center my-20 px-4 md:px-12'>
        <h1 className='text-4xl font-bold text-center mt-10 mb-5 text-gray-800'>
            Customer Testimonials
        </h1>
        <p className='text-gray-500 text-center max-w-xl mb-12'>
            What Our Users Are Saying
        </p>
        <div className='flex flex-wrap gap-8 justify-center'>
            {testimonialsData.map((testimonial, index) => (
                <div key={index} 
                className='bg-white rounded-lg shadow-lg p-6 w-72 flex flex-col items-center'>
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className='rounded-full w-20 h-20 mb-4 border-4 border-indigo-500'
                    />
                    <h2 className='text-xl font-semibold text-gray-800 mb-1'>{testimonial.name}</h2>
                    <p className='text-gray-500 mb-2'>{testimonial.role}</p>
                    <div className='flex mb-4'>
                        {Array(testimonial.stars).fill().map((_, starIndex) => (
                            <img key={starIndex} src={assets.rating_star} alt="star" className="w-5 h-5" />
                        ))}
                    </div>
                    <p className='text-gray-600 text-center'>{testimonial.text}</p>
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default Testimonials
