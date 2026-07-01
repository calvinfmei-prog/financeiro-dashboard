import { config } from "@/lib/config";

const ASAAS_API_URL =
  config.asaas.environment === "production"
    ? "https://api.asaas.com/v3"
    : "https://api-sandbox.asaas.com/v3";

type AsaasRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

export async function asaasRequest<T>(
  path: string,
  options: AsaasRequestOptions = {}
): Promise<T> {
  if (!config.asaas.apiKey) {
    throw new Error("ASAAS_API_KEY não configurada.");
  }

  const response = await fetch(`${ASAAS_API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      access_token: config.asaas.apiKey,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("Erro Asaas:", data);

    throw new Error(
      data?.errors?.[0]?.description || "Erro na API do Asaas."
    );
  }

  return data as T;
}