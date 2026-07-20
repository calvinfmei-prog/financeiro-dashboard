"use client";

interface HeroCardProps {
  title: string;
  value: string;
  description: string;
  darkMode: boolean;
}

export default function HeroCard({
  title,
  value,
  description,
  darkMode,
}: HeroCardProps) {
  return (
    <div
      className={`min-w-0 w-full overflow-hidden rounded-[1.75rem] p-5 shadow-xl sm:p-6 lg:col-span-2 ${
        darkMode ? "bg-white text-slate-950" : "bg-slate-950 text-white"
      }`}
    >
      <p
        className={`text-sm ${
          darkMode ? "text-slate-600" : "text-slate-300"
        }`}
      >
        {title}
      </p>

      <p className="mt-3 break-words text-4xl font-bold tracking-tight sm:mt-4 sm:text-5xl">
        {value}
      </p>

      <p
        className={`mt-3 break-words text-sm leading-6 sm:mt-4 ${
          darkMode ? "text-slate-600" : "text-slate-300"
        }`}
      >
        {description}
      </p>
    </div>
  );
}