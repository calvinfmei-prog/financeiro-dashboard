"use client";

import { Sparkles } from "lucide-react";

type Insight = {
  type: "info" | "category" | "success" | "warning";
  title: string;
  description: string;
};

interface Props {
  insights: Insight[];
  darkMode: boolean;
}

export default function InsightsCard({ insights, darkMode }: Props) {
  const cardBg = darkMode
    ? "bg-slate-900 text-white"
    : "bg-white text-slate-950";

  return (
    <div className={`rounded-[2rem] p-6 shadow-sm ${cardBg}`}>
      <div className="flex items-center gap-2">
        <Sparkles size={20} />
        <h3 className="text-lg font-bold">Insights</h3>
      </div>

      <div className="mt-5 space-y-4">
        {insights.map((item, index) => (
          <InsightItem
            key={`${item.title}-${index}`}
            insight={item}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
}

function InsightItem({
  insight,
  darkMode,
}: {
  insight: Insight;
  darkMode: boolean;
}) {
  const config = {
    info: {
      icon: "📅",
      light: "bg-blue-50 border-blue-100 text-blue-900",
      dark: "bg-blue-950/40 border-blue-900/50 text-blue-100",
    },
    category: {
      icon: "📊",
      light: "bg-violet-50 border-violet-100 text-violet-900",
      dark: "bg-violet-950/40 border-violet-900/50 text-violet-100",
    },
    success: {
      icon: "✅",
      light: "bg-emerald-50 border-emerald-100 text-emerald-900",
      dark: "bg-emerald-950/40 border-emerald-900/50 text-emerald-100",
    },
    warning: {
      icon: "⚠️",
      light: "bg-amber-50 border-amber-100 text-amber-900",
      dark: "bg-amber-950/40 border-amber-900/50 text-amber-100",
    },
  };

  const selected = config[insight.type];

  return (
    <div
      className={`rounded-2xl border p-4 ${
        darkMode ? selected.dark : selected.light
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="text-xl">{selected.icon}</div>

        <div>
          <p className="font-semibold">{insight.title}</p>
          <p className="mt-1 text-sm opacity-80">{insight.description}</p>
        </div>
      </div>
    </div>
  );
}