"use client";

import { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";
import Sidebar from "./sidebar";
import Header from "./header";

type PageShellProps = {
  children: ReactNode;
  userName?: string;
  plan?: string;
  cycle?: string;
  title?: string;
  description?: string;
};

export default function PageShell({
  children,
  userName = "Usuário",
  plan = "free",
  cycle,
  title,
  description,
}: PageShellProps) {
  const { darkMode, setDarkMode, theme } = useTheme();

  return (
    <main className={`min-h-screen transition-colors ${theme.pageBg}`}>
      <div className="flex">
        <Sidebar darkMode={darkMode} plan={plan} />

        <section className="flex-1 p-5 md:p-8">
          <Header
            userName={userName}
            cycle={cycle || ""}
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode(!darkMode)}
          />

          {(title || description) && (
            <div className="mt-8 mb-8">
              {title && (
                <h1 className={darkMode ? "text-3xl font-bold text-white" : "text-3xl font-bold text-slate-900"}>
                  {title}
                </h1>
              )}

              {description && (
                <p className={darkMode ? "mt-2 text-sm text-slate-300" : "mt-2 text-sm text-slate-500"}>
                  {description}
                </p>
              )}
            </div>
          )}

          {children}
        </section>
      </div>
    </main>
  );
}