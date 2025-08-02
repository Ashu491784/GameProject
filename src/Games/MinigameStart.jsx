import { motion } from 'framer-motion';
import { Howl } from 'howler';
import { FaPlay } from 'react-icons/fa';

const StartScreen = ({ startGame, muted }) => {
  const character = [
    {
      id: 'bella',
      name: 'Bella',
      description: 'The trendy Blogger',
      image: '/images/girl1.png'
    },
    {
      id: 'shafya',
      name: 'Shaffey',
      description: 'The trendy Student',
      image: '/images/girl2.png'
    },
    {
      id: 'keylan',
      name: 'Keylan',
      description: 'The trendy Mini Student',
      image: '/images/girl3.png'
    }
  ];


  const playClickSound = () => {
    if (!muted) {
      const sound = new Howl({
        src: ['/sound/church.wav'],
        volume: 0.7
      });
      sound.play();
    }
  };
   const playbackground = () => {
    if (!muted) {
      const sound = new Howl({
        src: ['/sound/birds39-forest-20772.mp3'],
        volume: 0.7
      });
      sound.play();
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-300 flex items-center justify-center px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={playbackground}
    >
      <div className="bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-5xl w-full">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center text-purple-800 mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}>
          FOOD CHOOSY 👩🏻‍🍳
        </motion.h1>

        <motion.p
          className="text-center text-lg md:text-xl text-gray-700 mb-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}>
          Style your character for different occasions and get rated! ✨
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}>
          {character.map((char, index) => (
            <motion.div
              key={char.id}
              className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95"
              initial={{ y: 30 * (index + 1), opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playClickSound();
                startGame(char.id);
              }}>
              <motion.img
                src={char.image}
                alt={char.name}
                className="w-24 h-24 mx-auto mb-4 rounded-full object-cover border-4 border-pink-400 shadow-lg shadow-pink-300 hover:shadow-pink-500"
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}/>
              <h3 className="text-xl font-semibold text-purple-700">{char.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{char.description}</p>
              <motion.div
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
                whileHover={{ scale: 1.1 }}>
                <FaPlay />
                Play
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StartScreen;
