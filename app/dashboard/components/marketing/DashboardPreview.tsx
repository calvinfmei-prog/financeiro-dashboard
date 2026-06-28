"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  CreditCard,
  PieChart,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";

const metrics = [
  {
    title: "Patrimônio",
    value: "R$ 125.430",
    detail: "+12,8% este mês",
  },
  {
    title: "Disponível",
    value: "R$ 3.590",
    detail: "para usar com segurança",
  },
  {
    title: "Ideal para investir",
    value: "R$ 950",
    detail: "recomendação do mês",
  },
  {
    title: "Pode gastar hoje",
    value: "R$ 81",
    detail: "sem comprometer metas",
  },
];

const categories = [
  { name: "Alimentação", value: "R$ 1.240", percent: "32%" },
  { name: "Transporte", value: "R$ 620", percent: "16%" },
  { name: "Casa", value: "R$ 1.780", percent: "45%" },
  { name: "Lazer", value: "R$ 280", percent: "7%" },
];

export default function DashboardPreview() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.16),transparent_35%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            Visão inteligente
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Um Dashboard para enxergar o que realmente importa.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Mais do que listar gastos, o Financeiro organiza suas informações em
            indicadores claros para você entender sua vida financeira, tomar
            decisões melhores e construir patrimônio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 70 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur"
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="hidden rounded-full bg-slate-800 px-4 py-1 text-xs text-slate-400 sm:block">
                financeiro.app/dashboard
              </div>

              <div className="flex items-center gap-2 text-sm text-emerald-400">
                Online
                <motion.span
                  animate={{ scale: [1, 1.35, 1], opacity: [1, 0.55, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-emerald-400"
                />
              </div>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[260px_1fr]">
              <motion.aside
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="hidden rounded-3xl border border-white/10 bg-slate-950 p-5 lg:block"
              >
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <p className="font-bold">Financeiro</p>
                    <p className="text-xs text-slate-500">Dashboard</p>
                  </div>
                </div>

                <nav className="space-y-2 text-sm">
                  <MenuItem
                    active
                    icon={<BarChart3 className="h-4 w-4" />}
                    label="Resumo"
                    delay={0.45}
                  />
                  <MenuItem
                    icon={<PieChart className="h-4 w-4" />}
                    label="Categorias"
                    delay={0.55}
                  />
                  <MenuItem
                    icon={<CreditCard className="h-4 w-4" />}
                    label="Cartões"
                    delay={0.65}
                  />
                  <MenuItem
                    icon={<Target className="h-4 w-4" />}
                    label="Metas"
                    delay={0.75}
                  />
                  <MenuItem
                    icon={<TrendingUp className="h-4 w-4" />}
                    label="Investimentos"
                    delay={0.85}
                  />
                </nav>
              </motion.aside>

              <main className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.title}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.35 + index * 0.12,
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ y: -6, scale: 1.015 }}
                      className="rounded-3xl border border-white/10 bg-slate-950 p-5"
                    >
                      <p className="text-sm text-slate-400">{metric.title}</p>
                      <p className="mt-3 text-2xl font-bold">{metric.value}</p>
                      <p className="mt-2 text-sm text-emerald-400">
                        {metric.detail}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.75, duration: 0.65 }}
                    className="rounded-3xl border border-white/10 bg-slate-950 p-6"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">
                          Evolução do patrimônio
                        </p>
                        <h3 className="mt-1 text-xl font-bold">
                          Crescimento financeiro
                        </h3>
                      </div>

                      <motion.div
                        animate={{ y: [0, -4, 0], x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                      </motion.div>
                    </div>

                    <div className="flex h-64 items-end gap-3">
                      {[
                        38, 52, 48, 76, 88, 102, 128, 150, 172, 198, 230, 260,
                      ].map((height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          whileInView={{ height }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.85 + index * 0.055,
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex-1 rounded-t-xl bg-gradient-to-t from-emerald-600 to-emerald-300"
                        />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.65 }}
                    className="rounded-3xl border border-white/10 bg-slate-950 p-6"
                  >
                    <div className="mb-6">
                      <p className="text-sm text-slate-400">
                        Onde seu dinheiro está indo
                      </p>
                      <h3 className="mt-1 text-xl font-bold">
                        Gastos por categoria
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {categories.map((category, index) => (
                        <div key={category.name}>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-slate-300">
                              {category.name}
                            </span>
                            <span className="font-semibold text-white">
                              {category.value}
                            </span>
                          </div>

                          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: category.percent }}
                              viewport={{ once: true }}
                              transition={{
                                delay: 1 + index * 0.12,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="h-full rounded-full bg-emerald-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  <SmallInsight
                    title="Decisão inteligente"
                    description="Você ainda pode gastar R$ 81 hoje sem comprometer suas metas."
                    delay={1.05}
                  />

                  <SmallInsight
                    title="Investimento sugerido"
                    description="Este mês, o ideal seria reservar R$ 950 para crescimento patrimonial."
                    delay={1.18}
                  />

                  <SmallInsight
                    title="Alerta de cartão"
                    description="Sua fatura está dentro do previsto para o ciclo atual."
                    delay={1.31}
                  />
                </div>
              </main>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MenuItem({
  icon,
  label,
  active = false,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
        active
          ? "bg-emerald-500 text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </motion.div>
  );
}

function SmallInsight({
  title,
  description,
  delay,
}: {
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="rounded-3xl border border-white/10 bg-slate-950 p-6"
    >
      <p className="font-bold text-emerald-400">{title}</p>
      <p className="mt-3 leading-7 text-slate-300">{description}</p>
    </motion.div>
  );
}