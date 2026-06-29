"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CircleDollarSign,
  CreditCard,
  Wallet,
} from "lucide-react";

const problems = [
  {
    icon: Wallet,
    title: "No final do mês...",
    text: "Você olha a conta e se pergunta para onde foi o dinheiro.",
  },
  {
    icon: CircleDollarSign,
    title: "Você recebe bem...",
    text: "Mas nunca sobra o suficiente para investir ou construir patrimônio.",
  },
  {
    icon: CreditCard,
    title: "O cartão surpreende.",
    text: "A fatura chega e sempre parece maior do que você imaginava.",
  },
  {
    icon: AlertTriangle,
    title: "Você até controla.",
    text: "Mas continua sem saber quanto realmente pode gastar hoje.",
  },
];

export default function PainPoints() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 dark:bg-slate-950 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.06),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.08),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-300">
            Parece familiar?
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Você provavelmente já passou por isso.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            O problema normalmente não é falta de dinheiro.
            <br />
            É falta de clareza.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {problems.map((problem, index) => {
            const Icon = problem.icon;

            return (
              <motion.div
                key={problem.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900 dark:text-white">
                  {problem.title}
                </h3>

                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {problem.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.35,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-24 rounded-[2.5rem] bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-4xl font-bold sm:text-5xl">
            Chega de viver assim.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-emerald-50">
            Imagine abrir seu Dashboard e saber exatamente quanto ainda pode
            gastar, quanto deveria investir e como seu patrimônio está evoluindo.
          </p>

          <div className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-lg font-bold text-emerald-700 shadow-xl">
            É exatamente isso que a Patria faz.
          </div>
        </motion.div>
      </div>
    </section>
  );
}