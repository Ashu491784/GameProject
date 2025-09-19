import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate("/Login");
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.8
      }
    }
  };

  const disclaimerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 1.2
      }
    }
  };

  return (
    <main 
      className="relative w-full h-screen overflow-hidden flex"
      style={{
        backgroundImage: "url(/images/herebgnew.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity }
              }}
              className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

      <AnimatePresence mode="wait">
        <motion.div
          key={"SplineHero"}
          className="absolute right-0 top-0 w-1/2 h-full z-10"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Spline scene="https://prod.spline.design/mFblNbBciCdz2tYq/scene.splinecode" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute left-0 top-0 h-full w-1/2 z-5">
        <AnimatePresence>
          {showContent && (
            <>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 20 + 5}px`,
                    height: `${Math.random() * 20 + 5}px`,
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    x: [0, Math.random() * 20 - 10, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
        <div className="relative z-20 flex flex-col items-start gap-6 text-left px-10 ml-5 md:ml-20 justify-center h-full">
        <AnimatePresence>
  {showContent && (
    <>

      <img 
        src="public/images/illu-text.png" 
        alt="Illu-text" 
        className="md:w-[38rem] w-[26rem] drop-shadow-xl"
      />


      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="md:text-4xl text-3xl font-extrabold text-white tracking-widest text-center drop-shadow-2xl"
      >
        Explore,&nbsp;
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-pulse">
          Capture
        </span>
        ,&nbsp;Conquer
      </motion.h1>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "80%" }}
        transition={{ duration: 1, delay: 0.3 }}
        className="h-[3px] bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full shadow-lg"
      />

      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-5 text-5xl font-extrabold text-gray-100 drop-shadow-xl"
      >
        <motion.img
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="md:h-20 h-14 drop-shadow-lg"
          src="/images/illu-logo.png"
          alt="Illu-logo"
        />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
          ZERO
        </span>
      </motion.div>

      <motion.p
        variants={disclaimerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[90%] md:max-w-[70%] text-sm md:text-lg text-gray-200 leading-relaxed 
                  bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-gray-700/40 shadow-lg text-center"
      >
        🌌 Discover epic worlds, challenge your limits, and dive into nonstop gaming adventures.  
        <span className="text-purple-400 font-semibold"> The ultimate battleground awaits you!</span>
      </motion.p>
      
      <motion.button
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={handleClick}
        className="h-12 px-12 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-2xl 
                   font-bold text-white tracking-wider shadow-xl hover:scale-105 hover:shadow-purple-500/40 transition-all duration-300"
      >
        PLAY NOW
      </motion.button>
    </>
  )}
</AnimatePresence>

      </div>
      </div>   
    </main>
  );
};

export default Hero;