import { useState, useEffect } from "react";
import { 
  FaUserCircle, 
  FaEnvelope, 
  FaGamepad, 
  FaTrophy, 
  FaSignOutAlt, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaCrown,
  FaChartLine,
  FaMedal,
  FaBell,
  FaCog,
  FaHome,
  FaStore
} from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, database } from "../../firebase";
import { ref, get, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const PlayerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;

        const userRef = ref(database, "users/" + uid);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setPlayer({ uid, email, ...data });
          setFormData({ username: data.username, email });
        } else {
          const newUser = {
            username: "New Player",
            email,
            gamesPlayed: 0,
            highScore: 0,
            level: 1,
            rank: "Bronze",
            achievements: 0,
            friends: 0,
            joinDate: new Date().toISOString().split("T")[0],
          };
          setPlayer({ uid, ...newUser });
          setFormData({ username: "New Player", email });
          await set(userRef, newUser);
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setFormData({ username: player.username, email: player.email });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const userRef = ref(database, "users/" + player.uid);
      const updatedData = { ...player, username: formData.username, email: formData.email };
      await set(userRef, updatedData);
      setPlayer(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (!player) return null;

  const statsData = [
    { label: "Games Played", value: player.gamesPlayed, icon: <FaGamepad className="text-xl text-indigo-400" />, change: "+4" },
    { label: "High Score", value: player.highScore, icon: <FaTrophy className="text-xl text-yellow-400" />, change: "+320" },
    { label: "Level", value: player.level, icon: <FaChartLine className="text-xl text-green-400" />, change: "+2" },
    { label: "Achievements", value: player.achievements, icon: <FaMedal className="text-xl text-purple-400" />, change: "+1" },
  ];

  const recentActivities = [
    { action: "Completed", project: "Level " + player.level, time: "2 hours ago", icon: "🏆" },
    { action: "Earned", project: player.highScore + " points", time: "Yesterday", icon: "⭐" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">

      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FaGamepad className="text-xl text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">GameHub</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button className="text-gray-300 hover:text-white"><FaHome /></button>
          <button className="text-gray-300 hover:text-white"><FaStore /></button>
          <button className="text-gray-300 hover:text-white"><FaBell /></button>
          <button className="text-gray-300 hover:text-white"><FaCog /></button>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-white font-medium hidden md:inline">{player.username}</span>
          <FaUserCircle className="text-3xl text-white" />
        </div>
      </nav>

      <div className="flex-grow flex flex-col md:flex-row p-4 md:p-6 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-4 md:p-6 w-full md:w-1/4 border border-white/20">
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle className="text-6xl text-white drop-shadow-md" />
            {isEditing ? (
              <div className="w-full mt-4 space-y-3">
                <input 
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full p-2 rounded-md bg-white/5 border border-white/20 text-white"
                />
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 rounded-md bg-white/5 border border-white/20 text-white"
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mt-4">{player.username}</h2>
                <p className="text-gray-300 flex items-center gap-2 mt-1">
                  <FaEnvelope /> {player.email}
                </p>
                <div className="bg-indigo-600/30 text-indigo-300 text-xs px-3 py-1 rounded-full mt-2">
                  {player.rank} Rank
                </div>
              </>
            )}
          </div>

          <div className="mt-6 space-y-3">
            {isEditing ? (
              <div className="flex gap-3">
                <button onClick={handleSave} className="flex-1 bg-green-600 py-2 rounded-lg text-white"><FaSave /> Save</button>
                <button onClick={handleCancel} className="flex-1 bg-gray-600 py-2 rounded-lg text-white"><FaTimes /> Cancel</button>
              </div>
            ) : (
              <button onClick={handleEdit} className="w-full bg-blue-600 py-2 rounded-lg text-white"><FaEdit /> Edit Profile</button>
            )}

            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full bg-red-600 py-2 rounded-lg text-white"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-4 md:p-6 w-full md:w-3/4 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Player Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-white/10">{stat.icon}</div>
                  <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                <span className="text-sm text-gray-300">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Activities */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FaMedal className="text-yellow-400" /> Recent Activities
            </h3>
            {recentActivities.map((act, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg mb-2">
                <div className="text-2xl">{act.icon}</div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="font-medium">{act.action}</span>{" "}
                    <span className="text-indigo-300">{act.project}</span>
                  </p>
                  <p className="text-xs text-gray-400">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-2">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 bg-gray-700 text-white rounded-lg">Cancel</button>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2"><FaSignOutAlt /> Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerProfile;
