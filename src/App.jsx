import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Hero from "./components/Hero";
import Characters from "./components/Characters";
import Arena from "./components/Arena";
import Footer from "./components/footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Shop from "./components/Shop";
import ThemeToggle from "./components/Theme";
import StartScreen from "./Games/MinigameStart";
import Endgamescreen from "./Games/endscreenMinigame";
import GameScreen from "./Games/Gamescreen";
import CharacterMinigame from "./Games/CharacterMinigame";
import FeedbackMinigame from "./Games/feedbackminigame";
import GameStart from "./Games/GameStart";
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
          <Route path="/StartScreen" element={<StartScreen />} />
          <Route path="/Endgamescreen" element={<Endgamescreen />} />
          <Route path="/GameScreen" element={<GameScreen />} />
          <Route path="/CharacterMinigame" element={<CharacterMinigame />} />
          <Route path="/FeedbackMinigame" element={<FeedbackMinigame />} />
          <Route path="/GameStart" element={<GameStart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;