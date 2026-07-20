"use client";

import { useEffect, useState } from "react";

const lightTheme = {
  pageBg: "bg-slate-50 text-slate-950",
};

const darkTheme = {
  pageBg: "bg-slate-950 text-white",
};

export function useTheme() {
  const [darkMode, setDarkModeState] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const shouldUseDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDarkModeState(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    setThemeLoaded(true);
  }, []);

  function setDarkMode(value: boolean) {
    setDarkModeState(value);
    document.documentElement.classList.toggle("dark", value);
    localStorage.setItem("theme", value ? "dark" : "light");
  }

  return {
    isDark: darkMode,
    darkMode,
    setDarkMode,
    themeLoaded,
    theme: darkMode ? darkTheme : lightTheme,
  };
}