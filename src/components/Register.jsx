import {BiUser} from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { Link , useNavigate} from "react-router-dom";
import { div, object } from "framer-motion/client";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth, database, ref, push, set } from "../../firebase";

const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmitev = async (e) => {
    e.preventDefault();
            console.log("Email:", email);
      console.log("Password:", password);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = ref(database, "users");
      await push(userRef, {
        email: user.email,
        uid: user.uid,
      });

      alert("User Registered Successfully!");
      navigate("/Login");
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="text-white h-[100vh] flex justify-center items-center bg-cover">
          <video src='public\videos\girltheme.mp4' 
        autoPlay 
         muted 
          loop
         playsInline
        className='w-full h-full object-cover absolute 
        top-0 first-letter:left-0 -z-10'>
        </video>
       <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmitev}>
          <div className="relative my-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent
              border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
              focus:ring-0 focus:border-blue-600 peer"
              required
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
              peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6">
              Your Email
            </label>
          </div>

          <div className="relative my-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent
              border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
              focus:ring-0 focus:border-blue-600 peer"
              required
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
              peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6">
              Your Password
            </label>
          </div>

          <div className="relative my-4">
            <input
              type="password"
              value={confirm}
              onChange={(e) => setconfirm(e.target.value)}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent
              border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
              focus:ring-0 focus:border-blue-600 peer"
              required
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
              peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6">
              Confirm Password
            </label>
          </div>

          {error && <p className="text-red-400 text-sm my-2">{error}</p>}

          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full 
            bg-white text-blue-700 hover:bg-blue-300 hover:text-white py-2 transition-colors duration-300"
          >
            Register
          </button>

          <div className="text-sm">
            <span className="text-blue-300">Already have an account? </span>
            <Link to="/Login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
   
    
               
                
  )
}

export default Register
