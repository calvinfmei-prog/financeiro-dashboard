"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]" />

      <div className="relative mx-auto grid min-h-[760px] max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-6 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300"
          >
            A plataforma de inteligência financeira.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Pare de apenas registrar gastos.{" "}
            <span className="text-emerald-400">
              Comece a construir patrimônio.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
          >
            Lance seus gastos pelo Telegram em segundos, visualize tudo em um
            dashboard profissional e descubra quanto pode gastar, quanto deve
            investir e como fazer seu dinheiro crescer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              Começar agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Ver como funciona
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-3"
          >
            <CheckItem text="Rápido de usar" />
            <CheckItem text="Feito para famílias" />
            <CheckItem text="Moderno e profissional" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-2xl bg-slate-900 p-5">
              <div className="mb-5 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <DashboardCard title="Patrimônio" value="R$ 125.430" delay={0.5} />
                <DashboardCard title="Disponível" value="R$ 3.590" delay={0.65} />
                <DashboardCard title="Investir" value="R$ 950" delay={0.8} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-5 rounded-2xl border border-white/10 bg-slate-950 p-5"
              >
                <p className="text-sm text-slate-400">Evolução do patrimônio</p>

                <div className="mt-6 flex h-40 items-end gap-3">
                  {[30, 45, 38, 60, 75, 72, 95, 120].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height }}
                      transition={{
                        delay: 1 + index * 0.07,
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex-1 rounded-t-lg bg-emerald-500/80"
                    />
                  ))}
                </div>
              </motion.div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InfoCard title="Pode gastar hoje" value="R$ 81,00" delay={1.2} />
                <InfoCard title="Meta do mês" value="72%" green delay={1.35} />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="absolute -bottom-10 -right-4 w-72 rounded-3xl border border-white/10 bg-slate-950 p-4 shadow-2xl"
          >
            <div className="mb-4 text-sm font-semibold text-emerald-400">
              Financeiro Bot
            </div>

            <div className="space-y-3 text-sm">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.35, duration: 0.45 }}
                className="ml-auto max-w-[180px] rounded-2xl bg-emerald-500 px-4 py-3 text-white"
              >
                g 52 mercado
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.45 }}
                className="max-w-[220px] rounded-2xl bg-slate-800 px-4 py-3 text-slate-100"
              >
                ✅ Gasto registrado
                <br />
                Mercado: R$ 52,00
                <br />
                <br />
                💰 Disponível: R$ 2.842
                <br />
                📆 Hoje: R$ 81
                <br />
                📈 Investir: R$ 950
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
      {text}
    </div>
  );
}

function DashboardCard({
  title,
  value,
  delay,
}: {
  title: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-slate-950 p-4"
    >
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-xl font-bold text-white">{value}</p>
    </motion.div>
  );
}

function InfoCard({
  title,
  value,
  green = false,
  delay,
}: {
  title: string;
  value: string;
  green?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-slate-950 p-5"
    >
      <p className="text-sm text-slate-400">{title}</p>
      <p
        className={`mt-2 text-2xl font-bold ${
          green ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}