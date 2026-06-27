"use client";

import { CalendarDays } from "lucide-react";

type DueItem = {
  title: string;
  date: string;
  amount: string;
};

interface Props {
  dueItems: DueItem[];
  darkMode: boolean;
}

export default function DueItemsCard({ dueItems, darkMode }: Props) {
  const cardBg = darkMode
    ? "bg-slate-900 text-white"
    : "bg-white text-slate-950";

  const softBg = darkMode ? "bg-slate-800" : "bg-slate-50";
  const muted = darkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`rounded-[2rem] p-6 shadow-sm ${cardBg}`}>
      <div>
        <h3 className="text-lg font-bold">Próximos vencimentos</h3>
        <p className={`text-sm ${muted}`}>
          Contas fixas previstas para o ciclo.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {dueItems.length === 0 ? (
          <div className={`rounded-2xl p-4 text-sm ${softBg} ${muted}`}>
            Nenhum vencimento encontrado.
          </div>
        ) : (
          dueItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className={`flex items-center justify-between rounded-2xl p-4 ${softBg}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                    darkMode
                      ? "bg-blue-950 text-blue-300"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  <CalendarDays size={18} />
                </div>

                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className={`text-sm ${muted}`}>{item.date}</p>
                </div>
              </div>

              <p className="font-semibold">{item.amount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}