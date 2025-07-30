import { motion } from "framer-motion";

const FeedbackMinigame = ({ feedback, handleContinue, isFinalLevel }) => {
  // Get feedback messages based on score
  const getFeedbackMessages = () => {
    if (feedback.score >= 90) {
      return {
        title: 'Fabulous!',
        message: "You're a Fashion Icon! 👑 This outfit is absolutely perfect",
        emoji: "👏👑"
      };
    } else if (feedback.score >= 75) {
      return {
        title: 'Great Job!',
        message: "This is a solid look, just a few tweaks could make it perfect!",
        emoji: "👍💕"
      };
    } else if (feedback.score >= 50) {
      return {
        title: 'Not Bad!',
        message: "There’s potential here, but it needs some adjustments to really shine!",
        emoji: "😊🪄"
      };
    } else {
      return {
        title: "Oops!!",
        message: "This outfit doesn't quite match the occasion. Let's try again.",
        emoji: "🙈🧶"
      };
    }
  };

  const { title, message, emoji } = getFeedbackMessages();

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md w-full mx-4 border border-pink-200 animate-in fade-in-zoom"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 text-center mb-4">
          {title} <span>{emoji}</span>
        </h2>

        <div className="bg-pink-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Score Breakdown</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Style Points:</span>
              <span>{feedback.stylePoints || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Challenge Match:</span>
              <span>{feedback.challengeMatch || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Bonus Points:</span>
              <span>{feedback.bonusPoints || 0}</span>
            </div>
            <div className="flex justify-between font-semibold text-pink-700">
              <span>Total Score:</span>
              <span>{feedback.score || 0}/100</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Fashion Notes:</h3>
          <p className="text-sm text-gray-600 mb-2">{message}</p>
          {feedback.comments && (
            <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
              {feedback.comments.map((comment, i) => (
                <li key={i}>{comment}</li>
              ))}
            </ul>
          )}
        </div>

        <motion.button
          className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-lg font-semibold shadow transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
        >
          {isFinalLevel ? "🎉 See Final Results" : "➡️ Next Challenge"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackMinigame;
