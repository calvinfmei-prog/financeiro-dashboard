import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "E-mail não informado." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    const { data: appUser, error } = await admin
      .from("app_users")
      .select("name,email,link_code,telegram_id")
      .eq("email", email)
      .single();

    if (error || !appUser) {
      return NextResponse.json(
        { error: "Perfil não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      linked: Boolean(appUser.telegram_id),
      name: appUser.name,
      email: appUser.email,
      linkCode: appUser.link_code,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao carregar onboarding." },
      { status: 500 }
    );
  }
}