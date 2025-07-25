import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
  const { user, setShowLogin, logout,credit} = useContext(AppContext); 
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between py-4 px-4'>
      {/* Logo */}
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='w-28 sm:w-32 lg:w-40' />
      </Link>

      {/* Right Section */}
      <div>
        {user ? (
          <div className='flex items-center gap-6 sm-gap-3'>
            {/* Credit Info */}
            <button className='flex items-center gap-2 bg-white px-3 py-1 rounded shadow' onClick={()=>navigate('/buy')}>
              <img className='w-5' src={assets.credit_star} alt='Credits' />
              <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit Left: {credit}</p>
            </button>

            {/* User Info */}
            <p className='text-gray-600 max-sm:hidden pl-4'>Hi , {user.name}</p>
            <div className='relative group'>
              <img src={assets.profile_icon} className='w-10 rounded-full cursor-pointer' alt='User' />
              <div className='absolute top-12 right-0 hidden group-hover:block bg-white shadow-lg p-2 rounded text-sm z-10'>
                <p className='mb-2 text-gray-600 max-sm:hidden'>Hi, Welcome {user.name}!</p>
                <button
                  onClick={logout}
                  className='list-none m-0 p-2 bg-white rounded-md border text-sm text-red-500 hover:underline'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex gap-4 items-center'>
            <p onClick={() => navigate('/buy')} className='text-sm sm:text-base cursor-pointer'>
              Pricing
            </p>
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-black text-white px-6 py-2 rounded-xl hover:opacity-90 transition">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
