import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Hero from "./components/Hero";
import Characters from "./components/Characters";
import Arena from "./components/Arena";
import Login from "./components/Login";
import Register from "./components/Register";
import Shop from "./components/Shop";
import ThemeToggle from "./components/Theme";
import MinigameScrean from "./components/MinigamesScreen";
import GameStart from "./Games/GameStart";
import Sound from "./Games/sound";
import Quiz from "./quizGame/QuizScrean";
import QuizDashboard from "./quizGame/QuizDashboard";
import FinalScore from "./quizGame/Score";
import TikTac from "./TitikGame/TikTacGame";
import FirstScrean from "./MainGameComponents/firstScreen";
import LionKingBg from "./MainGameComponents/LionkingBg";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
            </>
          }
        />
      <Route path="/Characters" element={<Characters />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/Arena" element={<Arena />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Theme" element={<ThemeToggle />} />
          <Route path="/GameStart" element={<GameStart />} />
          <Route path="/Minigames" element={<MinigameScrean />} />
          <Route path="/Sound" element={ <Sound />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/QuizDashboard" element={<QuizDashboard />} />
          <Route path="/FinalScore" element={<FinalScore />} />
          <Route path="/TikTac" element={<TikTac />} />
           <Route path="/FirstScrean" element={<FirstScrean/>} />
          <Route path="/LionKingBg" element={<LionKingBg/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;