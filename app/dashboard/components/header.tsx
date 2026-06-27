"use client";

import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  userName: string;
  cycle: string;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({
  userName,
  cycle,
  darkMode,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <p
          className={`text-sm font-medium ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Bem-vindo de volta
        </p>

        <h2 className="text-3xl font-bold tracking-tight">
          Bom dia, {userName} 👋
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ${
            darkMode
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600"
          }`}
        >
          Ciclo atual: {cycle}
        </div>

        <button
          onClick={onToggleTheme}
          className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${
            darkMode
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700"
          }`}
          aria-label="Alternar tema"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}