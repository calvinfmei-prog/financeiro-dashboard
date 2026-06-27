"use client";

import { useEffect, useState } from "react";

const lightTheme = {
  pageBg: "bg-slate-50 text-slate-950",
};

const darkTheme = {
  pageBg: "bg-slate-950 text-white",
};

export function useTheme() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldUseDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return {
    isDark: darkMode,
    darkMode,
    setDarkMode,
    theme: darkMode ? darkTheme : lightTheme,
  };
}