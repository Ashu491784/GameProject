import Header from "./components/header";
import Hero from "./components/Hero";
import Characters from "./components/Characters";
import Arena from "./components/Arena";
import Footer from "./components/footer";
import { Route, Router } from "lucide-react";
import Login from "./components/Login";
// import Login from "./components/Login";

export const App = () => {
  return (
    <div className=''>
      <Header/>
      <Hero/>
      <Characters/>
      <Arena/>
      <Footer/>
      {/* <Login/> */}
      <Router>
        <Route path="login" element={ <Login/>}></Route>
      </Router>
    </div>
  )
}

export default App
