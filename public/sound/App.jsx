import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import StartScreen from "./components/StartScreen";
import EndScreen from "./components/EndScreen";
import GameScreen from "./components/GameScreen"
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import './App.css';


// sound effects 
const sounds = {
    background: new Howl({
        src: ['/sounds/background.mp3'],
        volume: 0.9,
        loop: true,
        onloaderror: () => console.log('error in load sound'),
        onplayerror: () => console.log('error in play sound')
    }),
    correct: new Howl({
        src: ['/sounds/correct.wav'],
        volume: 0.6
    }),
    wrong: new Howl({
        src: ['/sounds/wrong.wav'],
        volume: 0.6
    }),
    win: new Howl({
        src: ['/sounds/win.wav'],
        volume: 0.6
    })
}

function App() {
    const [gameState, setGameState] = useState('start') //stat, game, end
    const [score, setScore] = useState(0)
    const [level, setLevel] = useState(1)
    const [muted, setMuted] = useState(false)
    const [character, setCharacter] = useState('bella')

    //Toggle sound
    const toggleMusic = () => {
        setMuted(!muted)
        Howler.mute(!muted)
    }

    //start game
    const startGame = (selectedChar) => {
        setCharacter(selectedChar)
        setGameState('game')
        if (muted) sounds.background.play()
    }

    //end game
    const endGame = (finalScore) => {
        setScore(finalScore)
        setGameState('end')
        sounds.background.stop()
        if (!muted) sounds.win.play()
    }

    //restart game
    const restartGame = () => {
        setScore(0)
        setLevel('1')
        setGameState('start')
    }

    return (
        <div className="app">
            <button className="sound-toggle" onClick={toggleMusic}>
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <AnimatePresence mode="wait">
                {gameState === 'start' && (
                    <StartScreen
                        key="start"
                        startGame={startGame}
                        muted={muted}
                    />
                )}

                {gameState === 'game' && (
                    <GameScreen
                        key='game'
                        endGame={endGame}
                        level={level}
                        setLevel={setLevel}
                        character={character}
                        sounds={sounds}
                        muted={muted}
                    />
                )}

                {gameState === 'end' && (
                    <EndScreen
                        key="end"
                        score={score}
                        restartGame={restartGame}
                        character={character}
                        muted={muted}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default App