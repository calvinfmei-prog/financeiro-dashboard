import {
  BarChart3,
  Bot,
  CreditCard,
  Users,
  LineChart,
  PiggyBank,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Lançamento em segundos",
    description:
      "Registre gastos e receitas direto pelo Telegram, sem abrir planilhas ou preencher telas demoradas.",
  },
  {
    icon: BarChart3,
    title: "Clareza para gastar melhor",
    description:
      "Veja quanto ainda pode gastar hoje, quanto está disponível no mês e para onde seu dinheiro está indo.",
  },
  {
    icon: PiggyBank,
    title: "Foco em crescimento",
    description:
      "Mais do que controlar despesas, o Financeiro ajuda você a pensar em investimento, patrimônio e evolução.",
  },
  {
    icon: Users,
    title: "Uso individual ou em família",
    description:
      "Controle sozinho ou compartilhe com sua família, mantendo todos os lançamentos organizados no mesmo grupo.",
  },
  {
    icon: CreditCard,
    title: "Cartões e fixas no controle",
    description:
      "Acompanhe gastos fixos, compras no cartão e vencimentos sem perder a visão real do seu orçamento.",
  },
  {
    icon: LineChart,
    title: "Dashboard profissional",
    description:
      "Visualize categorias, relatórios, saldo, cartões e patrimônio em uma interface moderna e fácil de entender.",
  },
];

export default function Features() {
  return (
    <section className="bg-white px-6 py-24 text-slate-950 dark:bg-slate-950 dark:text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Funcionalidades
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            Tudo que você precisa para sair do controle financeiro tradicional.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            O Financeiro foi criado para transformar registros simples em
            decisões inteligentes. Você não apenas vê entradas e saídas: você
            entende quanto pode gastar, quanto deveria investir e como seu
            patrimônio está evoluindo.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-300">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}