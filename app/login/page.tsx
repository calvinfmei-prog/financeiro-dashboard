"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setMessage(`Erro: ${error.message}`);
      return;
    }
    const approvalResponse = await fetch("/api/login-approval/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const approvalData = await approvalResponse.json();

    if (!approvalResponse.ok) {
      setMessage(`Erro: ${approvalData.error}`);
      return;
    }

    localStorage.setItem("approval_id", approvalData.approvalId);

    window.location.href = "/aguardando-aprovacao";
    
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">
          Acesse seu painel
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Informe seu e-mail para receber um link de acesso seguro.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="seuemail@exemplo.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Sua senha"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Entrar
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-slate-600">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}