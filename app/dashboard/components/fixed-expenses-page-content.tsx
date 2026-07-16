"use client";

import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Loader2,
  Pencil,
  Plus,
  Power,
  PowerOff,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { FixedExpenseItem } from "../fixas/page";

interface FixedExpensesPageContentProps {
  initialExpenses: FixedExpenseItem[];
}

interface ExpenseFormData {
  description: string;
  amount: string;
  dueDay: string;
}

const emptyForm: ExpenseFormData = {
  description: "",
  amount: "",
  dueDay: "",
};

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

function normalizeMoney(value: string) {
  const normalized = value
    .trim()
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return Number(normalized);
}

export default function FixedExpensesPageContent({
  initialExpenses,
}: FixedExpensesPageContentProps) {
  const router = useRouter();

  const [expenses, setExpenses] =
    useState<FixedExpenseItem[]>(initialExpenses);

  const [form, setForm] = useState<ExpenseFormData>(emptyForm);
  const [editingExpense, setEditingExpense] =
    useState<FixedExpenseItem | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(
    null
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const activeExpenses = useMemo(
    () => expenses.filter((expense) => expense.active),
    [expenses]
  );

  const inactiveExpenses = useMemo(
    () => expenses.filter((expense) => !expense.active),
    [expenses]
  );

  const totalActive = useMemo(
    () =>
      activeExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
      ),
    [activeExpenses]
  );

  function clearMessages() {
    setErrorMessage("");
    setSuccessMessage("");
  }

  function openCreateModal() {
    clearMessages();
    setEditingExpense(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(expense: FixedExpenseItem) {
    clearMessages();
    setEditingExpense(expense);

    setForm({
      description: expense.description,
      amount: expense.amount.toFixed(2).replace(".", ","),
      dueDay: expense.dueDay?.toString() ?? "",
    });

    setModalOpen(true);
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setEditingExpense(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    clearMessages();

    const description = form.description.trim();
    const amount = normalizeMoney(form.amount);
    const dueDay = Number(form.dueDay);

    if (!description) {
      setErrorMessage("Informe a descrição do gasto fixo.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setErrorMessage("Informe um valor válido.");
      return;
    }

    if (!Number.isInteger(dueDay) || dueDay < 1 || dueDay > 31) {
      setErrorMessage("O vencimento deve ser um dia entre 1 e 31.");
      return;
    }

    setSaving(true);

    try {
      const isEditing = Boolean(editingExpense);

      const response = await fetch(
        isEditing
          ? `/api/fixed-expenses/${editingExpense?.id}`
          : "/api/fixed-expenses",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            amount,
            dueDay,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Não foi possível salvar o gasto fixo."
        );
      }

      if (isEditing) {
        setExpenses((current) =>
          current.map((expense) =>
            expense.id === data.expense.id
              ? data.expense
              : expense
          )
        );

        setSuccessMessage("Gasto fixo atualizado com sucesso.");
      } else {
        setExpenses((current) => [
          data.expense,
          ...current,
        ]);

        setSuccessMessage("Gasto fixo criado com sucesso.");
      }

      setModalOpen(false);
      setEditingExpense(null);
      setForm(emptyForm);

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o gasto fixo."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleExpense(expense: FixedExpenseItem) {
    clearMessages();
    setProcessingId(expense.id);

    try {
      const response = await fetch(
        `/api/fixed-expenses/${expense.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: !expense.active,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Não foi possível alterar o gasto fixo."
        );
      }

      setExpenses((current) =>
        current.map((item) =>
          item.id === expense.id ? data.expense : item
        )
      );

      setSuccessMessage(
        expense.active
          ? "Gasto fixo desativado."
          : "Gasto fixo ativado."
      );

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível alterar o gasto fixo."
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function deleteExpense(expense: FixedExpenseItem) {
    const confirmed = window.confirm(
      `Deseja excluir permanentemente o gasto fixo "${expense.description}"?`
    );

    if (!confirmed) {
      return;
    }

    clearMessages();
    setProcessingId(expense.id);

    try {
      const response = await fetch(
        `/api/fixed-expenses/${expense.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Não foi possível excluir o gasto fixo."
        );
      }

      setExpenses((current) =>
        current.filter((item) => item.id !== expense.id)
      );

      setSuccessMessage("Gasto fixo excluído permanentemente.");

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o gasto fixo."
      );
    } finally {
      setProcessingId(null);
    }
  }

  function renderExpenseCard(expense: FixedExpenseItem) {
    const processing = processingId === expense.id;

    return (
      <div
        key={expense.id}
        className={`rounded-[1.75rem] border p-5 shadow-sm transition ${
          expense.active
            ? "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            : "border-slate-200 bg-slate-50 opacity-70 dark:border-slate-800 dark:bg-slate-950"
        }`}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                {expense.description}
              </h3>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  expense.active
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {expense.active ? "Ativo" : "Inativo"}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={15} />
                Vencimento: dia {expense.dueDay ?? "-"}
              </span>

              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatBRL(expense.amount)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => openEditModal(expense)}
              disabled={processing}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Pencil size={15} />
              Editar
            </button>

            <button
              type="button"
              onClick={() => toggleExpense(expense)}
              disabled={processing}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {processing ? (
                <Loader2 size={15} className="animate-spin" />
              ) : expense.active ? (
                <PowerOff size={15} />
              ) : (
                <Power size={15} />
              )}

              {expense.active ? "Desativar" : "Ativar"}
            </button>

            <button
              type="button"
              onClick={() => deleteExpense(expense)}
              disabled={processing}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <Trash2 size={15} />
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {successMessage && (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300">
            <CheckCircle2 size={18} />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CircleDollarSign className="text-slate-500" size={22} />

            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
              Total mensal ativo
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {formatBRL(totalActive)}
            </h2>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CheckCircle2 className="text-slate-500" size={22} />

            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
              Gastos ativos
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {activeExpenses.length}
            </h2>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <PowerOff className="text-slate-500" size={22} />

            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
              Gastos inativos
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {inactiveExpenses.length}
            </h2>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Despesas recorrentes
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Os gastos ativos são descontados do saldo disponível.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <Plus size={18} />
              Novo gasto fixo
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {activeExpenses.length > 0 ? (
              activeExpenses.map(renderExpenseCard)
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center dark:border-slate-700">
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  Nenhum gasto fixo ativo.
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Cadastre despesas como aluguel, internet e mensalidades.
                </p>
              </div>
            )}
          </div>
        </div>

        {inactiveExpenses.length > 0 && (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Gastos inativos
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Estes itens não afetam o saldo disponível.
            </p>

            <div className="mt-6 space-y-3">
              {inactiveExpenses.map(renderExpenseCard)}
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingExpense
                    ? "Editar gasto fixo"
                    : "Novo gasto fixo"}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Informe a descrição, o valor e o dia do vencimento.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Descrição
                </label>

                <input
                  type="text"
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Ex.: Aluguel"
                  maxLength={120}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Valor
                  </label>

                  <input
                    type="text"
                    inputMode="decimal"
                    value={form.amount}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        amount: event.target.value,
                      }))
                    }
                    placeholder="0,00"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Dia do vencimento
                  </label>

                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={form.dueDay}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        dueDay: event.target.value,
                      }))
                    }
                    placeholder="10"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                  {errorMessage}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  {saving && (
                    <Loader2 size={17} className="animate-spin" />
                  )}

                  {editingExpense ? "Salvar alterações" : "Criar gasto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}