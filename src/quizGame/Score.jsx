import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const FinalScore = () => {
  const { state } = useLocation();
 

  if (!state) {
    return <div className="text-center text-white p-10">No Score Found!</div>;
  }

  const { score, total } = state;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-400 to-blue-700 flex items-center justify-center text-white">
      <div className="bg-white text-black p-10 rounded-xl shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">🎉 Quiz Completed!</h1>
        <p className="text-xl mb-4">Your Score: <span className="font-bold">{score}</span> / {total}</p>
  <div className="mt-6">
  <Link to="/QuizDashboard" className="mr-4">
    <button className="px-6 py-2 bg-gradient-to-r from-yellow-300 to-green-400 text-black font-bold transition">Try Again 🫣</button>
  </Link>
  <Link to="/MinigameScrean">
    <button className="px-6 py-2 bg-gradient-to-r from-yellow-300 to-green-400 text-black font-bold transition">🏡 Home</button>
  </Link>
</div>


      </div>
    </div>
  );
};

export default FinalScore;