import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple&encode=base64")
      .then((res) => {
        const formatted = res.data.results.map((q) => ({
          question: decodeBase64(q.question),
          answers: shuffle([
            ...q.incorrect_answers.map((ans) => decodeBase64(ans)),
            decodeBase64(q.correct_answer),
          ]),
          correct: decodeBase64(q.correct_answer),
        }));
        setQuestions(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleAnswer(null); //time eka iwara unama ilaga prasneta yanna
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const decodeBase64 = (str) => {
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch (e) {
      return str;
    }
  };
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);
  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[current]?.correct;
    const next = current + 1;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    if (next < questions.length) {
      setCurrent(next);
      setTimer(60);
    } else {
      navigate("/FinalScore", {
        state: {
          score: isCorrect ? score + 1 : score,
          total: questions.length,
        },
      });
    }
  };

  if (loading)
    return (
      <div className="text-center p-10 text-white">Loading Questions...</div>
    );
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-400 to-cyan-600 flex flex-col items-center justify-center p-4 text-white"
      style={{
        backgroundImage: "url('/images/projects-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl px-10 py-6 mb-6 shadow-2xl">
        <h1 className="text-4xl font-bold text-gray-50 drop-shadow-lg tracking-wider">
          REACT QUIZ
        </h1>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl px-5 py-2 mb-4 shadow-2xl flex gap-6 text-lg">
        <span>📊 Score: {score}</span>
        <span>⏳ Time: {timer}s</span>
      </div>
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-gray-700 font-medium mb-2">
          Question {current + 1} / {questions.length}
        </p>
        <h3 className="text-lg font-semibold mb-4">
          {questions[current].question}
        </h3>
        <div className="space-y-2">
          {questions[current].answers.map((ans, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(ans)}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded hover:from-teal-400 hover:to-blue-500 transition duration-300">
              {ans}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
