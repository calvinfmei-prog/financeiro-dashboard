"use client";

import { motion } from "framer-motion";
import { Bot, Send, Smartphone, TrendingUp, Wallet } from "lucide-react";

export default function TelegramExperience() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-28 text-white lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.18),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
            Experiência real
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Registre como conversa. Veja como gestão.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            O Financeiro transforma uma simples mensagem no Telegram em dados
            organizados, indicadores inteligentes e decisões melhores.
          </p>
        </motion.div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="mx-auto w-full max-w-sm rounded-[2.5rem] border border-white/10 bg-slate-900 p-4 shadow-2xl"
          >
            <div className="rounded-[2rem] bg-slate-950 p-5">
              <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500">
                  <Bot className="h-6 w-6" />
                </div>

                <div>
                  <p className="font-bold">Financeiro Bot</p>
                  <p className="text-xs text-emerald-400">online agora</p>
                </div>
              </div>

              <div className="min-h-[420px] space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.45 }}
                  className="ml-auto max-w-[220px] rounded-2xl bg-blue-500 px-4 py-3 text-sm"
                >
                  g 58 mercado
                </motion.div>

                <Typing delay={0.75} />

                <motion.div
                  initial={{ opacity: 0, x: -35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.25, duration: 0.5 }}
                  className="max-w-[260px] rounded-2xl bg-slate-800 px-4 py-4 text-sm leading-6 text-slate-100"
                >
                  ✅ Gasto registrado
                  <br />
                  <span className="text-slate-400">Categoria:</span> Alimentação
                  <br />
                  <span className="text-slate-400">Valor:</span> R$ 58,00
                  <br />
                  <br />
                  💰 Disponível: R$ 2.842
                  <br />
                  📆 Pode gastar hoje: R$ 81
                  <br />
                  📈 Ideal para investir: R$ 950
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.85, duration: 0.45 }}
                  className="ml-auto max-w-[220px] rounded-2xl bg-blue-500 px-4 py-3 text-sm"
                >
                  resumo
                </motion.div>

                <Typing delay={2.2} />

                <motion.div
                  initial={{ opacity: 0, x: -35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.65, duration: 0.5 }}
                  className="max-w-[260px] rounded-2xl bg-slate-800 px-4 py-4 text-sm leading-6 text-slate-100"
                >
                  📊 Resumo do mês
                  <br />
                  Entradas: R$ 7.500
                  <br />
                  Saídas: R$ 3.910
                  <br />
                  Saldo disponível: R$ 3.590
                </motion.div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-full bg-slate-900 px-4 py-3 text-sm text-slate-500">
                <span className="flex-1">Mensagem</span>
                <Send className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.75 }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Atualização automática</p>
                  <h3 className="mt-1 text-2xl font-bold">
                    Seu Dashboard entende o lançamento.
                  </h3>
                </div>

                <Smartphone className="h-8 w-8 text-blue-300" />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <LiveCard
                  icon={<Wallet className="h-5 w-5" />}
                  title="Disponível"
                  oldValue="R$ 2.900"
                  newValue="R$ 2.842"
                  delay={1.25}
                />

                <LiveCard
                  icon={<TrendingUp className="h-5 w-5" />}
                  title="Investir"
                  oldValue="R$ 950"
                  newValue="R$ 950"
                  delay={1.45}
                />

                <LiveCard
                  icon={<Bot className="h-5 w-5" />}
                  title="Categoria"
                  oldValue="—"
                  newValue="Alimentação"
                  delay={1.65}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">Gastos por categoria</p>
              <h3 className="mt-1 text-2xl font-bold">Alimentação atualizada</h3>

              <div className="mt-8 space-y-5">
                <CategoryBar label="Alimentação" width="68%" delay={1.55} />
                <CategoryBar label="Transporte" width="38%" delay={1.7} />
                <CategoryBar label="Casa" width="54%" delay={1.85} />
                <CategoryBar label="Lazer" width="24%" delay={2} />
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/10 p-6">
              <h3 className="text-2xl font-bold text-emerald-300">
                Sem planilha. Sem complicação.
              </h3>

              <p className="mt-4 leading-8 text-slate-300">
                Você lança naturalmente pelo Telegram, e o Financeiro organiza
                tudo em uma visão profissional para decisões mais inteligentes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Typing({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: [0, 1, 1, 0] }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: 0.9,
        times: [0, 0.2, 0.8, 1],
      }}
      className="flex w-fit items-center gap-1 rounded-2xl bg-slate-800 px-4 py-3"
    >
      {[0, 1, 2].map((item) => (
        <motion.span
          key={item}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: item * 0.12,
          }}
          className="h-2 w-2 rounded-full bg-slate-400"
        />
      ))}
    </motion.div>
  );
}

function LiveCard({
  icon,
  title,
  oldValue,
  newValue,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  oldValue: string;
  newValue: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      className="rounded-3xl bg-slate-950 p-5"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300">
        {icon}
      </div>

      <p className="text-sm text-slate-400">{title}</p>

      <p className="mt-3 text-sm text-slate-500 line-through">{oldValue}</p>

      <motion.p
        initial={{ color: "#ffffff" }}
        whileInView={{ color: "#34d399" }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.25, duration: 0.35 }}
        className="mt-1 text-xl font-bold"
      >
        {newValue}
      </motion.p>
    </motion.div>
  );
}

function CategoryBar({
  label,
  width,
  delay,
}: {
  label: string;
  width: string;
  delay: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-500">{width}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400"
        />
      </div>
    </div>
  );
}