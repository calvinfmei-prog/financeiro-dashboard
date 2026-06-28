"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, WalletCards } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function CadastroPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao criar conta.");
        return;
      }

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        router.push("/login");
        return;
      }

      router.push("/onboarding");
    } catch (error) {
      setErro("Não foi possível criar sua conta agora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center">
        <div className="grid w-full gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <Link href="/" className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
                <WalletCards className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xl font-bold">Financeiro</p>
                <p className="text-sm text-slate-400">
                  Inteligência financeira
                </p>
              </div>
            </Link>

            <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
              Comece sua jornada para construir patrimônio.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Crie sua conta, conecte seu Telegram e comece a registrar seus
              lançamentos em segundos.
            </p>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="font-semibold text-emerald-400">
                Depois do cadastro:
              </p>

              <ul className="mt-4 space-y-3 text-slate-300">
                <li>✅ Você receberá um código exclusivo</li>
                <li>✅ Vai vincular sua conta ao Telegram</li>
                <li>
                  ✅ Depois configurará saldo, família e primeiros lançamentos
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <form
              onSubmit={handleCadastro}
              className="rounded-[1.5rem] bg-slate-900 p-8"
            >
              <h2 className="text-2xl font-bold">Criar conta</h2>

              <p className="mt-2 text-sm text-slate-400">
                Preencha seus dados para começar.
              </p>

              {erro && (
                <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                  {erro}
                </div>
              )}

              <div className="mt-8 space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-300">
                    Nome
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Seu nome"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    placeholder="voce@email.com"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300">
                    Senha
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-6 py-4 font-bold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  <>
                    Criar minha conta
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>

              <p className="mt-6 text-center text-sm text-slate-400">
                Já tem conta?{" "}
                <Link href="/login" className="font-semibold text-emerald-400">
                  Entrar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}