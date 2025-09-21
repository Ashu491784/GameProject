import React, { useState } from 'react';

const Footer = () => {
  const [logoError, setLogoError] = useState(false);
  const [textLogoError, setTextLogoError] = useState(false);

  return (
    <footer className='flex flex-col md:flex-row items-center justify-between py-8 lg:px-8 md:px-16 px-8 border-t-[0.3px] border-[#babaff] bg-gradient-to-b from-gray-900 to-black text-white'>
      <div className="mb-6 md:mb-0 flex justify-center md:justify-start">
        {textLogoError ? (
          <div className="h-10 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-center flex items-center justify-center text-sm font-bold">
            Illu Text
          </div>
        ) : (
          <img 
            className='h-10 w-auto' 
            src="/images/illu-text.png" 
            alt='Illu Text Logo' 
            onError={() => setTextLogoError(true)}
          />
        )}
      </div>

      <div className="flex flex-col items-center mb-6 md:mb-0">
        {logoError ? (
          <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-2 flex items-center justify-center text-white font-bold text-xs">
            ILLU
          </div>
        ) : (
          <img 
            className='h-16 w-auto md:block hidden' 
            src="/images/illu-logo.png" 
            alt='Illu Logo'
            onError={() => setLogoError(true)}
          />
        )}
        <p className='mt-2 px-4   rounded-xl text-pink-50 text-sm md:text-base font-semibold shadow-lg text-center py-2'>
          Created by Ayesha Madhushani © {new Date().getFullYear()}
        </p>
      </div>
      <div className='flex gap-5'>
        <a 
          className='text-2xl md:text-3xl hover:text-pink-300 transition-all duration-300 transform hover:scale-110' 
          href='https://twitter.com' 
          target='_blank' 
          rel='noopener noreferrer'
          aria-label='Follow us on Twitter'
        >
          <i className='bx bxl-twitter'></i>
        </a>
        <a 
          className='text-2xl md:text-3xl hover:text-green-300 transition-all duration-300 transform hover:scale-110' 
          href='https://wa.me' 
          target='_blank' 
          rel='noopener noreferrer'
          aria-label='Message us on WhatsApp'
        >
          <i className='bx bxl-whatsapp'></i>
        </a>
        <a 
          className='text-2xl md:text-3xl hover:text-blue-300 transition-all duration-300 transform hover:scale-110' 
          href='https://facebook.com' 
          target='_blank' 
          rel='noopener noreferrer'
          aria-label='Like us on Facebook'
        >
          <i className='bx bxl-facebook'></i>
        </a>
        <a 
          className='text-2xl md:text-3xl hover:text-blue-400 transition-all duration-300 transform hover:scale-110' 
          href='https://linkedin.com' 
          target='_blank' 
          rel='noopener noreferrer'
          aria-label='Connect with us on LinkedIn'
        >
          <i className='bx bxl-linkedin-square'></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;