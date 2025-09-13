import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Howl } from "howler";
import { FaVolumeMute, FaVolumeUp, FaHome, FaInfoCircle } from "react-icons/fa";

const MinigameScreen = () => {
  const [muted, setMuted] = useState(true);
  const [activeInfo, setActiveInfo] = useState(null);
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/sound/birds39-forest-20772.mp3"],
      volume: 0.5,
      loop: true,
    });
    
    if (!muted) {
      soundRef.current.play();
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (soundRef.current) {
      if (muted) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
    }
  }, [muted]);

  const toggleSound = () => {
    setMuted((prev) => !prev);
  };

  const showGameInfo = (gameId) => {
    setActiveInfo(activeInfo === gameId ? null : gameId);
  };

  const games = [
    {
      id: "food-maker",
      title: "🍱 Food Maker",
      image: "/images/foodgame.jpg",
      path: "/GameStart",
      description: "Create delicious virtual meals in this cooking simulator!"
    },
    {
      id: "quiz-mind",
      title: "QUIZZ MIND 👩🏻‍🎓",
      image: "/images/quizz.jpg",
      path: "/QuizDashboard",
      description: "Test your knowledge with fun and challenging trivia questions!"
    },
    {
      id: "tiktaktoe",
      title: "TIC-TAC-TOE ❌⭕",
      image: "/images/tiktaktoe.jpg",
      path: "/TikTac",
      description: "The classic game of Xs and Os. Challenge a friend or play against the computer!"
    },
    {
      id: "shooting-game",
      title: "SPACE SHOOTER 🚀",
      image: "/images/shoot.jpg",
      path: "/Shoot",
      description: "Blast your way through space in this exciting arcade shooter!"
    }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex items-center justify-center px-4 py-10">
      <video
        src="/videos/bg2.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      ></video>
      
      <div className="absolute inset-0 bg-black bg-opacity-40 -z-5"></div>

      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <Link to="/">
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaHome size={18} />
            <span className="hidden sm:inline">Home</span>
          </motion.button>
        </Link>
        
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-md text-center"
        >
          🎮 MINI GAME ZONE
        </motion.h2>
        
        <motion.button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none flex items-center gap-2"
          onClick={toggleSound}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          aria-label={muted ? "Unmute sound" : "Mute sound"}
        >
          {muted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          <span className="hidden sm:inline">{muted ? "Unmute" : "Mute"}</span>
        </motion.button>
      </div>
      
      <div className="mt-24 mb-10 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
            Welcome to the Ultimate Mini Game Collection!
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Choose from our selection of fun games below. Each offers a unique experience 
            that will test your skills and keep you entertained for hours!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 justify-center"
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="bg-slate-800 bg-opacity-80 rounded-2xl shadow-xl p-5 text-center overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white flex-1 text-center">
                  {game.title}
                </h3>
                <button
                  onClick={() => showGameInfo(game.id)}
                  className="text-blue-300 hover:text-blue-100 ml-2"
                  aria-label="Game information"
                >
                  <FaInfoCircle size={16} />
                </button>
              </div>
              
              {activeInfo === game.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3 text-sm text-blue-100 bg-blue-900 bg-opacity-30 p-2 rounded-lg"
                >
                  {game.description}
                </motion.div>
              )}
              
              <div className="flex justify-center mb-4">
                <div className="relative overflow-hidden rounded-lg w-40 h-40 border-4 border-blue-500 shadow-md">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
              
              <Link to={game.path}>
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg w-full transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Now 🎮
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center text-white text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>More exciting games coming soon! Stay tuned for updates.</p>
        </motion.div>
      </div>
      <motion.footer 
        className="fixed bottom-0 left-0 right-0 py-3 bg-black bg-opacity-50 text-center text-blue-100 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>© {new Date().getFullYear()} Mini Game Zone | All games are for entertainment purposes</p>
      </motion.footer>
    </div>
  );
};

export default MinigameScreen;