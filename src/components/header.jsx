import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`py-3 px-5 md:px-8 flex justify-between items-center fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-transparent backdrop-blur-md shadow-lg border-b border-purple-500/30"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => handleNavigation("/")}
      >
        <img
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-contain bg-purple-700/20 p-1"
          src="/images/logoss.png"
          alt="Game Logo"
        />
        <span className="hidden sm:block font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          <span className="text-2xl md:text-3xl">G</span>
          <span className="text-lg md:text-xl font-semibold">amerZone</span>
        </span>
      </div>

      <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
        {[
          { path: "/characters", icon: "bx-user-circle", label: "Gamer" },
          { path: "/arena", icon: "bx-diamond", label: "Arena" },
          { path: "/minigames", icon: "bx-chevrons-up", label: "MiniGame" },
          { path: "/shop", icon: "bx-store", label: "Shop" },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className="relative py-2 text-gray-300 hover:text-white transition-colors duration-300 group flex items-center gap-1"
          >
            <i className={`bx ${item.icon} text-xl`} />
            <span>{item.label}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}

        <button
          onClick={() => handleNavigation("/AdminLogin")}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 transition-all duration-300"
        >
          Admin
        </button>
        <button
          onClick={() => handleNavigation("/login")}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 transition-all duration-300"
        >
          Login
        </button>
      </nav>

      <button
        onClick={toggleMobileMenu}
        className="text-2xl p-2 md:hidden text-white bg-purple-700/30 rounded-lg hover:bg-purple-700/50 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        <i className={isMobileMenuOpen ? "bx bx-x" : "bx bx-menu"}></i>
      </button>

      <div
        id="MobileMenus"
        className={`fixed top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg shadow-xl border-t border-purple-500/30 transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col p-4 gap-2">
          {[
            { path: "/characters", icon: "bx-user-circle", label: "Gamer" },
            { path: "/arena", icon: "bx-diamond", label: "Arena" },
            { path: "/minigames", icon: "bx-chevrons-up", label: "MiniGame" },
            { path: "/shop", icon: "bx-store", label: "Shop" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center gap-3 py-3 px-4 text-white rounded-lg hover:bg-purple-700/30 transition-colors duration-200"
            >
              <i className={`bx ${item.icon} text-xl text-purple-400`} />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="flex flex-col gap-3 p-4 border-t border-gray-700 pt-4">
            <button
              className="bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-lg font-medium text-white hover:from-pink-400 hover:to-purple-400 transition-all duration-300"
            > <Link to="/UserProfile"></Link>
              Admin
            </button>
            <button
              onClick={() => handleNavigation("/login")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-lg font-medium text-white hover:from-blue-400 hover:to-purple-400 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
