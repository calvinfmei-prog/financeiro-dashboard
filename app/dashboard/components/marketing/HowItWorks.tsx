import {
  UserPlus,
  Link2,
  Bot,
  LayoutDashboard,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Crie sua conta",
    description:
      "Cadastre seu nome, e-mail e senha em poucos segundos para iniciar sua jornada financeira.",
  },
  {
    icon: Link2,
    title: "Conecte seu Telegram",
    description:
      "Receba um código exclusivo e vincule sua conta ao bot com apenas um comando.",
  },
  {
    icon: Bot,
    title: "Registre pelo Telegram",
    description:
      "Lance gastos e receitas naturalmente, como se estivesse conversando em um chat.",
  },
  {
    icon: LayoutDashboard,
    title: "Acompanhe sua evolução",
    description:
      "Visualize patrimônio, categorias, cartões, metas e relatórios em um Dashboard moderno.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="bg-white px-6 py-24 dark:bg-slate-950 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Como funciona
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            Em poucos minutos você já está organizando suas finanças.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Nada de configurações complicadas, planilhas ou cadastros enormes.
            A Patria foi pensada para ser simples de começar e poderoso no
            dia a dia.
          </p>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                    <Icon className="h-8 w-8" />
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      {index + 1}
                    </span>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-8 top-1/2 -translate-y-1/2 text-emerald-500">
                    <ArrowDown className="rotate-[-90deg] h-8 w-8" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-10 text-white shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold">
                Menos tempo anotando.
                <br />
                Mais tempo construindo patrimônio.
              </h3>

              <p className="mt-6 text-lg leading-8 text-emerald-50">
                Enquanto outros aplicativos apenas registram entradas e saídas,
                a Patria mostra quanto você ainda pode gastar, quanto
                deveria investir e como está evoluindo financeiramente.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 p-6 shadow-xl">
              <div className="mb-5 text-sm font-semibold text-emerald-400">
                Patria Bot
              </div>

              <div className="space-y-4 text-sm">
                <div className="ml-auto w-fit rounded-2xl bg-emerald-500 px-4 py-3 text-white">
                  g 87 restaurante
                </div>

                <div className="w-fit rounded-2xl bg-slate-800 px-4 py-3 text-slate-100">
                  ✅ Gasto registrado
                  <br />
                  Restaurante
                  <br />
                  R$ 87,00
                </div>

                <div className="rounded-2xl bg-slate-900 p-4 text-slate-300">
                  💰 Pode gastar hoje
                  <br />
                  <span className="text-2xl font-bold text-white">
                    R$ 81,00
                  </span>

                  <div className="mt-4" />

                  📈 Ideal para investir
                  <br />
                  <span className="text-2xl font-bold text-emerald-400">
                    R$ 950,00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}