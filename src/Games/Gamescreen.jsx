import { useState, useEffect } from "react";
import { motion, AnimatePresence, scale } from "framer-motion";
import { Howl } from "howler";
// import Wardrobe from "./Wardrobe";
// import Character from "./Character";
// import Feedback from "./Feedback";
import { ChallengesMinigame } from "../Minigamejs/challengeminigame";
import { CalculateScoreMinigame } from "../Minigamejs/Scoreminigame";
import { FiArrowLeft } from "react-icons/fi";

const GameScreen = ({ endGame, level, setLevel, character, sounds, muted }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [gamePaused, setGamePaused] = useState(false);
    const [timer, setTimer] = useState(60);

    const currentChallenge = ChallengesMinigame[level - 1]


    useEffect(() => {
        if (gamePaused || showFeedback) return

        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval)
                    handleSubmit()
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [gamePaused, showFeedback])

    //submit outfit for feedback
    const handleSubmit = () => {
        setGamePaused(true);
        //calculate score
        const result = CalculateScoreMinigame(selectedItems,
            currentChallenge.requirements, level)
        setFeedback(result)
        setShowFeedback(true)

        //play appropriate sound
        if (!muted) {
            if (result.score >= 70) sounds.correct.play()
            else sounds.wrong.play()
        }
    }

    //continue to next level or end game
    const handleContinue = () => {
        if (level < challenges.length) {
            setLevel(level + 1)
            setSelectedItems([])
            setTimer(60)
            setShowFeedback(false)
            setGamePaused(false)
        } else {
            endGame(feedback.totalScore)
        }
    }

    //add item to outfit
    const addItem = (item) => {
        // check if item type already exists and replace it
        const existingItemIndex = selectedItems.findIndex(i => i.type === item.type)

        if (existingItemIndex >= 0) {
            setSelectedItems(prev => [
                ...prev.slice(0, existingItemIndex),
                item,
                ...prev.slice(existingItemIndex + 1)
            ])
        } else {
            setSelectedItems(prev => [...prev, item])
        }
    }

    //remove item from outfit
    const removeItem = (itemType) => {
        setSelectedItems(prev => prev.filter(item => item.type === itemType))
    }

    return (
        <motion.div
            className="game-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="game-header">
                <button className="back-button"
                    onClick={() => endGame(0)}>
                    <FiArrowLeft />
                </button>

                <div className="game-info">
                    <div className="timer">⏱️ {timer}</div>
                    <div className="level">Level {level} of {challenges.length}</div>
                </div>
            </div>
            <div className="game-container">
                <div className="challenge-card">
                    <h3>Challenge:</h3>
                    <h2>{currentChallenge.title}</h2>
                    <p>{currentChallenge.description}</p>
                    <div className="requirements">
                        <h4>Requirements:</h4>
                        <ul>
                            {currentChallenge.requirements.map((req, i) => (
                                <li key={i}>{req}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Character
                    chacter={character}
                    selectedItems={selectedItems}
                    removeItem={removeItem}
                    feedback={feedback}
                />
                <Wardrobe
                    currentChallenge={currentChallenge}
                    selectedItems={selectedItems}
                    addItem={addItem}
                    muted={muted}
                />

                <div className="submit-area">
                    <motion.button
                        className="submit-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={ handleSubmit }
                        disabled={selectedItems.length === 0 || gamePaused}
                    >
                        Submit Outfit
                    </motion.button>
                </div>

                <AnimatePresence>
                    {showFeedback && (
                        <Feedback
                            feedback={feedback}
                            handleContinue={handleContinue}
                            isFinalLevel={level === challenges.length}
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default GameScreen