import { motion } from "framer-motion";
import { Howl } from "howler";
import { FaRedo } from "react-icons/fa";

const Endgamescreen = ({ score, restartGame, character, muted }) => {
  const getRating = () => {
    if (score >= 90) return "Fashion Icon! 👑";
    if (score >= 75) return "Trendsetter! 💫";
    if (score >= 50) return "Style Apprentice! 🔥";
    return "NICE FOOD... 🪄";
  };

  const playClickSound = () => {
    if (!muted) {
      const sound = new Howl({
        src: ["/sound/click.wav"],
        volume: 0.6,
      });
      sound.play();
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-purple-300 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white bg-opacity-80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full max-w-lg text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <motion.div
          className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-pink-300 shadow-md overflow-hidden cursor-pointer"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 12,
            delay: 0.3,
          }}
        >
          <motion.div
            className={`w-full h-full bg-cover bg-center ${character}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.6,
            }}
          />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-4 tracking-tight"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Game Complete 🎉
        </motion.h1>

        <motion.div
          className="mb-6 bg-purple-100 p-4 rounded-xl shadow-inner"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-5xl font-bold text-purple-800">{score}</div>
          <div className="text-sm text-gray-600 mt-1 uppercase">
            Food Points
          </div>
          <div className="mt-2 text-lg font-semibold text-pink-500">
            {getRating()}
          </div>
        </motion.div>

        <motion.p
          className="text-gray-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {score >= 70
            ? "Wow! You've got brilliant style skills! ✨"
            : "Not bad... With a little more practice you'll be a fashion star 💅"}
        </motion.p>

        <motion.button
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playClickSound();
            restartGame();
          }}
        >
          <FaRedo /> Play Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Endgamescreen;
