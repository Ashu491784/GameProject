import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaHome,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaKey,
  FaQuestionCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
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
    setError("Demo credentials filled. Click LOGIN to continue.");
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex justify-center items-center p-4"
      style={{
        backgroundImage: "url('/images/loginui2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-20">
        <Link to="/">
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none flex items-center gap-2 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome size={18} />
            <span className="hidden sm:inline">Home</span>
          </motion.button>
        </Link>

        <div className="flex gap-3">
          <motion.button
            className="bg-gray-800/70 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </motion.button>

          <motion.button
            className="bg-gray-800/70 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHelp(!showHelp)}
          >
            <FaQuestionCircle size={18} />
          </motion.button>         
        </div>
        
      </div>      
      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="absolute top-20 right-5 bg-gray-800/90 p-4 rounded-lg shadow-lg max-w-xs z-30 backdrop-blur-sm"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <h3 className="text-cyan-400 font-bold mb-2">Need Help?</h3>
            <p className="text-white text-sm mb-2">
              Use your registered email and password to login.
            </p>
            <p className="text-white text-sm mb-2">
              Demo: demo@example.com / demoPassword
            </p>
            <button
              className="mt-3 text-cyan-400 text-xs hover:underline"
              onClick={() => setShowHelp(false)}
            >
              Got it
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md z-10">
        <motion.div
          className="relative w-full bg-gray-800/70 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-cyan-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                PLAYER LOGIN
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              </h1>
              <p className="text-cyan-200 text-sm">
                Access your gaming dashboard
              </p>
            </div>
            <AnimatePresence>
              {error && (
                <motion.div className="mb-6 p-3 bg-red-900/70 border border-red-700 rounded-lg text-red-200 text-sm flex items-center gap-2">
                  <FaExclamationTriangle />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-cyan-100 mb-2"
                >
                  <FaUser className="mr-1 text-cyan-400 inline" /> EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailRef}
                  className="w-full px-4 py-3 bg-gray-900/70 border border-cyan-700/50 rounded-lg text-white placeholder-cyan-500/70 focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-cyan-100 mb-2"
                >
                  <FaKey className="mr-1 text-cyan-400 inline" /> PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-10 bg-gray-900/70 border border-cyan-700/50 rounded-lg text-white placeholder-cyan-500/70 focus:ring-2 focus:ring-cyan-500"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-cyan-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-cyan-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center"
                >
                  <div
                    className={`w-5 h-5 border rounded-sm mr-2 flex items-center justify-center ${
                      rememberMe
                        ? "bg-cyan-500 border-cyan-500"
                        : "border-gray-500"
                    }`}
                  >
                    {rememberMe && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">Remember me</span>
                </button>

                <Link
                  to="/ForgetPassword"
                  className="text-sm text-cyan-400 hover:text-cyan-300"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium ${
                  isLoading
                    ? "bg-gray-700 cursor-not-allowed text-gray-400"
                    : "bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500"
                }`}
              >
                {isLoading ? "SIGNING IN..." : "LOGIN"}
              </motion.button>
            </form>

            <div className="mt-6 p-3 bg-gray-900/50 rounded-lg">
              <p className="text-gray-400 text-sm text-center mb-2">
                Want to try first?
              </p>
              <button
                onClick={handleDemoLogin}
                className="w-full text-cyan-400 text-sm font-medium hover:text-cyan-300"
              >
                Use Demo Account
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Not a member?{" "}
                <Link
                  to="/register"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Join the game
                </Link>
              </p>
            </div>
          </div>

          <div className="px-8 py-4 bg-black/30 text-center border-t border-gray-700">
            <p className="text-xs text-gray-500">
              © 2025 GameHub. Ready player one?
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
