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
               {/* <Characters />
              <Arena />
              <Footer />  */}
            </>
          }
        />
      <Route path="/Characters" element={<Characters />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/Arena" element={<Arena />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />
     
      <Route path="/Theme" element={<ThemeToggle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;