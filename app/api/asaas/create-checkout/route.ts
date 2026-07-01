import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { asaasRequest } from "@/lib/asaas/client";
import { config } from "@/lib/config";

type PlanKey = "individual_monthly" | "individual_yearly" | "patrimonio_monthly" | "patrimonio_yearly";

const plans: Record<
  PlanKey,
  {
    plan: "individual" | "patrimonio";
    planCycle: "monthly" | "yearly";
    value: number;
    cycle: "MONTHLY" | "YEARLY";
    description: string;
  }
> = {
  individual_monthly: {
    plan: "individual",
    planCycle: "monthly",
    value: 14.9,
    cycle: "MONTHLY",
    description: "Patria Individual Mensal",
  },
  individual_yearly: {
    plan: "individual",
    planCycle: "yearly",
    value: 118.8,
    cycle: "YEARLY",
    description: "Patria Individual Anual",
  },
  patrimonio_monthly: {
    plan: "patrimonio",
    planCycle: "monthly",
    value: 29.9,
    cycle: "MONTHLY",
    description: "Patria Patrimônio Mensal",
  },
  patrimonio_yearly: {
    plan: "patrimonio",
    planCycle: "yearly",
    value: 238.8,
    cycle: "YEARLY",
    description: "Patria Patrimônio Anual",
  },
};

function getNextDueDate() {
  return new Date().toISOString().slice(0, 10);
}

export async function POST(request: Request) {
  try {
    const { planKey } = await request.json();

    if (!planKey || !plans[planKey as PlanKey]) {
      return NextResponse.json(
        { error: "Plano inválido." },
        { status: 400 }
      );
    }

    const selectedPlan = plans[planKey as PlanKey];

    const supabase = await createClient();
    const admin = createAdminClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const { data: appUser, error: appUserError } = await admin
      .from("app_users")
      .select("id, name, email, asaas_customer_id")
      .eq("auth_user_id", user.id)
      .single();

    if (appUserError || !appUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    let customerId = appUser.asaas_customer_id;

    if (!customerId) {
      const customer = await asaasRequest<{ id: string }>("/customers", {
        method: "POST",
        body: {
          name: appUser.name,
          email: appUser.email,
          externalReference: appUser.id,
        },
      });

      customerId = customer.id;

      await admin
        .from("app_users")
        .update({
          asaas_customer_id: customerId,
        })
        .eq("id", appUser.id);
    }

    const subscription = await asaasRequest<{
      id: string;
      invoiceUrl?: string;
      paymentLink?: string;
    }>("/subscriptions", {
      method: "POST",
      body: {
        customer: customerId,
        billingType: "UNDEFINED",
        value: selectedPlan.value,
        nextDueDate: getNextDueDate(),
        cycle: selectedPlan.cycle,
        description: selectedPlan.description,
        externalReference: `${appUser.id}:${planKey}`,
      },
    });

    await admin
      .from("app_users")
      .update({
        plan: selectedPlan.plan,
        plan_cycle: selectedPlan.planCycle,
        access_status: "pending_payment",
        asaas_subscription_id: subscription.id,
      })
      .eq("id", appUser.id);

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      checkoutUrl:
        subscription.invoiceUrl ||
        subscription.paymentLink ||
        "https://www.asaas.com/",
    });
  }  catch (error) {
            console.error("ERRO CREATE CHECKOUT ASAAS:", error);

            return NextResponse.json(
            {
                error:
                error instanceof Error
                    ? error.message
                    : "Erro ao criar assinatura no Asaas.",
            },
            { status: 500 }
            );
        }

    return NextResponse.json(
      { error: "Erro ao criar assinatura no Asaas." },
      { status: 500 }
    );
  }
