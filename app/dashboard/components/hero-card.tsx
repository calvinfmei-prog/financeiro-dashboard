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
      className={`rounded-[2rem] p-6 shadow-xl lg:col-span-2 ${
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

      <p className="mt-4 text-5xl font-bold">{value}</p>

      <p
        className={`mt-4 text-sm ${
          darkMode ? "text-slate-600" : "text-slate-300"
        }`}
      >
        {description}
      </p>
    </div>
  );
}