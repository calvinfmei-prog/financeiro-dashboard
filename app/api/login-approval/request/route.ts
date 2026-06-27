import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { error: "E-mail não informado." },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  const { data: appUser, error: userError } = await admin
    .from("app_users")
    .select("id, name, email, chat_id, telegram_id")
    .eq("email", email)
    .single();

  if (userError || !appUser) {
    return NextResponse.json(
      { error: "Usuário não encontrado." },
      { status: 404 }
    );
  }

  if (!appUser.chat_id) {
    return NextResponse.json(
      { error: "Usuário sem chat_id vinculado ao Telegram." },
      { status: 400 }
    );
  }

  const expiresAt = new Date(Date.now() + 2 * 60 * 1000).toISOString();

  const { data: approval, error: approvalError } = await admin
    .from("login_approvals")
    .insert({
      user_id: appUser.id,
      email,
      status: "pending",
      expires_at: expiresAt,
    })
    .select("id")
    .single();

  if (approvalError || !approval) {
    return NextResponse.json(
      { error: "Erro ao criar solicitação de acesso." },
      { status: 500 }
    );
  }

  const text =
    `🔐 Tentativa de acesso ao Painel Web\n\n` +
    `Usuário: ${appUser.name}\n` +
    `E-mail: ${email}\n\n` +
    `Foi você?`;

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: appUser.chat_id,
        text,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✅ Aprovar acesso",
                callback_data: `login_approve:${approval.id}`,
              },
              {
                text: "❌ Negar",
                callback_data: `login_deny:${approval.id}`,
              },
            ],
          ],
        },
      }),
    }
  );

  if (!telegramResponse.ok) {
    return NextResponse.json(
      { error: "Erro ao enviar mensagem no Telegram." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    approvalId: approval.id,
  });
}