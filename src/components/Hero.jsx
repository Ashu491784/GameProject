import React, { useEffect, useRef } from 'react';
import {Star} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import Spline from '@splinetool/react-spline';


const Hero = () => {
  return (
    <main className='relative w-full h-screen overflow-hidden flex
    justify-center mb-[10%]'>
        <video src='public\videos\ui.mp4' 
        autoPlay 
         muted 
          loop
         playsInline
        className='w-full h-full object-cover absolute 
        top-0 first-letter:left-0 -z-10'>
        </video>
    <div className='absolute bottom-[5%] flex flex-col 
    items-center gap-5'>
        <img src="public\images\illu-text.png" alt='Illu-text' className='md:w-[30rem] w-[20rem]'></img>
    <h1 className='md:text-2xl text-1xl font-bold'>Explore, Capture, Conquer
 </h1>

 <div className='md:w-[75%] w-[60%] h-[0.1px] bg-[#baba]'></div>
 
 <button className="h-10 px-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg font-medium 
            text-nowrap hover:opacity-70 transition-all duration-300">
                PLAY NOW
     </button>
     <div className='flex items-center gap-5 text-3xl font-extrabold text-gray-200'>
                <img className='md:h-16 h-12' src="public/images/illu-logo.png" alt="Illu-logo"/> ZERO
               </div>
 <p className='max-w-[80%] text-center text-[#babaff]'>
    Notice: Illuvium Game are in Beta.
    Participate involves risk. Read our full Disclaimer here.
    </p>              
    </div>

    <div className='absolute bottom-40 lg:right-24 
    right-5 mt-24 animate-bounce sm:inline-block hidden'>
        <div className='flex flex-col items-center'>
            <div className='w-8 h-12 border-2 border-[#babaff] rounded-full flex 
            justify-center pt-1'>
                <div className='w-1 h-3 bg-[#babaff]
                 rounded-full animate-pulse'></div>
            </div>
            <p className='text-[#babaff]'>Scrool Down</p>
        </div>
    </div>
    </main>
  )
}

export default Hero