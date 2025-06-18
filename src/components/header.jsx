import 'boxicons/css/boxicons.min.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ThemeToggle from './Theme';
import React, {useState} from 'react';



const header = () => {

      const [theme, setTheme] = useState('dark');
    const toggleMobileMenu = () =>{
        const MobileMenus = document.getElementById("MobileMenus"); //get mobile menu element

        //hidden class, remove it, otherWise add it
        if(MobileMenus.classList.contains('hidden')){
            MobileMenus.classList.remove('hidden');
        }else{
            MobileMenus.classList.add('hidden')
        }
    }
  //    const toggleTheme = () => {
  //   const newTheme = theme === 'dark' ? 'light' : 'dark';
  //   setTheme(newTheme);
  //   document.documentElement.classList.toggle('dark', newTheme === 'dark');
  // };

    const navigate = useNavigate();
  const handleSignIn = () => {
        navigate("/login");
      };
  
  return (
    <header className="py-1 px-7 flex justify-between 
    items-center fixed  top-0 z-50 w-full border-b-[0.3px] border-[#babaff] bg-transparent">
        
        {/* left section */}
        <div className="flex lg:gap-14 gap-4 items-center">
            <img className="md:w-16 w-12" src="public\images\logoss.png" alt="log0-img"></img>
      
        <div className="hidden md:flex gap-5 items-center">
            <button className="h-8 px-6 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg font-medium 
            text-nowrap hover:opacity-70 transition-all duration-300">
                PLAY NOW
                </button>

    <button className="h-8 px-6 bg-gradient-to-r from-gray-600 to-gray-400 rounded-lg font-medium 
            text-nowrap hover:opacity-70 transition-all duration-300" onClick={handleSignIn}>Sign In
                
                </button>
        </div>
        </div>

        <nav className= "hidden md:flex lg:gap-8 gap-4">
            <a href="/Characters" className="relative py-1 text-lg hover:text-purple-300 
            transition-colors duration-300
             after:content-['']
              after:absolute after:w-0 
              after:h-0.5  after:bg-purple-400 after:left-0 after:bottom-0 
              after:transition-all hover:after:w-full text-nowrap">
            <i className="bx bx-user-circle" /> Gamer 
            </a>

            <a href="/Arena" className="relative py-1 text-lg hover:text-purple-300 
            transition-colors duration-300
             after:content-['']
              after:absolute after:w-0 
              after:h-0.5  after:bg-purple-400 after:left-0 after:bottom-0 
              after:transition-all hover:after:w-full text-nowrap">
            <i className="bx bx-diamond" /> Arena 
            </a>
            <a href="#" className="relative py-1 text-lg hover:text-purple-300 
            transition-colors duration-300
             after:content-['']
              after:absolute after:w-0 
              after:h-0.5  after:bg-purple-400 after:left-0 after:bottom-0 
              after:transition-all hover:after:w-full text-nowrap">
            <i className="bx bx-chevrons-up" /> Beyond
            </a>
            <a href="/Shop" className="relative py-1 text-lg hover:text-purple-300 
            transition-colors duration-300
             after:content-['']
              after:absolute after:w-0 
              after:h-0.5  after:bg-purple-400 after:left-0 after:bottom-0 
              after:transition-all hover:after:w-full text-nowrap">
            <i className="bx bx-store" /> Shop
            </a>
        </nav>

        {/* mobile munu buttons */}
        <button onClick={toggleMobileMenu} className='text-3xl p-2 md:hidden'>
            <i className='bx bx-menu'></i>
        </button>

        <div id='MobileMenus' className='hidden fixed top-14 right-0 left-0 bg-black p-5 md:hidden'>
            <nav className='flex flex-col gap-4 items-center'>
            <a href="#" className="relative py-1 text-lg hover:text-purple-300 
            transition-colors duration-300
             after:content-['']
              after:absolute after:w-0 
              after:h-0.5  after:bg-purple-400 after:left-0 after:bottom-0 
              after:transition-all hover:after:w-full text-nowrap">
            <i className="bx bx-user-circle" /> Gamer
            </a>

            <a href="#" className="relative py-1 text-lg hover:text-purple-300 
            transition-colors duration-300
             after:content-['']
              after:absolute after:w-0 
              after:h-0.5  after:bg-purple-400 after:left-0 after:bottom-0 
              after:transition-all hover:after:w-full text-nowrap">
            <i className="bx bx-diamond" /> Arena
            </a>
            <a href="#" className="relative py-1 text-lg hover:text-purple-300 
            transition-colors duration-300
             after:content-['']
              after:absolute after:w-0 
              after:h-0.5  after:bg-purple-400 after:left-0 after:bottom-0 
              after:transition-all hover:after:w-full text-nowrap">
            <i className="bx bx-chevrons-up" /> Beyond
            </a>
            <a href="#" className="relative py-1 text-lg hover:text-purple-300 
            transition-colors duration-300
             after:content-['']
              after:absolute after:w-0 
              after:h-0.5  after:bg-purple-400 after:left-0 after:bottom-0 
              after:transition-all hover:after:w-full text-nowrap">
            <i className="bx bx-store" /> Shop
            </a>
      
     
            </nav>
            <div className='flex flex-col gap-3 w-full mt-4'>
                <button className=' bg-purple-700 py-2 rounded'>
                    Play Now 
                    </button>

                    <button className='bg-gray-500 py-2  rounded'>
                        Net Store
                    </button>
            </div>
        </div>
         {/* <div className='ml-4'>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div> */}
    </header>
  )
}


export default header