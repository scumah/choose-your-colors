import { useState, useEffect } from "react";

import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

import styles from "./themeToggler.module.css";

export default function ThemeToggler() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className={styles.toggler}>
      {theme === "dark" ? <FaSun /> : <FaMoon />}
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
