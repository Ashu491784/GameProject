import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaVolumeMute, FaVolumeUp, FaHome, FaEye, FaEyeSlash, FaUser, FaKey, FaQuestionCircle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  
  const emailRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
    
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      navigate("/CGameScrean");
    } catch (err) {
      console.error(err);
      let errorMessage = "Invalid email or password!";

      if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address format.";
      } else if (err.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled.";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@example.com");
    setPassword("demoPassword");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
      <video
        src="/videos/ui.mp4"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      ></video>
      
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-20">
        <Link to="/">
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaHome size={18} />
            <span className="hidden sm:inline">Home</span>
          </motion.button>
        </Link>
        
        <div className="flex gap-3">
          <motion.button
            className="bg-gray-800 bg-opacity-70 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </motion.button>
          
          <motion.button
            className="bg-gray-800 bg-opacity-70 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHelp(!showHelp)}
            aria-label="Show help"
          >
            <FaQuestionCircle size={18} />
          </motion.button>
        </div>
      </div>

      {showHelp && (
        <motion.div 
          className="absolute top-20 right-5 bg-gray-800 bg-opacity-90 p-4 rounded-lg shadow-lg max-w-xs z-30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <h3 className="text-cyan-400 font-bold mb-2">Need Help?</h3>
          <p className="text-white text-sm mb-2">Use your registered email and password to login.</p>
          <p className="text-white text-sm">Check your spelling if you're having trouble logging in.</p>
          <button 
            className="mt-3 text-cyan-400 text-xs hover:underline"
            onClick={() => setShowHelp(false)}
          >
            Got it
          </button>
        </motion.div>
      )}
      
      <div className="text-center mt-20 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 drop-shadow-lg">
          Welcome to Gaming Hub
        </h2>
        <p className="mt-2 text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Play carrom online with friends
        </p>
      </div>
      
      <div className="relative w-full max-w-md bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-cyan-500 border-opacity-30 z-10 gaming-login-card">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
        
        <div className="px-8 py-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
              <h1 className="text-3xl font-bold text-white gaming-font">PLAYER LOGIN</h1>
              <div className="w-3 h-3 bg-purple-500 rounded-full ml-2 animate-pulse"></div>
            </div>
            <p className="text-cyan-200 text-sm">Access your gaming dashboard</p>
          </div>
          
          {error && (
            <motion.div 
              className="mb-6 p-3 bg-red-900 bg-opacity-70 border border-red-700 rounded-lg text-red-200 text-sm flex items-center gaming-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-cyan-100 mb-2 gaming-label">
                <span className="flex items-center">
                  <FaUser className="mr-1 text-cyan-400" />
                  EMAIL ADDRESS
                </span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailRef}
                  className="w-full px-4 py-3 pl-10 bg-gray-900 bg-opacity-70 border border-cyan-700 border-opacity-50 rounded-lg text-white placeholder-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 gaming-input"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-cyan-100 mb-2 gaming-label">
                <span className="flex items-center">
                  <FaKey className="mr-1 text-cyan-400" />
                  PASSWORD
                </span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-gray-900 bg-opacity-70 border border-cyan-700 border-opacity-50 rounded-lg text-white placeholder-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 gaming-input"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500" />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-cyan-400 hover:text-cyan-300" />
                  ) : (
                    <FaEye className="h-5 w-5 text-cyan-400 hover:text-cyan-300" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="hidden"
                  />
                  <label 
                    htmlFor="rememberMe" 
                    className={`flex items-center cursor-pointer text-sm ${rememberMe ? 'text-cyan-400' : 'text-gray-400'}`}
                  >
                    <div className={`w-4 h-4 border rounded-sm mr-2 flex items-center justify-center ${rememberMe ? 'bg-cyan-500 border-cyan-500' : 'border-gray-500'}`}>
                      {rememberMe && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    Remember me
                  </label>
                </div>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200 gaming-link">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 gaming-button ${
                isLoading
                  ? "bg-gray-700 cursor-not-allowed text-gray-400"
                  : "bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-lg hover:shadow-cyan-500/20"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SIGNING IN...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  LOGIN
                </>
              )}
            </button>
          </form>
          <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg">
            <p className="text-gray-400 text-sm text-center mb-2">Want to try first?</p>
            <button
              onClick={handleDemoLogin}
              className="w-full text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors duration-200"
            >
              Use Demo Account
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Not a member?{" "}
              <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200 gaming-link">
                Join the game
              </Link>
            </p>
          </div>
        </div>
        
        <div className="px-8 py-4 bg-black bg-opacity-30 text-center border-t border-gray-700">
          <p className="text-xs text-gray-500">
            © 2025 GameHub. Ready player one?
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .gaming-login-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .gaming-font {
          font-family: 'Orbitron', 'Arial Black', sans-serif;
          letter-spacing: 1px;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
        }
        
        .gaming-login-card {
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.2), 0 0 15px rgba(128, 0, 255, 0.2);
        }
        
        .gaming-input {
          transition: all 0.3s ease;
        }
        
        .gaming-input:focus {
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        
        .gaming-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .gaming-button:before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        
        .gaming-error {
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
          animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .gaming-label {
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-size: 0.8rem;
        }
        
        .gaming-link {
          position: relative;
          text-decoration: none;
        }
        
        .gaming-link:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(to right, cyan, purple);
          transition: width 0.3s ease;
        }
        
        .gaming-link:hover:after {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Login;