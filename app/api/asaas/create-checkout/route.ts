import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { asaasRequest } from "@/lib/asaas/client";
import { config } from "@/lib/config";

type PlanKey =
  | "individual_monthly"
  | "individual_yearly"
  | "patrimonio_monthly"
  | "patrimonio_yearly";

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
      return NextResponse.json({ error: "Plano inválido." }, { status: 400 });
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
      .select("id, name, email")
      .eq("auth_user_id", user.id)
      .single();

    if (appUserError || !appUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    const checkout = await asaasRequest<{
      id: string;
      url?: string;
      checkoutUrl?: string;
    }>("/checkouts", {
      method: "POST",
      body: {
        billingTypes: ["CREDIT_CARD"],
        chargeTypes: ["RECURRENT"],
        minutesToExpire: 1440,

        name: selectedPlan.description,
        description: selectedPlan.description,

        externalReference: `${appUser.id}:${planKey}`,


        items: [
          {
            name: selectedPlan.description,
            description: selectedPlan.description,
            quantity: 1,
            value: selectedPlan.value,
          },
        ],

        subscription: {
          cycle: selectedPlan.cycle,
          value: selectedPlan.value,
          nextDueDate: getNextDueDate(),
        },

        callback: {
          successUrl: `${config.app.url}/dashboard`,
          cancelUrl: `${config.app.url}/planos`,
          expiredUrl: `${config.app.url}/planos`,
        },
      },
    });

    await admin
      .from("app_users")
      .update({
        plan: selectedPlan.plan,
        plan_cycle: selectedPlan.planCycle,
        access_status: "pending_payment",
      })
      .eq("id", appUser.id);

    return NextResponse.json({
      success: true,
      checkoutId: checkout.id,
      checkoutUrl: checkout.url || checkout.checkoutUrl,
    });
  } catch (error) {
    console.error("ERRO CREATE CHECKOUT ASAAS:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao criar checkout no Asaas.",
      },
      { status: 500 }
    );
  }
}