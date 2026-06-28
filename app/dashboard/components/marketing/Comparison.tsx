import {
  XCircle,
  CheckCircle2,
  TrendingUp,
  Wallet,
  PiggyBank,
  Target,
} from "lucide-react";

const tradicional = [
  "Registra receitas e despesas",
  "Mostra apenas o saldo da conta",
  "Você decide sozinho quanto pode gastar",
  "Não orienta sobre investimentos",
  "Foco apenas em controle financeiro",
  "Processos lentos e repetitivos",
];

const financeiro = [
  "Lançamentos rápidos pelo Telegram",
  "Calcula automaticamente quanto pode gastar",
  "Mostra quanto deveria investir",
  "Acompanha o crescimento do patrimônio",
  "Ajuda na tomada de decisão financeira",
  "Dashboard moderno com informações em tempo real",
];

export default function Comparison() {
  return (
    <section className="bg-slate-100 px-6 py-24 dark:bg-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            O diferencial
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            A diferença está na forma de pensar.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            A maioria dos aplicativos apenas registra movimentações.
            O Financeiro foi criado para mostrar o que realmente importa:
            como fazer seu dinheiro trabalhar a seu favor.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">

          {/* Tradicional */}

          <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm dark:border-red-900 dark:bg-slate-950">

            <div className="mb-8 flex items-center gap-3">

              <XCircle className="h-10 w-10 text-red-500"/>

              <div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Controle Financeiro Tradicional
                </h3>

                <p className="text-slate-500 dark:text-slate-400">
                  Você registra tudo... mas continua sem saber o que fazer com seu dinheiro.
                </p>

              </div>

            </div>

            <div className="space-y-5">

              {tradicional.map((item) => (

                <div
                  key={item}
                  className="flex items-start gap-3"
                >

                  <XCircle className="mt-1 h-5 w-5 shrink-0 text-red-500"/>

                  <span className="text-slate-600 dark:text-slate-300">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Financeiro */}

          <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-500 to-emerald-600 p-10 text-white shadow-2xl">

            <div className="mb-8 flex items-center gap-3">

              <CheckCircle2 className="h-10 w-10"/>

              <div>

                <h3 className="text-2xl font-bold">
                  Financeiro
                </h3>

                <p className="text-emerald-100">
                  Muito além do controle financeiro.
                </p>

              </div>

            </div>

            <div className="space-y-5">

              {financeiro.map((item) => (

                <div
                  key={item}
                  className="flex items-start gap-3"
                >

                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0"/>

                  <span>
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Cards inferiores */}

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <Card
            icon={<Wallet className="h-8 w-8"/>}
            title="Quanto posso gastar?"
            description="O sistema calcula automaticamente seu limite diário de gastos."
          />

          <Card
            icon={<PiggyBank className="h-8 w-8"/>}
            title="Quanto devo investir?"
            description="Receba uma visão clara do quanto pode destinar para investimentos."
          />

          <Card
            icon={<TrendingUp className="h-8 w-8"/>}
            title="Meu patrimônio cresce?"
            description="Acompanhe sua evolução financeira mês após mês."
          />

          <Card
            icon={<Target className="h-8 w-8"/>}
            title="Estou perto das metas?"
            description="Visualize seu progresso e tome decisões melhores."
          />

        </div>

      </div>
    </section>
  );
}

function Card({
  icon,
  title,
  description,
}:{
  icon:React.ReactNode;
  title:string;
  description:string;
}){

  return(

    <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-950">

      <div className="mb-5 text-emerald-500">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
        {description}
      </p>

    </div>

  )

}