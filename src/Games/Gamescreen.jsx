import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import Pantry from "./Wardrob";
import CharacterMinigame from "./CharacterMinigame";
import FeedbackMinigame from "./feedbackminigame";
import { ChallengesMinigame } from "../Minigamejs/challengeminigame";
import { calculateScore } from "../Minigamejs/Scoreminigame";

const GameScreen = ({ endGame, level, setLevel, character, sounds, muted }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [gamePaused, setGamePaused] = useState(false);
  const [timer, setTimer] = useState(60);

  const currentChallenge = ChallengesMinigame?.[level - 1];

  useEffect(() => {
    if (gamePaused || showFeedback) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gamePaused, showFeedback]);

  const handleSubmit = () => {
    setGamePaused(true);
    const result = calculateScore(
      selectedItems,
      currentChallenge?.requirements || [],
      level
    );
    setFeedback(result);
    setShowFeedback(true);

    if (!muted) {
      if (result.score >= 70) sounds.correct.play();
      else sounds.wrong.play();
    }
  };

  const handleContinue = () => {
    if (level < ChallengesMinigame.length) {
      setLevel(level + 1);
      setSelectedItems([]);
      setTimer(60);
      setShowFeedback(false);
      setGamePaused(false);
    } else {
      endGame(feedback.totalScore);
    }
  };

  const addItem = (item) => {
    const existingIndex = selectedItems.findIndex((i) => i.type === item.type);
    if (existingIndex >= 0) {
      setSelectedItems((prev) => [
        ...prev.slice(0, existingIndex),
        item,
        ...prev.slice(existingIndex + 1),
      ]);
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const removeItem = (itemType) => {
    setSelectedItems((prev) => prev.filter((item) => item.type !== itemType));
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          className="flex items-center gap-2 text-lg text-purple-700 hover:text-purple-900 transition"
          onClick={() => endGame(0)}
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="text-right">
          <p className="text-xl font-semibold text-pink-600">⏱️ {timer}</p>
          <p className="text-sm text-gray-600">
            Level {level} of {ChallengesMinigame.length}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {currentChallenge && (
          <motion.div
            className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm mx-auto mb-6 border border-pink-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <h3 className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-1">
              Challenge
            </h3>
            <h2 className="text-lg font-bold text-pink-700 mb-2 leading-tight">
              {currentChallenge.title}
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              {currentChallenge.description}
            </p>
            <div>
              <h4 className="text-xs font-semibold text-pink-400 mb-1">
                Requirements:
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {(currentChallenge.requiredItems || []).map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        <div className="lg:col-span-2 flex flex-col gap-6">
          <CharacterMinigame
            character={character} 
            selectedItems={selectedItems}
            removeItem={removeItem}
            feedback={feedback}
          />

          <Pantry
            currentChallenge={currentChallenge}
            selectedItems={selectedItems}
            addItem={addItem}
            muted={muted}
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <motion.button
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={selectedItems.length === 0 || gamePaused}
        >
          Submit
        </motion.button>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <FeedbackMinigame
            feedback={feedback}
            handleContinue={handleContinue}
            isFinalLevel={level === ChallengesMinigame.length}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameScreen;
