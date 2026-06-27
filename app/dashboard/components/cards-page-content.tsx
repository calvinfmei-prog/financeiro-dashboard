"use client";

import { CreditCard, Calculator } from "lucide-react";
import { useMemo, useState } from "react";

type Installment = {
  id: string;
  description: string;
  amount: string;
  rawAmount: number;
  currentInstallment: number;
  totalInstallments: number;
  progress: number;
};

interface Props {
  installments: Installment[];
  total: string;
}

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export default function CardsPageContent({ installments, total }: Props) {
  const [purchaseValue, setPurchaseValue] = useState("");
  const [installmentCount, setInstallmentCount] = useState("1");

  const simulation = useMemo(() => {
    const value = Number(purchaseValue.replace(",", "."));
    const count = Number(installmentCount);

    if (!value || !count || count <= 0) {
      return null;
    }

    return {
      installmentValue: value / count,
      totalValue: value,
      count,
    };
  }, [purchaseValue, installmentCount]);

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white xl:col-span-3">
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Total mensal no cartão
        </p>

        <h2 className="mt-3 text-5xl font-bold">{total}</h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
          Soma das parcelas ativas no ciclo atual.
        </p>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white xl:col-span-2">
        <div className="flex items-center gap-2">
          <CreditCard size={20} />
          <h2 className="text-lg font-bold">Parcelas ativas</h2>
        </div>

        <div className="mt-6 space-y-4">
          {installments.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              Nenhuma parcela ativa encontrada.
            </div>
          ) : (
            installments.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-slate-50 p-5 text-slate-950 dark:bg-slate-800 dark:text-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {item.description}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                      Parcela {item.currentInstallment} de{" "}
                      {item.totalInstallments}
                    </p>
                  </div>

                  <p className="font-bold text-slate-900 dark:text-white">
                    {item.amount}
                  </p>
                </div>

                <div className="mt-4 h-3 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-3 rounded-full bg-slate-950 dark:bg-white"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        <div className="flex items-center gap-2">
          <Calculator size={20} />
          <h2 className="text-lg font-bold">Simulador</h2>
        </div>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          Simule o impacto de uma compra parcelada.
        </p>

        <div className="mt-6 space-y-4">
          <input
            value={purchaseValue}
            onChange={(e) => setPurchaseValue(e.target.value)}
            placeholder="Valor da compra"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white"
          />

          <input
            value={installmentCount}
            onChange={(e) => setInstallmentCount(e.target.value)}
            placeholder="Quantidade de parcelas"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white"
          />

          {simulation && (
            <div className="rounded-2xl bg-slate-950 p-5 text-white dark:bg-slate-800">
              <p className="text-sm text-slate-300">Resultado</p>

              <p className="mt-2 text-2xl font-bold">
                {formatBRL(simulation.installmentValue)}
              </p>

              <p className="mt-1 text-sm text-slate-300">
                por mês em {simulation.count}x
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}