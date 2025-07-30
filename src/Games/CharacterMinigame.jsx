import { motion } from "framer-motion";

const CharacterMinigame = ({ character, selectedItems, removeItem, feedback }) => {
  const characterVariants = {
    happy: {
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.6 }
    },
    sad: {
      y: [0, -10, 0],
      transition: { duration: 0.5 }
    },
    neutral: {
      scale: 1,
      rotate: 0,
      y: 0
    }
  };

  const getReaction = () => {
    if (!feedback) return 'neutral';
    return feedback.score >= 70 ? 'happy' : 'sad';
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-100 to-pink-200 rounded-xl shadow-xl max-w-3xl mx-auto mt-10">
      
      <motion.div
        className={`relative w-48 h-48 rounded-full border-4 border-pink-300 shadow-lg overflow-hidden bg-cover bg-center ${CharacterMinigame}`}
        variants={characterVariants}
        animate={getReaction()}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 150 }}
      >
        <div className="w-full h-full" />

       {selectedItems.map(item => (
          <div
            key={`${item.type}-${item.id}`}
            className={`absolute w-10 h-10 ${item.type}${item.id}`}
            onClick={() => removeItem(item.type)}
          />
        ))}
      </motion.div>

      <div className="mt-6 w-full">
        {selectedItems.length === 0 ? (
          <p className="text-center text-sm text-gray-600 italic">
            Drag items or click to dress up!
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {selectedItems.map(item => (
              <motion.div
                key={`selected-${item.type}-${item.id}`}
                className="bg-pink-100 text-pink-800 px-4 py-1 rounded-full shadow hover:bg-pink-200 transition relative cursor-pointer text-sm font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => removeItem(item.type)}
              >
                {item.name}
                <span className="ml-2 text-xs text-pink-600 hover:text-red-500 font-bold">×</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterMinigame;
