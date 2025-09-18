import { useState, useEffect } from 'react';
import { Zap, LayoutDashboard, Gamepad2, Users, ShoppingBag, Image, FileText, MessageSquare, Settings, Shield, Moon, Sun, Bell, Search } from 'lucide-react';
import { cardImages } from '../components/GamesCard';
import { database, ref, onValue } from "../../firebase";

const UserProfile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [userCount, setUserCount] = useState(0);

  // Load theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode class and save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Fetch user count from Firebase
  useEffect(() => {
    const usersRef = ref(database, "users");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserCount(Object.keys(data).length); 
      } else {
        setUserCount(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const gameCount = cardImages.length;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
      {/* Sidebar */}
      <div className="transition duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10 w-80">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">Game Zoon</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto sidebar-scrollbar">
          <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-3 mb-2">Main</h4>
          
          <a href="#" className="sidebar-item flex items-center space-x-3 p-3 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </a>
          
          <a href="#" className="sidebar-item flex items-center space-x-3 p-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <Gamepad2 className="w-5 h-5" />
            <span className="font-medium">Games</span>
          </a>
          
          <a href="/AddUsers" className="sidebar-item flex items-center space-x-3 p-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <Users className="w-5 h-5" />
            <span className="font-medium">Users</span>
          </a>
          
          <a href="#" className="sidebar-item flex items-center space-x-3 p-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">Orders</span>
          </a>

          <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-3 mt-6 mb-2">Content</h4>
          
          <a href="#" className="sidebar-item flex items-center space-x-3 p-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <Image className="w-5 h-5" />
            <span className="font-medium">Media</span>
          </a>
          
          <a href="#" className="sidebar-item flex items-center space-x-3 p-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Pages</span>
          </a>
          
          <a href="#" className="sidebar-item flex items-center space-x-3 p-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Comments</span>
          </a>
          
          <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-3 mt-6 mb-2">Settings</h4>
          
          <a href="#" className="sidebar-item flex items-center space-x-3 p-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <Settings className="w-5 h-5" />
            <span className="font-medium">General</span>
          </a>
          
          <a href="#" className="sidebar-item flex items-center space-x-3 p-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Permissions</span>
          </a>
        </nav>

        {/* User Profile & Dark Mode Toggle */}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="relative">
              <img 
                src="../../public/images/ashu1.jpg" 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full ring-2 ring-blue-500"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">Ayesha Madhushani</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Games */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Total Games</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{gameCount}</h3>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Gamepad2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                <span className="text-green-600 dark:text-green-400 font-medium">+4%</span>
                from last month
              </p>
            </div>

            {/* Active Users */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Active Users</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{userCount}</h3>
                </div>
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                <span className="text-green-600 dark:text-green-400 font-medium">+8% </span>
                from last month
              </p>
            </div>

            {/* Total Revenue */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">$24,890</h3>
                </div>
                <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <ShoppingBag className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                <span className="text-green-600 dark:text-green-400 font-medium">+23% </span>
                from last month
              </p>
            </div>

            {/* New Comments */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">New Comments</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">142</h3>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                <span className="text-green-600 dark:text-green-400 font-medium">+3% </span>
                from last month
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
