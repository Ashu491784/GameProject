import { motion } from "framer-motion";
import { Howl } from "howler";
import { FaRedo, FaShareAlt, FaHome, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Endgamescreen = ({ score, restartGame, character, muted, setMuted, returnToHome }) => {
  const getRating = () => {
    if (score >= 90) return { text: "Fashion Icon! 👑", color: "text-yellow-500" };
    if (score >= 75) return { text: "Trendsetter! 💫", color: "text-purple-500" };
    if (score >= 50) return { text: "Looking Apprentice! 🔥", color: "text-pink-500" };
    return { text: "NICE FOOD... 🪄", color: "text-green-500" };
  };

  const getCharacterFeedback = () => {
    if (score >= 75) {
      return "I'm absolutely loving this look! You've got an amazing sense of food 🥰";
    } else if (score >= 50) {
      return "This is a good start! Let's try some different combinations next time 😍";
    } else {
      return "Hmm... maybe let's explore some different fashion choices together! 😄";
    }
  };

  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Fashion Game Score',
        text:` I scored ${score} points in the Faod  Game! 🍔 Can you beat me?`,
        url: window.location.href,
      })
      .catch(() => {
        navigator.clipboard.writeText(`I scored ${score} points in the food Game! 🍔`);
        alert("Score copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(`I scored ${score} points in the food Game! 🍔`);
      alert("Score copied to clipboard!");
    }
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

  const rating = getRating();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-300 to-purple-400 p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white bg-opacity-90 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-lg text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >

        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-4 tracking-tight"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Game Complete 🎉
        </motion.h1>

        <motion.div
          className="mb-6 bg-purple-50 p-4 rounded-2xl shadow-inner border border-purple-100"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-5xl font-bold text-purple-800">{score}</div>
          <div className="text-sm text-gray-600 mt-1 uppercase tracking-wider">
            Food Points
          </div>
          <div className={`mt-2 text-lg font-semibold ${rating.color}`}>
            {rating.text}
          </div>
        </motion.div>

        <motion.div 
          className="mb-6 p-4 bg-white rounded-xl border border-purple-200 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-center mb-2">
            <div className="ml-3 text-left">
              <div className="font-medium text-purple-700">Food Assistant 🍟</div>
              <div className="text-xs text-gray-500">Says:</div>
            </div>
          </div>
          <p className="text-gray-700 text-sm md:text-base italic">
            "{getCharacterFeedback()}"
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playClickSound();
              restartGame();
            }}
          >
            <FaRedo /> Play Again
          </motion.button>
          
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full shadow-lg border border-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playClickSound();
              shareScore();
            }}
          >
            <FaShareAlt /> Share Score
          </motion.button>
        </motion.div>

        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={() => {
              playClickSound();
              returnToHome();
            }}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
          >
            <FaHome /> <Link to="/Minigames">Main Menu</Link> 
          </button>
          
          <button
            onClick={() => {
              playClickSound();
              setMuted(!muted);
            }}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />} 
            {muted ? "Unmute" : "Mute"}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Endgamescreen;