"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bot, CheckCircle2, Copy, Loader2, WalletCards } from "lucide-react";

type OnboardingData = {
  linkCode: string;
  email: string;
  name: string;
};

export default function OnboardingPage() {
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const response = await fetch("/api/onboarding");

        const result = await response.json();

        if (!response.ok) {
          setErro(result.error || "Não foi possível carregar o onboarding.");
          return;
        }

        setData(result);
      } catch (error) {
        setErro("Erro ao carregar onboarding.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  async function copiarComando() {
    if (!data?.linkCode) return;

    await navigator.clipboard.writeText(`/vincular ${data.linkCode}`);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <div className="rounded-[1.5rem] bg-slate-900 p-8 md:p-12">
            <Link href="/" className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
                <WalletCards className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xl font-bold">Financeiro</p>
                <p className="text-sm text-slate-400">
                  Vincular Telegram
                </p>
              </div>
            </Link>

            {loading && (
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 p-5 text-slate-300">
                <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
                Carregando seu código...
              </div>
            )}

            {!loading && erro && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-300">
                {erro}
              </div>
            )}

            {!loading && data && (
              <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
                <div>
                  <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                    Conta criada com sucesso
                  </span>

                  <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                    Agora conecte sua conta ao Telegram.
                  </h1>

                  <p className="mt-6 text-lg leading-8 text-slate-300">
                    Olá, {data.name}. Para começar a usar o Financeiro pelo
                    Telegram, envie o comando abaixo para o bot.
                  </p>

                  <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950 p-6">
                    <p className="text-sm text-slate-400">
                      Comando de vínculo:
                    </p>

                    <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <code className="text-xl font-bold text-emerald-400">
                        /vincular {data.linkCode}
                      </code>

                      <button
                        onClick={copiarComando}
                        className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-400"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="mr-2 h-5 w-5" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-5 w-5" />
                            Copiar
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4 text-slate-300">
                    <Step number="1" text="Abra o Telegram." />
                    <Step number="2" text="Entre no bot do Financeiro." />
                    <Step
                      number="3"
                      text="Envie o comando de vínculo mostrado acima."
                    />
                    <Step
                      number="4"
                      text="Depois disso, o bot iniciará sua configuração financeira."
                    />
                  </div>

                  <div className="mt-10">
                    <Link
                      href="/login"
                      className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      Já vinculei minha conta. Ir para login →
                    </Link>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-5">
                  <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500">
                      <Bot className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="font-bold">Financeiro Bot</p>
                      <p className="text-xs text-emerald-400">
                        aguardando vínculo
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="rounded-2xl bg-slate-800 px-4 py-3 text-slate-100">
                      👋 Bem-vindo ao Financeiro!
                      <br />
                      Envie seu código para conectar sua conta.
                    </div>

                    <div className="ml-auto max-w-[230px] rounded-2xl bg-emerald-500 px-4 py-3 text-white">
                      /vincular {data.linkCode}
                    </div>

                    <div className="rounded-2xl bg-slate-800 px-4 py-3 text-slate-100">
                      ✅ Conta vinculada!
                      <br />
                      Agora vamos configurar seu controle financeiro.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
        {number}
      </div>

      <p>{text}</p>
    </div>
  );
}