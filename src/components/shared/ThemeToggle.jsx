import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <FaMoon className="h-5 w-5" />
      ) : (
        <FaSun className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
