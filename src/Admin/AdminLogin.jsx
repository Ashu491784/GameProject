import { Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { auth, database } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { useNavigate } from "react-router-dom";

const AdminLoginSinhala = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const emailRef = useRef(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, "Admin"));

      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = Object.values(admins).some((admin) => admin.email === userEmail);

        if (isAdmin) {
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          navigate("/UserProfile");
        } else {
          setError("You are not authorized as an Admin.");
        }
      } else {
        setError("No admin records found.");
      }
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-800 p-6">
      <div className="flex flex-col items-center bg-white/10 backdrop-blur-lg rounded-2xl p-10 max-w-md w-full shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-white/20">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-8 h-8 text-yellow-300" />
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Admin{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-green-400">
              Login
            </span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              id="rememberMe"
              className="w-4 h-4"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-300">
              Remember Me
            </label>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-300 to-green-400 text-black font-bold tracking-wide shadow-lg hover:scale-105 hover:shadow-yellow-400/40 transition-transform duration-300 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginSinhala;
