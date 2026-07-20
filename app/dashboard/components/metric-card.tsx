"use client";

import React from "react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  darkMode: boolean;
  subtitle?: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  darkMode,
  subtitle,
}: MetricCardProps) {
  return (
    <div
      className={`min-w-0 w-full rounded-[1.75rem] p-5 shadow-sm transition-all duration-300 sm:p-6 lg:hover:-translate-y-1 lg:hover:shadow-xl ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-950"
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
          darkMode ? "bg-slate-800" : "bg-slate-100"
        }`}
      >
        {icon}
      </div>

      <p
        className={`mt-5 text-sm ${
          darkMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {title}
      </p>

      <h3 className="mt-1 break-words text-2xl font-bold tracking-tight">
        {value}
      </h3>

      {subtitle && (
        <p
          className={`mt-2 text-xs ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}