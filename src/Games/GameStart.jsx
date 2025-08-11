import React, { useState } from "react";
import StartScreen from "./MinigameStart";
import Endgamescreen from "./endscreenMinigame";
import GameScreen from "./Gamescreen";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


const sounds = {
  background: new Howl({
    src: ["/sound/nis.wav"],
    volume: 0.9,
    loop: true,
    onloaderror: () => console.log("error in load sound"),
    onplayerror: () => console.log("error in play sound"),
  }),
  correct: new Howl({
    src: ["/sound/correct.wav"],
    volume: 0.6,
  }),
  wrong: new Howl({
    src: ["/sound/wrong.wav"],
    volume: 0.6,
  }),
  win: new Howl({
    src: ["/sound/win.wav"],
    volume: 0.6,
  }),
};

function GameStart() {
  const [gameState, setGameState] = useState("start"); //stat, game, end
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [muted, setMuted] = useState(false);
  const [character, setCharacter] = useState("bella");

  //Toggle sound
  const toggleMusic = () => {
    setMuted(!muted);
    Howler.mute(!muted);
  };

  //start game
  const startGame = (selectedChar) => {
    setCharacter(selectedChar);
    setGameState("game");
    if (muted) sounds.background.play();
  };

  //end game
  const endGame = (finalScore) => {
    setScore(finalScore);
    setGameState("end");
    sounds.background.stop();
    if (!muted) sounds.win.play();
  };

  //restart game
  const restartGame = () => {
    setScore(0);
    setLevel("1");
    setGameState("start");
  };
     const playbackground = () => {
      if (!muted) {
        const sound = new Howl({
          src: ['/sound/newbg.mp3'],
          volume: 0.7
        });
        sound.play();
      }
    };

  return (
    <div className="app">
      <motion.button
        className="fixed top-4 right-4 z-50 bg-white text-pink-600 p-3 rounded-full shadow-lg hover:bg-pink-50 focus:outline-none"
        onClick={playbackground}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-label={muted ? "Unmute sound" : "Mute sound"}
      >
        {muted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </motion.button>
      <AnimatePresence mode="wait">
        {gameState === "start" && (
          <StartScreen key="start" startGame={startGame} muted={muted} />
        )}

        {gameState === "game" && (
          <GameScreen
            key="game"
            endGame={endGame}
            level={level}
            setLevel={setLevel}
            character={character}
            sounds={sounds}
            muted={muted}
          />
        )}

        {gameState === "end" && (
          <Endgamescreen
            key="end"
            score={score}
            restartGame={restartGame}
            character={character}
            muted={muted}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameStart;
