import {
  ArrowDown,
  Bot,
  ChartNoAxesCombined,
  CreditCard,
  Goal,
  Landmark,
  LineChart,
  WalletCards,
} from "lucide-react";

const pillars = [
  {
    icon: WalletCards,
    title: "Controle diário",
    description: "Gastos, receitas, saldo disponível e quanto pode gastar hoje.",
  },
  {
    icon: CreditCard,
    title: "Cartões e fixas",
    description: "Faturas, vencimentos, gastos recorrentes e compromissos do mês.",
  },
  {
    icon: LineChart,
    title: "Patrimônio",
    description: "Acompanhamento da sua evolução financeira ao longo do tempo.",
  },
  {
    icon: Goal,
    title: "Metas",
    description: "Objetivos financeiros claros para transformar planos em progresso.",
  },
];

export default function Ecosystem() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            Ecossistema Financeiro
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Tudo conectado para transformar registros em crescimento.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            A Patria une Telegram, Dashboard, categorias, cartões,
            relatórios, metas e patrimônio em uma única experiência. Você
            registra com facilidade e acompanha sua evolução com clareza.
          </p>
        </div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur">
            <div className="rounded-3xl bg-slate-900 p-6">
              <FlowItem
                icon={<Bot className="h-7 w-7" />}
                title="Telegram"
                description="Registre gastos e receitas em segundos."
              />

              <Arrow />

              <FlowItem
                icon={<ChartNoAxesCombined className="h-7 w-7" />}
                title="Dashboard inteligente"
                description="Visualize indicadores, gráficos e relatórios."
              />

              <Arrow />

              <FlowItem
                icon={<Landmark className="h-7 w-7" />}
                title="Crescimento patrimonial"
                description="Use clareza financeira para tomar decisões melhores."
                highlight
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-bold">{pillar.title}</h3>

                  <p className="mt-4 leading-7 text-slate-300">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/10 p-8 text-center lg:p-12">
          <h3 className="text-3xl font-bold">
            A Patria não foi pensada para ser apenas um lugar onde você
            anota gastos.
          </h3>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-emerald-50">
            Ele foi criado para conectar sua rotina financeira, seus objetivos e
            sua evolução patrimonial. Do lançamento rápido no Telegram à visão
            completa no Dashboard, tudo trabalha junto para ajudar você a crescer
            financeiramente.
          </p>
        </div>
      </div>
    </section>
  );
}

function FlowItem({
  icon,
  title,
  description,
  highlight = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-6 ${
        highlight
          ? "border-emerald-400 bg-emerald-500 text-white"
          : "border-white/10 bg-slate-950"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            highlight ? "bg-white text-emerald-600" : "bg-emerald-500"
          }`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className={highlight ? "text-emerald-50" : "text-slate-300"}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center py-4 text-emerald-400">
      <ArrowDown className="h-8 w-8" />
    </div>
  );
}