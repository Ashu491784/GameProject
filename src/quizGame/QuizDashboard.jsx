import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; 

const QuizDashboard = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/Quiz');
  };
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particleOptions = {
    fullScreen: { enable: false },
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.6,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      move: {
        direction: "bottom",
        enable: true,
        outMode: "out",
        speed: 2
      }
    },
    detectRetina: true
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-gray-900 to-black p-20"
      style={{
        backgroundImage: "url('/images/home-background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Particles Effect */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Particles id="tsparticles" init={particlesInit} options={particleOptions} />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center text-center text-white h-full">
        <div className="space-y-6 max-w-xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold drop-shadow-md"
          >
            QuizSuper
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl font-light">
            Test your knowledge and challenge your mind!! 👩🏻‍🎓
          </motion.p>
          <motion.button
            onClick={handleStart}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 bg-gradient-to-r from-blue-200 to-green-200 hover:bg-indigo-300
              text-blue-950 hover:text-gray-950 text-lg font-semibold px-10 py-3 rounded-full 
              shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-green-300/60">
            🚀 Start Quiz
          </motion.button>
        </div>
      </div>
    </div>
  );
};
export default QuizDashboard;
