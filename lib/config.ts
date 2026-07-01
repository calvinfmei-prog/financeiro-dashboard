function optional(name: string) {
  return process.env[name];
}

console.log("ASAAS_API_KEY:", process.env.ASAAS_API_KEY);

export const config = {
  app: {
    url:
      process.env.NEXT_PUBLIC_APP_URL ??
      "https://patriafinanceiro.vercel.app",
  },

  asaas: {
    apiKey: optional("ASAAS_API_KEY"),

    environment:
      process.env.ASAAS_ENVIRONMENT === "production"
        ? "production"
        : "sandbox",

    webhookToken: optional("ASAAS_WEBHOOK_TOKEN"),
  },
} as const;