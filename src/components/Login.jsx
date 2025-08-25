import { Link, useNavigate } from "react-router-dom";
import {BiUser} from "react-icons/bi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AiOutlineUnlock } from 'react-icons/ai';
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login success!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password!");
    }
  };
  return (
    <div className="text-white h-[100vh] flex justify-center items-center bg-cover">
         <video src='public\videos\newlog.mp4' 
        autoPlay 
         muted 
          loop
         playsInline
        className='w-full h-full object-cover absolute 
        top-0 first-letter:left-0 -z-10'>
        </video>
        <div className="bg-slate-800 border border-slate-400 rounded-md
        p-8 shadow-lg background-filter backdrop:-blur-sm bg-opacity-30 relative">
            <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="relative my-4 ">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent
            border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 
           focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" />
            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 
            scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6 ">Your Email</label>
           {/* <BiUser className="absolute top-4 ring-4 "/> */}
           
            </div>
             <div className="relative my-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent
            border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 
           focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" />
            <label htmlFor="" className="absolute text-sm text-white duration-300 transform  -translate-y-6 
            scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6 ">Your Password</label>
           {/* <AiOutlineUnlock className="absolute top-4 ring-4"/> */}
           
            </div>
            <div className="flex justify-between items-center">
                <div className="">
                    <input type="checkbox" name=""  id=""/>
                    <label htmlFor="Remember Me" className="">Remember Me</label>
                </div>
                <Link to='' className="text-blue-500 ">Forget Password?</Link>
            </div>
            <button type="submit" className="w-full mb-4 text-[18px] mt-6 rounded-full 
            bg-white text-blue-700 hover:bg-blue-200 hover:text-white py-2 transition-colors duration-300"><Link to="/Hero">Login</Link></button>
           <div>
                <span className="text-blue-500">New Here? <Link to="/register" className="text-blue-500">Create an Account</Link></span>
</div>
            </form>
        </div>
    </div>
  )
}

export default Login