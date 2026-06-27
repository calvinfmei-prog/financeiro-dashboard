"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

interface Category {
  name: string;
  Amount: number;
  value: number;
  amount: string;
  icon: string;
}

interface Props {
  categories: Category[];
  darkMode: boolean;
}

export default function CategoriesCard({
  categories,
  darkMode,
}: Props) {

  const cardBg = darkMode
    ? "bg-slate-900 text-white"
    : "bg-white text-slate-950";

  const muted = darkMode
    ? "text-slate-400"
    : "text-slate-500";

  const barBg = darkMode
    ? "bg-slate-800"
    : "bg-slate-100";

  const barFill = darkMode
    ? "bg-white"
    : "bg-slate-900";

  const COLORS = [
    "#2563eb",
    "#10b981",
    "#f97316",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
  ];

  return (
    <div
      className={`rounded-[2rem] p-6 shadow-sm xl:col-span-2 ${cardBg}`}
    >
      <div>
        <h3 className="text-lg font-bold">
          Gastos por categoria
        </h3>

        <p className={`text-sm ${muted}`}>
          Distribuição dos gastos deste ciclo.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        <div className="h-64">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={categories}
                dataKey="Amount"
                nameKey="name"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
              >

                {categories.map((_, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip
                formatter={(value) => {

                  return new Intl.NumberFormat(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  ).format(Number(value));

                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="space-y-5">

          {categories.map((category) => (

            <div key={category.name}>

              <div className="mb-2 flex justify-between text-sm">

                <span>

                  {category.icon} {category.name}

                </span>

                <span className={muted}>

                  {category.amount}

                </span>

              </div>

              <div className={`h-3 rounded-full ${barBg}`}>

                <div
                  className={`h-3 rounded-full ${barFill}`}
                  style={{
                    width: `${category.value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}