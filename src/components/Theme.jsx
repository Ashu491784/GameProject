// ThemeToggle.jsx
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="cursor-pointer flex items-center gap-2 px-2 py-1 rounded border border-white dark:border-yellow-400">
        <span className={`${darkMode ? "hidden" : "block"}`}>🌙</span>
        <span className={`${darkMode ? "block" : "hidden"}`}>☀</span>
      </button>
    </div>
  );
};

export default ThemeToggle;