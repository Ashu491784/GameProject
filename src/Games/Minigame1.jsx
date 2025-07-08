import React, { useState, useEffect, useRef } from 'react';

const TempleRunGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [distance, setDistance] = useState(0);
  const [playerState, setPlayerState] = useState('running'); 
  const [obstacles, setObstacles] = useState([]);
  const [coinsList, setCoinsList] = useState([]);
  const [gameSpeed, setGameSpeed] = useState(10);
  const gameLoopRef = useRef(null);
  const obstacleIdRef = useRef(0);
  const coinIdRef = useRef(0);
  
  // Game constants
  const JUMP_DURATION = 25; // frames
  const SLIDE_DURATION = 30; // frames

  // Initialize game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setDistance(0);
    setCoins(0);
    setPlayerState('running');
    setObstacles([]);
    setCoinsList([]);
    setGameSpeed(10);
    
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) 
        return;
      
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        if (playerState === 'running') {
          jump();
        }
      }
      else if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S')) {
        if (playerState === 'running') {
          slide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, playerState]);

  // Jump action
  const jump = () => {
    setPlayerState('jumping');
    setTimeout(() => {
      setPlayerState('running');
    }, JUMP_DURATION * 16);
  };

  // Slide action
  const slide = () => {
    setPlayerState('sliding');
    setTimeout(() => {
      setPlayerState('running');
    }, SLIDE_DURATION * 16);
  };

  // Generate random obstacle
  const generateObstacle = () => {
    const types = ['rock', 'tree', 'pit', 'fire', 'wall'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: obstacleIdRef.current++,
      type,
      position: 100, // start at right edge
      passed: false,
      height: type === 'wall' ? 80 : type === 'tree' ? 60 : 30
    };
  };

  // Generate random coin
  const generateCoin = () => {
    const positions = [20, 40, 60, 80]; // different heights
    
    return {
      id: coinIdRef.current++,
      position: 100,
      height: positions[Math.floor(Math.random() * positions.length)],
      collected: false
    };
  };



  return (
    
    <div>

    </div>
  );
};

export default TempleRunGame;