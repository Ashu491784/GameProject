import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database, ref, push, set } from "../../firebase";
import { motion } from "framer-motion";
import { FaHome, FaEye, FaEyeSlash, FaUser, FaKey, FaEnvelope, FaQuestionCircle, FaPhone } from "react-icons/fa";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength("");
      return;
    }

    if (password.length < 6) {
      setPasswordStrength("Weak");
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    const strengthCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

    if (strengthCount < 2) {
      setPasswordStrength("Weak");
    } else if (strengthCount < 4) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  }, [password]);

  const handleSubmitev = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirm) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = ref(database, "users");
      await push(userRef, {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        contact: contact,
      });

      alert("User Registered Successfully!");
      navigate("/Login");
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage = "Operation not allowed.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
      <video
        src="public/videos/girltheme.mp4"
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
          <h3 className="text-cyan-400 font-bold mb-2">Registration Help</h3>
          <p className="text-white text-sm mb-2">• Use a valid email address</p>
          <p className="text-white text-sm mb-2">• Password must be at least 6 characters</p>
          <p className="text-white text-sm">• For stronger security, include uppercase, lowercase, numbers, and symbols</p>
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
          Join Gaming Hub
        </h2>
        <p className="mt-2 text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Create your account to start playing carrom online with friends
        </p>
      </div>

      <div className="relative w-full max-w-md bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-cyan-500 border-opacity-30 z-25 gaming-login-card">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>

        <div className="px-6 py-6 space-y-4 ">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
              <h1 className="text-3xl font-bold text-white gaming-font">CREATE ACCOUNT</h1>
              <div className="w-3 h-3 bg-purple-500 rounded-full ml-2 animate-pulse"></div>
            </div>
            <p className="text-cyan-200 text-sm">Join our gaming community</p>
          </div>

          {error && (
            <motion.div
              className="mb-6 p-3 bg-red-900 bg-opacity-70 border border-red-700 rounded-lg text-red-200 text-sm flex items-center gaming-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmitev}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-cyan-100 mb-2 gaming-label">
                <span className="flex items-center">
                  <FaUser className="mr-1 text-cyan-400" />
                  FIRST NAME
                </span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 bg-opacity-70 border border-cyan-700 border-opacity-50 rounded-lg text-white placeholder-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 gaming-input"
                placeholder="Enter first name"
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-cyan-100 mb-2 gaming-label">
                <span className="flex items-center">
                  <FaUser className="mr-1 text-cyan-400" />
                  LAST NAME
                </span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 bg-opacity-70 border border-cyan-700 border-opacity-50 rounded-lg text-white placeholder-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 gaming-input"
                placeholder="Enter last name"
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-cyan-100 mb-2 gaming-label">
                <span className="flex items-center">
                  <FaPhone className="mr-1 text-cyan-400" />
                  CONTACT
                </span>
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 bg-opacity-70 border border-cyan-700 border-opacity-50 rounded-lg text-white placeholder-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 gaming-input"
                placeholder="Enter contact number"
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-cyan-100 mb-2 gaming-label">
                <span className="flex items-center">
                  <FaEnvelope className="mr-1 text-cyan-400" />
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
                  onChange={(e) => setemail(e.target.value)}
                  ref={emailRef}
                  className="w-full px-4 py-3 pl-10 bg-gray-900 bg-opacity-70 border border-cyan-700 border-opacity-50 rounded-lg text-white placeholder-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 gaming-input"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500" />
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-gray-900 bg-opacity-70 border border-cyan-700 border-opacity-50 rounded-lg text-white placeholder-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 gaming-input"
                  placeholder="Create a password"
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

              {password && (
                <div className="mt-2">
                  <div className="flex items-center">
                    <div
                      className={`h-1 flex-1 rounded-full mr-1 ${
                        passwordStrength === "Weak"
                          ? "bg-red-500"
                          : passwordStrength === "Medium"
                          ? "bg-yellow-500"
                          : passwordStrength === "Strong"
                          ? "bg-green-500"
                          : "bg-gray-600"
                      }`}
                    ></div>
                    <div
                      className={`h-1 flex-1 rounded-full mr-1 ${
                        passwordStrength === "Weak"
                          ? "bg-gray-600"
                          : passwordStrength === "Medium"
                          ? "bg-yellow-500"
                          : passwordStrength === "Strong"
                          ? "bg-green-500"
                          : "bg-gray-600"
                      }`}
                    ></div>
                    <div
                      className={`h-1 flex-1 rounded-full ${
                        passwordStrength === "Strong" ? "bg-green-500" : "bg-gray-600"
                      }`}
                    ></div>
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      passwordStrength === "Weak"
                        ? "text-red-400"
                        : passwordStrength === "Medium"
                        ? "text-yellow-400"
                        : passwordStrength === "Strong"
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    {passwordStrength ? `Password strength: ${passwordStrength}` : ""}
                  </p>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyan-100 mb-2 gaming-label">
                <span className="flex items-center">
                  <FaKey className="mr-1 text-cyan-400" />
                  CONFIRM PASSWORD
                </span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => setconfirm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-gray-900 bg-opacity-70 border border-cyan-700 border-opacity-50 rounded-lg text-white placeholder-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 gaming-input"
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500" />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-cyan-400 hover:text-cyan-300" />
                  ) : (
                    <FaEye className="h-5 w-5 text-cyan-400 hover:text-cyan-300" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-8">
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white transition-all duration-200 gaming-submit-btn ${
                  isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                }`}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </motion.button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-300 gaming-text">
              Already have an account?{" "}
              <Link to="/Login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
