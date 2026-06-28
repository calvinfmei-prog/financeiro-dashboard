import {
  Bot,
  Database,
  Globe,
  Lock,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";

const technologies = [
  {
    icon: Bot,
    title: "Telegram Bot",
    description:
      "Lançamentos rápidos direto pelo Telegram, sem precisar abrir o Dashboard para registrar cada gasto.",
  },
  {
    icon: Database,
    title: "Supabase",
    description:
      "Banco de dados moderno para armazenar usuários, famílias, lançamentos, cartões, categorias e relatórios.",
  },
  {
    icon: Globe,
    title: "Dashboard Web",
    description:
      "Interface profissional acessível pelo navegador, com gráficos, indicadores e visão completa das finanças.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    description:
      "Login com autenticação, vínculo por código e controle de acesso para proteger os dados do usuário.",
  },
  {
    icon: RefreshCcw,
    title: "Sincronização",
    description:
      "Os lançamentos feitos pelo Telegram aparecem no Dashboard, mantendo tudo conectado em um só lugar.",
  },
  {
    icon: Zap,
    title: "Tempo real em breve",
    description:
      "Atualização instantânea do Dashboard após lançamentos, sem precisar atualizar a página manualmente.",
  },
];

export default function Technologies() {
  return (
    <section
      id="tecnologia"
      className="bg-slate-100 px-6 py-24 dark:bg-slate-900 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              Tecnologia
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Construído com tecnologia de ponta para simplificar sua vida
              financeira.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              O Financeiro une a praticidade do Telegram com a força de um
              Dashboard moderno. Você registra rápido, acompanha com clareza e
              toma decisões melhores com dados organizados em tempo real.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <MiniCard
                icon={<Lock className="h-5 w-5" />}
                title="Acesso protegido"
              />

              <MiniCard
                icon={<Smartphone className="h-5 w-5" />}
                title="Funciona no celular"
              />

              <MiniCard
                icon={<RefreshCcw className="h-5 w-5" />}
                title="Tudo conectado"
              />

              <MiniCard
                icon={<Zap className="h-5 w-5" />}
                title="Rápido no dia a dia"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {technologies.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
        {icon}
      </div>

      <span className="font-semibold">{title}</span>
    </div>
  );
}