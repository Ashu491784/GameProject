import {
  FaTimes,
  FaCircle,
  FaVolumeUp,
  FaMusic,
  FaRedo,
  FaVolumeMute,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export default function TikTac() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameActive, setGameActive] = useState(true);
  const [scores, setScores] = useState({ player: 0, computer: 0, ties: 0 });
  const [status, setStatus] = useState("Your turn (❌)");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const backgroundMusic = useRef(new Audio("/sound/newbg.mp3"));
  const clickSound = useRef(new Audio("/sound/click.wav"));
  const winSound = useRef(new Audio("/sound/win.wav"));
  const loseSound = useRef(new Audio("/sound/wrong.wav"));
  const drawSound = useRef(new Audio("/sound/correct.wav"));

  useEffect(() => {
    if (musicEnabled) {
      backgroundMusic.current.loop = true;
      backgroundMusic.current.play().catch(() => {});
    } else {
      backgroundMusic.current.pause();
    }
  }, [musicEnabled]);

  useEffect(() => {
    if (!gameActive) return;
    const winner = checkWin(currentPlayer);
    if (winner) {
      endGame(currentPlayer === "X" ? "player" : "computer");
    } else if (checkDraw()) {
      endGame("tie");
    } else if (currentPlayer === "O") {
      setStatus("Computer's turn 🤖");
      setTimeout(() => computerMove(), 800);
    }
  }, [board]);

  const playSound = (soundRef) => {
    if (soundEnabled && soundRef?.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(() => {});
    }
  };

  const handleClick = (i) => {
    if (board[i] || !gameActive || currentPlayer !== "X") return;
    makeMove(i, "X");
  };

  const makeMove = (index, player) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setCurrentPlayer(player === "X" ? "O" : "X");
    playSound(clickSound);
  };

  const computerMove = () => {
    if (!gameActive) return;

    let move = findWinningMove("O") ?? findWinningMove("X");

    if (move === null && board[4] === null) move = 4;

    if (move === null) {
      const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
      if (corners.length > 0)
        move = corners[Math.floor(Math.random() * corners.length)];
    }

    if (move === null) {
      const edges = [1, 3, 5, 7].filter((i) => board[i] === null);
      if (edges.length > 0)
        move = edges[Math.floor(Math.random() * edges.length)];
    }

    if (move !== null) {
      makeMove(move, "O");
    }
  };

  const findWinningMove = (player) => {
    for (const [a, b, c] of winPatterns) {
      if (board[a] === player && board[b] === player && !board[c]) return c;
      if (board[a] === player && board[c] === player && !board[b]) return b;
      if (board[b] === player && board[c] === player && !board[a]) return a;
    }
    return null;
  };

  const checkWin = (player) =>
    winPatterns.some((pattern) =>
      pattern.every((index) => board[index] === player)
    );

  const checkDraw = () => board.every((cell) => cell !== null);

  const endGame = (winner) => {
    setGameActive(false);
    if (winner === "player") {
      setStatus("You Win! 🎉");
      setScores((s) => ({ ...s, player: s.player + 1 }));
      playSound(winSound);
    } else if (winner === "computer") {
      setStatus("Computer Wins! 🤖");
      setScores((s) => ({ ...s, computer: s.computer + 1 }));
      playSound(loseSound);
    } else {
      setStatus("It's a Draw! 🤝");
      setScores((s) => ({ ...s, ties: s.ties + 1 }));
      playSound(drawSound);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setGameActive(true);
    setStatus("Your turn (❌)");
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-indigo-200 p-4">
  <div className="bg-blue-950 bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md text-center border border-b-blue-800 transition-all duration-500 hover:shadow-blue-950">
    <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2 text-white drop-shadow">
      <FaTimes className="text-red-400 animate-pulse" />
      Tic-Tac-Toe
      <FaCircle className="text-blue-300 animate-pulse" />
    </h1>

    <div className="flex justify-between font-semibold mb-2 text-lg text-blue-950 tracking-wide">
      <span>You</span>
      <span>Tie</span>
      <span>Computer</span>
    </div>
    <div className="flex justify-between font-semibold mb-6 text-xl bg-transparent text-blue-950">
      <span className="transition duration-300 hover:scale-110">{scores.player}</span>
      <span className="transition duration-300 hover:scale-110">{scores.ties}</span>
      <span className="transition duration-300 hover:scale-110">{scores.computer}</span>
    </div>

    <div className="grid grid-cols-3 gap-4 mb-6">
      {board.map((cell, i) => (
        <div
          key={i}
          className={`w-20 h-20 bg-white/10 rounded-xl text-4xl font-extrabold flex items-center justify-center text-white cursor-pointer transition-all duration-200 hover:scale-110 hover:bg-white/20 shadow-md ${
            cell === "X"
              ? "text-red-400 animate-[pop_0.3s_ease-in-out]"
              : cell === "O"
              ? "text-blue-300 animate-[pop_0.3s_ease-in-out]"
              : ""
          }`}
          onClick={() => handleClick(i)}
        >
          {cell}
        </div>
      ))}
    </div>

    <div className="text-white text-lg font-semibold mb-6 tracking-wide drop-shadow-sm animate-fade-in">
      {status}
    </div>

    <div className="flex justify-center gap-6">
      <button
        className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 hover:scale-110 transition duration-300 shadow-md"
        title="Toggle Sound"
        onClick={() => setSoundEnabled((prev) => !prev)}
      >
        {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>
      <button
        className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 hover:scale-110 transition duration-300 shadow-md"
        title="Toggle Music"
        onClick={() => setMusicEnabled((prev) => !prev)}
      >
        <FaMusic />
      </button>
      <button
        className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 hover:scale-110 transition duration-300 shadow-md"
        title="Reset"
        onClick={resetGame}
      >
        <FaRedo />
      </button>
    </div>
  </div>
</div>

  );
}
