import {
  Brain,
  CircleDollarSign,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";

const benefits = [
  {
    icon: Wallet,
    title: "Clareza para gastar",
    description:
      "Saiba quanto ainda pode gastar hoje sem comprometer o mês, suas contas e seus objetivos.",
  },
  {
    icon: PiggyBank,
    title: "Foco em investimento",
    description:
      "Entenda quanto pode separar para investir e transformar controle financeiro em crescimento real.",
  },
  {
    icon: Brain,
    title: "Decisões melhores",
    description:
      "Pare de descobrir o problema depois. Tome decisões antes de gastar, com dados claros na sua mão.",
  },
  {
    icon: TrendingUp,
    title: "Patrimônio em evolução",
    description:
      "Acompanhe sua evolução financeira e veja se seu dinheiro está realmente trabalhando por você.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-white px-6 py-24 text-slate-950 dark:bg-slate-950 dark:text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              Benefícios reais
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              O dinheiro precisa trabalhar para você.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              A Patria não foi criada para ser mais uma planilha bonita.
              Ela foi criado para ajudar pessoas e famílias a entenderem melhor
              o dinheiro, tomarem decisões mais inteligentes e construírem
              patrimônio com consistência.
            </p>

            <div className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                  <CircleDollarSign className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Pare de se perguntar para onde o dinheiro foi.
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    Comece a decidir para onde ele vai. Essa é a diferença entre
                    apenas registrar gastos e assumir o controle da sua evolução
                    financeira.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl dark:border dark:border-white/10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold">
                O verdadeiro objetivo não é controlar dinheiro.
                <span className="text-emerald-400">
                  {" "}
                  É construir liberdade financeira.
                </span>
              </h3>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                Quando você sabe quanto pode gastar, quanto precisa reservar e
                como seu patrimônio está evoluindo, o dinheiro deixa de ser uma
                fonte de ansiedade e passa a ser uma ferramenta de crescimento.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>

              <p className="text-4xl font-bold text-emerald-400">+ clareza</p>

              <p className="mt-3 leading-7 text-slate-300">
                Para decidir, gastar, investir e crescer com segurança.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}