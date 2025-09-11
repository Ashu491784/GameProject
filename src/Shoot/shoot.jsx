import React, { useEffect, useRef, useState } from "react";
import { initGame, startGame, togglePause, restartGame } from "./Game";
import { motion, AnimatePresence } from "framer-motion";

const Shoot = () => {
  const canvasRef = useRef(null);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [health, setHealth] = useState(100);
  const [power, setPower] = useState(0);
  const [powerups, setPowerups] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      initGame(canvasRef.current, {
        updateScore: setScore,
        updateLevel: setLevel,
        updateHealth: setHealth,
        updatePower: setPower,
        updatePowerups: setPowerups,
        onGameOver: () => setIsGameOver(true),
        onPause: (paused) => setIsPaused(paused),
      });
    }
  }, []);

  const handleStart = () => {
    setIsGameOver(false);
    startGame();
  };

  const handleRestart = () => {
    setIsGameOver(false);
    restartGame();
  };

  const buttons = [
    { label: "Start", onClick: handleStart, gradient: "from-green-400 to-blue-600" },
    { label: isPaused ? "Resume" : "Pause", onClick: togglePause, gradient: "from-yellow-400 to-green-500" },
    { label: "Restart", onClick: handleRestart, gradient: "from-red-400 to-red-800" },
  ];

  return (
    <div className="relative flex flex-col lg:flex-row items-start justify-center w-full h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">

      <motion.div
        className="w-full lg:w-1/4 p-6 space-y-6"
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >

        <motion.div
          className="p-5 bg-gradient-to-br from-gray-800/70 via-gray-900/70 to-purple-900/70 rounded-3xl shadow-xl backdrop-blur-md border border-purple-700"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-extrabold text-pink-400 mb-5 tracking-wide">COSMIC CLASH</h2>
          
          <div className="mb-3 flex justify-between text-sm md:text-base font-medium">
            <span>Score</span>
            <span>{score}</span>
          </div>
          <div className="mb-3 flex justify-between text-sm md:text-base font-medium">
            <span>Level</span>
            <span>{level}</span>
          </div>

          <div className="mb-3">
            <span>Health</span>
            <div className="w-full h-4 bg-red-900 rounded-full overflow-hidden mt-1">
              <motion.div
                className="h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-inner"
                style={{ width: `${health}%` }}
                animate={{ width: `${health}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="mb-3">
            <span>Power</span>
            <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden mt-1">
              <motion.div
                className="h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full shadow-inner"
                style={{ width: `${power}%` }}
                animate={{ width: `${power}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm md:text-base font-bold text-purple-300 mb-1">Active Powerups</h4>
            <ul className="list-disc list-inside text-sm md:text-base space-y-1">
              {powerups.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {p}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="p-5 bg-gradient-to-br from-gray-800/70 via-gray-900/70 to-purple-900/70 rounded-3xl shadow-xl backdrop-blur-md border border-purple-700 space-y-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {buttons.map((btn, i) => (
            <motion.button
              key={i}
              onClick={btn.onClick}
              className={`w-full py-2 font-semibold text-white rounded-xl bg-gradient-to-r ${btn.gradient} shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-200`}
              whileTap={{ scale: 0.95 }}
            >
              {btn.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <div className="flex-1 relative h-full w-full flex items-center justify-center p-4">
        <canvas
          ref={canvasRef}
          id="gameCanvas"
          width={1000}
          height={650}
          className="border-4 border-purple-700 rounded-2xl bg-black shadow-lg"
        />

        <AnimatePresence>
          {isGameOver && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-purple-800 p-8 rounded-3xl shadow-2xl text-center border border-purple-500"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h2 className="text-4xl font-bold mb-4 text-red-500 tracking-wide">
                  GAME OVER
                </h2>
                <p className="mb-4 text-lg text-purple-300">Final Score: {score}</p>
                <motion.button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-red-500  text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:bg-red-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Again
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Shoot;
