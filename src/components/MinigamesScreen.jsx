import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
const MinigameScrean = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center px-4 ">
  
       <video src='public\videos\bg2.mp4' 
        autoPlay 
         muted 
          loop
         playsInline
        className='w-full h-full object-cover absolute 
        top-0 first-letter:left-0 -z-10'>
        </video>
      <div className="text-center space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold text-red-50 drop-shadow-md"
        >
          🎮 MINI GAME ZONE
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
        >
          <div className="bg-slate-700 bg-opacity-90 rounded-3xl shadow-xl p-6 w-80 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-pink-100 mb-4 font-arcade">
              🍱 Food Maker
            </h3>
            <div className="flex justify-center mb-4">
              <img
                src="/images/foodgame.jpg"
                alt="Food Game"
                className="rounded-xl w-44 h-44 object-cover shadow-md border-4 border-red-500"
              />
            </div>
            <button
              onClick={() => alert("Game starting...")} 
              className="bg-purple-300 hover:bg-blue-200 text-white hover:text-black font-bold py-2 px-6 rounded-full shadow-lg transition duration-200"
            >
           <Link to="/GameStart"> Play Now 🎮</Link>  
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MinigameScrean;
