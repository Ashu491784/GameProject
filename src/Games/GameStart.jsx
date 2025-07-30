import React, { useState } from "react";
import Minigame1 from "./Games/Minigame1";
import StartScreen from "./Games/MinigameStart";
import Endgamescreen from "./Games/endscreenMinigame";
import GameScreen from "./Games/Gamescreen";
import CharacterMinigame from "./Games/CharacterMinigame";
import FeedbackMinigame from "./Games/feedbackminigame";
function GameStart() {
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

export default GameStart