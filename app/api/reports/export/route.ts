import React from "react";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { pdf } from "@react-pdf/renderer";
import FinancialReportPDF from "@/app/components/pdf/financial-report-pdf";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString("pt-BR");
}

function csvEscape(value: unknown) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    stream.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    stream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    stream.on("error", reject);
  });
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "csv";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { data: appUser } = await adminSupabase
    .from("app_users")
    .select("id, name, email")
    .eq("email", user.email)
    .single();

  if (!appUser) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  const { data: member } = await adminSupabase
    .from("group_members")
    .select("group_id")
    .eq("user_id", appUser.id)
    .eq("active", true)
    .single();

  if (!member) {
    return NextResponse.json(
      { error: "Família não encontrada" },
      { status: 404 }
    );
  }

  const { data: ciclo } = await adminSupabase
    .from("cycles")
    .select("cycle, starting_balance")
    .eq("group_id", member.group_id)
    .eq("active", true)
    .single();

  if (!ciclo) {
    return NextResponse.json(
      { error: "Ciclo ativo não encontrado" },
      { status: 404 }
    );
  }

  const { data: transactions, error: transactionsError } = await adminSupabase
    .from("transactions")
    .select("id, created_at, cycle, description, type, amount, category, user_id")
    .eq("group_id", member.group_id)
    .eq("cycle", ciclo.cycle)
    .order("created_at", { ascending: true });

  if (transactionsError) {
    console.error("Erro ao buscar transações:", transactionsError);
  }

  const { data: fixedExpenses } = await adminSupabase
    .from("fixed_expenses")
    .select("description, amount, due_day, active")
    .eq("group_id", member.group_id)
    .eq("active", true)
    .order("due_day", { ascending: true });

  const { data: cardInstallments } = await adminSupabase
    .from("card_installments")
    .select(
      "description, amount, current_installment, total_installments, active"
    )
    .eq("group_id", member.group_id)
    .eq("active", true);

  const userIds = [
    ...new Set((transactions ?? []).map((item) => item.user_id).filter(Boolean)),
  ];

  const { data: users } =
    userIds.length > 0
      ? await adminSupabase
          .from("app_users")
          .select("id, name")
          .in("id", userIds)
      : { data: [] };

  const usersMap = new Map((users ?? []).map((user) => [user.id, user.name]));

  const receitas = (transactions ?? [])
    .filter((item) => item.type === "entrada")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const despesas = (transactions ?? [])
    .filter((item) => item.type === "saida")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const fixas = (fixedExpenses ?? []).reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const cartao = (cardInstallments ?? []).reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const saldoInicial = Number(ciclo.starting_balance || 0);
  const saldoDisponivel = saldoInicial + receitas - despesas - fixas - cartao;

  if (format === "pdf") {
    
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const logoBuffer = fs.readFileSync(logoPath);
    const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;
    const pdfStream = await pdf(
      React.createElement(FinancialReportPDF as React.ComponentType<any>, {
        appUser,
        ciclo,
        transactions: transactions ?? [],
        fixedExpenses: fixedExpenses ?? [],
        cardInstallments: cardInstallments ?? [],
        usersMap: Object.fromEntries(usersMap),
        logo: logoBase64,
        resumo: {
          saldoInicial,
          receitas,
          despesas,
          fixas,
          cartao,
          saldoDisponivel,
        },
      })
    ).toBuffer();

    const pdfBuffer = await streamToBuffer(pdfStream as NodeJS.ReadableStream);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="relatorio-financeiro-${ciclo.cycle}.pdf"`,
      },
    });
  }

  if (format === "csv") {
    const rows = [
      ["RELATÓRIO FINANCEIRO"],
      ["Usuário", appUser.name],
      ["Ciclo", ciclo.cycle],
      [],
      ["RESUMO"],
      ["Saldo inicial", formatBRL(saldoInicial)],
      ["Receitas", formatBRL(receitas)],
      ["Despesas", formatBRL(despesas)],
      ["Fixas", formatBRL(fixas)],
      ["Cartão", formatBRL(cartao)],
      ["Saldo disponível", formatBRL(saldoDisponivel)],
      [],
      ["TRANSAÇÕES"],
      [
        "Criado em",
        "Ciclo",
        "Descrição",
        "Tipo",
        "Categoria",
        "Valor",
        "Lançado por",
      ],
      ...(transactions ?? []).map((item) => [
        formatDate(item.created_at),
        item.cycle,
        item.description,
        item.type,
        item.category || "Sem categoria",
        formatBRL(Number(item.amount || 0)),
        usersMap.get(item.user_id) || "-",
      ]),
      [],
      ["DESPESAS FIXAS"],
      ["Descrição", "Dia vencimento", "Valor", "Status"],
      ...(fixedExpenses ?? []).map((item) => [
        item.description,
        item.due_day,
        formatBRL(Number(item.amount || 0)),
        item.active ? "Ativa" : "Inativa",
      ]),
      [],
      ["CARTÃO"],
      ["Descrição", "Parcela", "Total parcelas", "Valor", "Status"],
      ...(cardInstallments ?? []).map((item) => [
        item.description,
        item.current_installment,
        item.total_installments,
        formatBRL(Number(item.amount || 0)),
        item.active ? "Ativa" : "Inativa",
      ]),
    ];

    const csv = rows.map((row) => row.map(csvEscape).join(";")).join("\n");

    return new NextResponse("\uFEFF" + csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="relatorio-financeiro-${ciclo.cycle}.csv"`,
      },
    });
  }

  return NextResponse.json({ error: "Formato não suportado" }, { status: 400 });
}