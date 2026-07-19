"use client";

import { Moon, Sun } from "lucide-react";
import MobileMenu from "./mobile-menu";

interface HeaderProps {
  userName: string;
  cycle: string;
  darkMode: boolean;
  plan?: string | null;
  onToggleTheme: () => void;
}

export default function Header({
  userName,
  cycle,
  darkMode,
  plan,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex min-w-0 items-start gap-3">
        <MobileMenu darkMode={darkMode} plan={plan} />

        <div className="min-w-0">
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Bem-vindo de volta
          </p>

          <h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
            Bom dia, {userName} 👋
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div
          className={`max-w-full rounded-full px-4 py-2 text-sm font-medium shadow-sm ${
            darkMode
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600"
          }`}
        >
          Ciclo atual: {cycle}
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ${
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