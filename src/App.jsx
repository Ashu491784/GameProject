import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Hero from "./components/Hero";
import Characters from "./components/Characters";
import Arena from "./components/Arena";
import Footer from "./components/footer";
import Login from "./components/Login";
import Register from "./components/Register";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <Characters />
              <Arena />
              <Footer />
            </>
          }
        />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;