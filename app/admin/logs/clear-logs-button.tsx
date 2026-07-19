"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClearLogsButton({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<
    "success" | "error" | null
  >(null);

  async function handleClearLogs() {
    if (disabled || loading) return;

    const confirmed = window.confirm(
      "Tem certeza de que deseja apagar todos os logs?\n\n" +
        "Essa ação é permanente e não poderá ser desfeita."
    );

    if (!confirmed) return;

    setLoading(true);
    setMessage(null);
    setMessageType(null);

    try {
      const response = await fetch("/api/admin/logs/clear", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Não foi possível limpar os logs."
        );
      }

      const quantidade = Number(data.deleted ?? 0);

      setMessage(
        quantidade === 1
          ? "1 log foi removido com sucesso."
          : `${quantidade} logs foram removidos com sucesso.`
      );

      setMessageType("success");

      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao limpar os logs."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <button
        type="button"
        onClick={handleClearLogs}
        disabled={disabled || loading}
        className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Limpando logs..." : "🗑 Limpar todos os logs"}
      </button>

      {message && (
        <p
          className={`max-w-sm text-sm ${
            messageType === "success"
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}