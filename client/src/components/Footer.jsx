import React from 'react' 
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-6 py-16 mt-16 bg-amber-50 text-gray-800'>
      {/* Logo */}
      <img src={assets.logo} alt='logo' width={150} className="mb-6"/>

      {/* Copyright Text */}
      <p className='text-sm text-center text-gray-500 max-w-xs sm:max-w-lg'>
        Copyright© WhoAmI 2025. All rights reserved.
      </p>

      {/* Social Media Icons */}
      <div className='flex gap-8 sm:gap-10 justify-center'>
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className='transition-transform transform hover:scale-110 hover:text-blue-600'>
          <img src={assets.facebook_icon} alt='Facebook' width={30} />
        </a>

        <a 
          href="mailto:someone@domain.com" 
          className='transition-transform transform hover:scale-110 hover:text-red-500'>
          <img src={assets.email_icon} alt='Email' width={30} />
        </a>

        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className='transition-transform transform hover:scale-110 hover:text-pink-500'>
          <img src={assets.instagram_icon} alt='Instagram' width={30} />
        </a>
      </div>
    </div>
  )
}

export default Footer
