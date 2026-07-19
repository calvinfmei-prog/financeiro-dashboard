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
    <main
      className={`min-h-screen w-full overflow-x-hidden transition-colors ${theme.pageBg}`}
    >
      <div className="flex min-h-screen w-full">
        <Sidebar darkMode={darkMode} plan={plan} />

        <section className="min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-5 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <Header
              userName={userName}
              cycle={cycle || ""}
              darkMode={darkMode}
              onToggleTheme={() => setDarkMode(!darkMode)}
            />

            {(title || description) && (
              <div className="mb-5 mt-6 sm:mb-8 sm:mt-8">
                {title && (
                  <h1
                    className={`break-words text-2xl font-bold sm:text-3xl ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {title}
                  </h1>
                )}

                {description && (
                  <p
                    className={`mt-2 max-w-3xl text-sm leading-6 ${
                      darkMode ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {description}
                  </p>
                )}
              </div>
            )}

            <div className="min-w-0">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}