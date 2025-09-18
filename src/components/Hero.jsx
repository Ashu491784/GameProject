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

  // Animation variants for left entrance
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

      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

      {/* Spline on the right side */}
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

      {/* Left-side animated elements */}
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
              <motion.h1
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="md:text-5xl text-3xl font-extrabold text-white tracking-wide drop-shadow-lg"
              >
                Explore,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Capture
                </span>
                , Conquer
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full shadow-md"
              />

              <motion.button
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                onClick={handleClick}
                className="h-12 px-14 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-2xl font-semibold text-white tracking-wider shadow-xl"
              >
                PLAY NOW
              </motion.button>

              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4 text-4xl font-extrabold text-gray-100 drop-shadow-lg"
              >
                <motion.img
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="md:h-16 h-12"
                  src="/images/illu-logo.png"
                  alt="Illu-logo"
                />
                ZERO
              </motion.div>

              <motion.p
                variants={disclaimerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-[90%] md:max-w-[80%] text-sm md:text-base text-gray-300 leading-relaxed bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50"
              >
                ⚠️ Notice: Illuvium Game is currently in Beta. Participation involves
                risk. Please read our full Disclaimer before proceeding.
              </motion.p>
            </>
          )}
        </AnimatePresence>
      </div>
      </div>   
    </main>
  );
};

export default Hero;