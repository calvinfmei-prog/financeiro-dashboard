import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { config } from "@/lib/config";

function addMonths(months: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toISOString();
}

export async function POST(request: Request) {
  console.log("WEBHOOK ASAAS RECEBIDO");
  const admin = createAdminClient();

  try {
    const token = request.headers.get("asaas-access-token");
    const expectedToken = config.asaas.webhookToken;

    if (expectedToken && token !== expectedToken) {
      return NextResponse.json(
        { error: "Webhook não autorizado." },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("BODY ASAAS:", body);

    const event = body.event;
    const payment = body.payment || {};
    const subscription = body.subscription || {};

    const paymentId = payment.id || null;
    const subscriptionId =
      payment.subscription || subscription.id || null;

    const customerId =
      payment.customer || subscription.customer || null;

    const externalReference =
      payment.externalReference || subscription.externalReference || null;

    const { data: savedEvent, error: saveError } = await admin
      .from("payment_events")
      .insert({
        provider: "asaas",
        event,
        payment_id: paymentId,
        subscription_id: subscriptionId,
        customer_id: customerId,
        external_reference: externalReference,
        payload: body,
      })
      .select("id")
      .single();

    if (saveError || !savedEvent) {
      console.error("Erro ao salvar webhook:", saveError);
      return NextResponse.json(
        { error: "Erro ao salvar webhook." },
        { status: 500 }
      );
    }

    let appUserId: string | null = null;

    if (externalReference && String(externalReference).includes(":")) {
      appUserId = String(externalReference).split(":")[0];
    }

    let query = admin
      .from("app_users")
      .select("id, plan, plan_cycle");

    if (appUserId) {
      query = query.eq("id", appUserId);
    } else if (subscriptionId) {
      query = query.eq("asaas_subscription_id", subscriptionId);
    } else {
      await admin
        .from("payment_events")
        .update({
          processed: true,
          processed_at: new Date().toISOString(),
        })
        .eq("id", savedEvent.id);

      return NextResponse.json({ received: true });
    }

    const { data: appUser } = await query.maybeSingle();

    if (!appUser) {
      await admin
        .from("payment_events")
        .update({
          processed: true,
          processing_error: "Usuário não encontrado para este webhook.",
          processed_at: new Date().toISOString(),
        })
        .eq("id", savedEvent.id);

      return NextResponse.json({ received: true });
    }

    if (event === "PAYMENT_RECEIVED" || event === "PAYMENT_CONFIRMED") {
      const expiresAt =
        appUser.plan_cycle === "yearly" ? addMonths(12) : addMonths(1);

      await admin
        .from("app_users")
        .update({
          access_status: "active",
          plan_started_at: new Date().toISOString(),
          plan_expires_at: expiresAt,
          last_payment_at: new Date().toISOString(),
          next_payment_at: expiresAt,
        })
        .eq("id", appUser.id);
    }

    if (
      event === "PAYMENT_OVERDUE" ||
      event === "PAYMENT_DELETED" ||
      event === "PAYMENT_REFUNDED"
    ) {
      await admin
        .from("app_users")
        .update({
          access_status: "expired",
        })
        .eq("id", appUser.id);
    }

    if (event === "SUBSCRIPTION_DELETED") {
      await admin
        .from("app_users")
        .update({
          access_status: "cancelled",
        })
        .eq("id", appUser.id);
    }

    await admin
      .from("payment_events")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq("id", savedEvent.id);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook Asaas:", error);

    return NextResponse.json(
      { error: "Erro ao processar webhook." },
      { status: 500 }
    );
  }
}