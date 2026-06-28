import { HelpCircle } from "lucide-react";

const questions = [
  {
    question: "Preciso instalar algum aplicativo?",
    answer:
      "Não. Você usa o Telegram para lançar gastos e acessa o Dashboard pelo navegador, no celular ou computador.",
  },
  {
    question: "Posso usar sozinho?",
    answer:
      "Sim. Você pode criar um espaço financeiro individual ou usar em família, compartilhando lançamentos e visão financeira.",
  },
  {
    question: "Como funciona o vínculo com o Telegram?",
    answer:
      "Após criar sua conta, você recebe um código exclusivo. Basta enviar esse código para o bot no Telegram para conectar sua conta.",
  },
  {
    question: "Preciso abrir o Dashboard para registrar gastos?",
    answer:
      "Não. O lançamento pode ser feito direto pelo Telegram em poucos segundos. O Dashboard serve para visualizar, analisar e acompanhar sua evolução.",
  },
  {
    question: "O Financeiro mostra só entradas e saídas?",
    answer:
      "Não. A ideia é ir além do controle tradicional: mostrar quanto você pode gastar, quanto deveria investir e como seu patrimônio está evoluindo.",
  },
  {
    question: "Os dados ficam protegidos?",
    answer:
      "Sim. O acesso ao Dashboard usa autenticação, e o Telegram é vinculado por código exclusivo para proteger a conexão entre conta e bot.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-white px-6 py-24 text-slate-950 dark:bg-slate-950 dark:text-white lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Dúvidas frequentes
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Antes de começar, talvez você queira saber.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            O Financeiro foi pensado para ser simples no uso diário, mas
            completo na análise da sua vida financeira.
          </p>
        </div>

        <div className="mt-16 space-y-5">
          {questions.map((item) => (
            <div
              key={item.question}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <HelpCircle className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.question}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}