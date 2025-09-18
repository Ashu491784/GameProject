import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Hero from "./components/Hero";
import Characters from "./components/Characters";
import Arena from "./components/Arena";
import Login from "./components/Login";
import Register from "./components/Register";
import Shop from "./components/Shop";
import MinigameScrean from "./components/MinigamesScreen";
import GameStart from "./Games/GameStart";
import Sound from "./Games/sound";
import Quiz from "./quizGame/QuizScrean";
import QuizDashboard from "./quizGame/QuizDashboard";
import FinalScore from "./quizGame/Score";
import TikTac from "./TitikGame/TikTacGame";
import FirstScrean from "./MainGameComponents/firstScreen";
import GamesCard from "./components/GamesCard";
import GameStarts from "./MainGameComponents/GameStart";
import Payment from "./components/payment";
import CGameScrean from "./CaromGame/CGameScraen";
import LiveChat from "./components/LiveChat";
import Message from "./components/Message";
import Footer from "./components/Footer"
import Shoot from "./Shoot/shoot";
import ForgetPassword from "./components/ForgetPassword";
import UserProfile from "./User/UserProfile";
import AddUsers from "./User/AddUser";
import ItemPage from "./User/ItemPage";
import PerfumeLandingPage from "./User/Fulll";
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
              <GamesCard />
              <Message/>
              <Footer/>
            </>
          }
        />
      <Route path="/Characters" element={<Characters />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/Arena" element={<Arena />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/GameStart" element={<GameStart />} />
          <Route path="/Minigames" element={<MinigameScrean />} />
          <Route path="/Sound" element={ <Sound />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/QuizDashboard" element={<QuizDashboard />} />
          <Route path="/FinalScore" element={<FinalScore />} />
          <Route path="/TikTac" element={<TikTac />} />
          <Route path="/FirstScrean" element={<FirstScrean/>} />
          <Route path="/GameStarts" element={<GameStarts/>} />
          <Route path="/Payment" element={<Payment/>} />
          <Route path="/CGameScrean" element={<CGameScrean/>} />
          <Route path="/LiveChat" element={<LiveChat/>} />
          <Route path="/GamesCard" element={<GamesCard/>} />
          <Route path="/Message" element={<Message/>} />
          <Route path="/Shoot" element={<Shoot/>} />
          <Route path="/ForgetPassword" element={<ForgetPassword/>} />
          <Route path="/UserProfile" element={<UserProfile/>} />
          <Route path="/AddUsers" element={<AddUsers/>} />
          <Route path="/ItemPage" element={<ItemPage/>} />
          <Route path="/PerfumeLandingPage" element={<PerfumeLandingPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;