import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

type Transaction = {
  created_at: string;
  cycle: string;
  description: string;
  type: string;
  amount: number;
  category?: string | null;
  user_id: string;
};

type FixedExpense = {
  description: string;
  amount: number;
  due_day: number;
  active?: boolean;
};

type CardInstallment = {
  description: string;
  amount: number;
  current_installment: number;
  total_installments: number;
  active?: boolean;
};

type Props = {
  appUser: { name: string };
  ciclo: { cycle: string };
  logo: string;
  resumo: {
    saldoInicial: number;
    receitas: number;
    despesas: number;
    fixas: number;
    cartao: number;
    saldoDisponivel: number;
  };
  transactions: Transaction[];
  fixedExpenses: FixedExpense[];
  cardInstallments: CardInstallment[];
  usersMap: Record<string, string>;
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 9,
    fontFamily: "Helvetica",
    backgroundColor: "#f8fafc",
    color: "#0f172a",
  },

  hero: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 24,
    color: "#ffffff",
    marginBottom: 18,
  },

  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heroLeft: {
    width: "72%",
  },

  heroRight: {
    width: "28%",
    alignItems: "flex-end",
  },

  logo: {
    width: 82,
    height: 82,
    objectFit: "contain",
  },

  brand: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 6,
  },

  heroTitle: {
    fontSize: 13,
    color: "#cbd5e1",
    marginBottom: 12,
  },

  heroMeta: {
    fontSize: 9,
    color: "#cbd5e1",
    marginTop: 3,
  },

  section: {
    marginTop: 15,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 9,
    color: "#0f172a",
  },

  bigBalance: {
    backgroundColor: "#ecfdf5",
    borderColor: "#bbf7d0",
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 10,
  },

  bigBalanceNegative: {
    backgroundColor: "#fff1f2",
    borderColor: "#fecdd3",
  },

  bigBalanceLabel: {
    fontSize: 10,
    color: "#475569",
    marginBottom: 5,
  },

  bigBalanceValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#047857",
  },

  bigBalanceValueNegative: {
    color: "#be123c",
  },

  cardsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  card: {
    width: "32%",
    minHeight: 70,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 11,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  cardLabel: {
    fontSize: 8,
    color: "#64748b",
    marginBottom: 5,
  },

  cardValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
  },

  scoreBox: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  scoreNumber: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#0f172a",
  },

  scoreLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#047857",
  },

  healthBarBg: {
    height: 10,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    marginTop: 12,
  },

  healthBar: {
    height: 10,
    borderRadius: 20,
    backgroundColor: "#0f172a",
  },

  categoryBox: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 11,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 7,
  },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  progressBg: {
    height: 7,
    backgroundColor: "#e2e8f0",
    borderRadius: 20,
  },

  progressFill: {
    height: 7,
    backgroundColor: "#0f172a",
    borderRadius: 20,
  },

  analysisBox: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 10,
  },

  analysisTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6,
  },

  analysisText: {
    fontSize: 10,
    color: "#334155",
    lineHeight: 1.45,
  },

  table: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    overflow: "hidden",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
    minHeight: 26,
  },

  colDate: { width: "17%" },
  colDesc: { width: "31%" },
  colCategory: { width: "17%" },
  colUser: { width: "17%" },
  colValue: { width: "18%", textAlign: "right" },

  colFixedDesc: { width: "58%" },
  colFixedDue: { width: "18%", textAlign: "center" },
  colFixedValue: { width: "24%", textAlign: "right" },

  green: {
    color: "#047857",
    fontWeight: "bold",
  },

  red: {
    color: "#be123c",
    fontWeight: "bold",
  },

  muted: {
    color: "#64748b",
  },

  empty: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    color: "#64748b",
  },

  footer: {
    position: "absolute",
    bottom: 16,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#94a3b8",
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 7,
  },
});

function brl(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function percentage(value: number, total: number) {
  if (!total || total <= 0) return 0;
  return Math.round((value / total) * 100);
}

export default function FinancialReportPDF({
  appUser,
  ciclo,
  resumo,
  transactions,
  fixedExpenses,
  cardInstallments,
  usersMap,
  logo,
}: Props) {
  const generatedAt = new Date().toLocaleString("pt-BR");

  const expensesTransactions = transactions.filter((t) => t.type === "saida");

  const biggestTransaction = expensesTransactions
    .slice()
    .sort((a, b) => Number(b.amount) - Number(a.amount))[0];

  const categoryTotals = expensesTransactions.reduce<Record<string, number>>(
    (acc, item) => {
      const category = item.category || "Sem categoria";
      acc[category] = (acc[category] || 0) + Number(item.amount || 0);
      return acc;
    },
    {}
  );

  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const ticketMedio =
    expensesTransactions.length > 0
      ? resumo.despesas / expensesTransactions.length
      : 0;

  const percentualFixas = percentage(resumo.fixas, resumo.saldoInicial);
  const percentualCartao = percentage(resumo.cartao, resumo.saldoInicial);
  const percentualSaldo = percentage(resumo.saldoDisponivel, resumo.saldoInicial);

  let healthScore = 100;
  if (resumo.saldoDisponivel < 0) healthScore -= 35;
  if (percentualFixas > 50) healthScore -= 20;
  if (percentualCartao > 30) healthScore -= 15;
  if (resumo.despesas > resumo.receitas && resumo.receitas > 0) healthScore -= 15;

  healthScore = Math.max(Math.min(healthScore, 100), 0);

  const healthLabel =
    healthScore >= 80
      ? "Excelente"
      : healthScore >= 60
      ? "Boa"
      : healthScore >= 40
      ? "Atenção"
      : "Crítica";

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={styles.heroLeft}>
              <Text style={styles.brand}>Patria Financeiro</Text>
              <Text style={styles.heroTitle}>Relatório Financeiro Mensal</Text>
              <Text style={styles.heroMeta}>Ciclo: {ciclo.cycle}</Text>
              <Text style={styles.heroMeta}>Usuário: {appUser.name}</Text>
              <Text style={styles.heroMeta}>Emitido em: {generatedAt}</Text>
            </View>

            <View style={styles.heroRight}>
              <Image src={logo} style={styles.logo} />
            </View>
          </View>
        </View>

        <View
          style={[
            styles.bigBalance,
            resumo.saldoDisponivel < 0 ? styles.bigBalanceNegative : {},
          ]}
        >
          <Text style={styles.bigBalanceLabel}>Saldo disponível do ciclo</Text>
          <Text
            style={[
              styles.bigBalanceValue,
              resumo.saldoDisponivel < 0 ? styles.bigBalanceValueNegative : {},
            ]}
          >
            {brl(resumo.saldoDisponivel)}
          </Text>
          <Text style={styles.muted}>
            Representa aproximadamente {percentualSaldo}% do saldo inicial.
          </Text>
        </View>

        <View style={styles.cardsGrid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Saldo inicial</Text>
            <Text style={styles.cardValue}>{brl(resumo.saldoInicial)}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Receitas</Text>
            <Text style={styles.green}>{brl(resumo.receitas)}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Despesas</Text>
            <Text style={styles.red}>{brl(resumo.despesas)}</Text>
          </View>
        </View>

        <View style={styles.cardsGrid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Fixas</Text>
            <Text style={styles.cardValue}>{brl(resumo.fixas)}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Cartão</Text>
            <Text style={styles.cardValue}>{brl(resumo.cartao)}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Ticket médio</Text>
            <Text style={styles.cardValue}>{brl(ticketMedio)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Índice Patria</Text>

          <View style={styles.scoreBox}>
            <View style={styles.scoreRow}>
              <View>
                <Text style={styles.scoreNumber}>{healthScore}</Text>
                <Text style={styles.muted}>de 100 pontos</Text>
              </View>

              <Text style={styles.scoreLabel}>{healthLabel}</Text>
            </View>

            <View style={styles.healthBarBg}>
              <View style={[styles.healthBar, { width: `${healthScore}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Indicadores principais</Text>

          <View style={styles.cardsGrid}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Maior gasto</Text>
              <Text style={styles.cardValue}>
                {biggestTransaction?.description || "-"}
              </Text>
              <Text style={styles.red}>
                {biggestTransaction ? brl(Number(biggestTransaction.amount)) : brl(0)}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Lançamentos</Text>
              <Text style={styles.cardValue}>{transactions.length}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Maior categoria</Text>
              <Text style={styles.cardValue}>{topCategories[0]?.[0] || "-"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>Patria Financeiro • Documento gerado automaticamente</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>

      <Page size="A4" style={styles.page} wrap>
        <View style={styles.hero}>
          <Text style={styles.brand}>Análise financeira</Text>
          <Text style={styles.heroTitle}>Leitura consultiva do ciclo</Text>
          <Text style={styles.heroMeta}>Ciclo: {ciclo.cycle}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Situação geral</Text>

          <View style={styles.analysisBox}>
            <Text style={styles.analysisText}>
              Sua saúde financeira encontra-se em nível {healthLabel}. O saldo
              disponível permanece {resumo.saldoDisponivel >= 0 ? "positivo" : "negativo"} e
              representa aproximadamente {percentualSaldo}% do saldo inicial do
              ciclo.
            </Text>
          </View>

          <View style={styles.analysisBox}>
            <Text style={styles.analysisTitle}>Pontos de atenção</Text>
            <Text style={styles.analysisText}>
              Gastos fixos representam aproximadamente {percentualFixas}% do saldo
              inicial. Compras parceladas representam aproximadamente{" "}
              {percentualCartao}% do saldo inicial.
            </Text>
          </View>

          {biggestTransaction && (
            <View style={styles.analysisBox}>
              <Text style={styles.analysisTitle}>Maior gasto do ciclo</Text>
              <Text style={styles.analysisText}>
                O maior lançamento foi {biggestTransaction.description}, no valor
                de {brl(Number(biggestTransaction.amount))}. Esse gasto representa
                aproximadamente{" "}
                {percentage(Number(biggestTransaction.amount), resumo.despesas)}%
                das despesas registradas no ciclo.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top categorias</Text>

          {topCategories.length === 0 ? (
            <Text style={styles.empty}>Nenhuma categoria encontrada.</Text>
          ) : (
            topCategories.map(([category, value], index) => (
              <View key={category} style={styles.categoryBox}>
                <View style={styles.categoryRow}>
                  <Text>
                    {index + 1}. {category}
                  </Text>
                  <Text style={styles.cardValue}>{brl(value)}</Text>
                </View>

                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${percentage(value, resumo.despesas)}%` },
                    ]}
                  />
                </View>

                <Text style={styles.muted}>
                  {percentage(value, resumo.despesas)}% das despesas do ciclo
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendações</Text>

          <View style={styles.analysisBox}>
            <Text style={styles.analysisText}>
              Continue acompanhando os gastos por categoria para manter a clareza
              financeira do ciclo. Caso a categoria "Sem categoria" esteja entre
              as maiores, vale revisar os lançamentos para melhorar a qualidade das
              análises futuras.
            </Text>
          </View>

          <View style={styles.analysisBox}>
            <Text style={styles.analysisText}>
              Manter o saldo disponível positivo é um bom sinal de liquidez. O
              ideal é acompanhar principalmente o peso das despesas fixas e das
              compras parceladas sobre o saldo inicial.
            </Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>Patria Financeiro • Análise financeira</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>

      <Page size="A4" style={styles.page} wrap>
        <View style={styles.hero}>
          <Text style={styles.brand}>Extrato do ciclo</Text>
          <Text style={styles.heroTitle}>Transações registradas</Text>
          <Text style={styles.heroMeta}>Ciclo: {ciclo.cycle}</Text>
        </View>

        <View style={styles.section}>
          {transactions.length === 0 ? (
            <Text style={styles.empty}>Nenhuma transação encontrada.</Text>
          ) : (
            <View style={styles.table}>
              <View style={styles.tableHeader} fixed>
                <Text style={styles.colDate}>Data</Text>
                <Text style={styles.colDesc}>Descrição</Text>
                <Text style={styles.colCategory}>Categoria</Text>
                <Text style={styles.colUser}>Por</Text>
                <Text style={styles.colValue}>Valor</Text>
              </View>

              {transactions.map((item, index) => (
                <View key={index} style={styles.tableRow} wrap={false}>
                  <Text style={styles.colDate}>{formatDate(item.created_at)}</Text>
                  <Text style={styles.colDesc}>{item.description}</Text>
                  <Text style={styles.colCategory}>
                    {item.category || "Sem categoria"}
                  </Text>
                  <Text style={styles.colUser}>
                    {usersMap[item.user_id] || "-"}
                  </Text>
                  <Text
                    style={[
                      styles.colValue,
                      item.type === "entrada" ? styles.green : styles.red,
                    ]}
                  >
                    {item.type === "entrada" ? "+" : "-"}{" "}
                    {brl(Number(item.amount || 0))}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.footer} fixed>
          <Text>Patria Financeiro • Extrato financeiro</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>

      <Page size="A4" style={styles.page} wrap>
        <View style={styles.hero}>
          <Text style={styles.brand}>Compromissos financeiros</Text>
          <Text style={styles.heroTitle}>Fixas e compras parceladas</Text>
          <Text style={styles.heroMeta}>Ciclo: {ciclo.cycle}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Despesas fixas</Text>

          {fixedExpenses.length === 0 ? (
            <Text style={styles.empty}>Nenhuma despesa fixa ativa.</Text>
          ) : (
            <View style={styles.table}>
              <View style={styles.tableHeader} fixed>
                <Text style={styles.colFixedDesc}>Descrição</Text>
                <Text style={styles.colFixedDue}>Vencimento</Text>
                <Text style={styles.colFixedValue}>Valor</Text>
              </View>

              {fixedExpenses.map((item, index) => (
                <View key={index} style={styles.tableRow} wrap={false}>
                  <Text style={styles.colFixedDesc}>{item.description}</Text>
                  <Text style={styles.colFixedDue}>Dia {item.due_day}</Text>
                  <Text style={[styles.colFixedValue, styles.red]}>
                    {brl(Number(item.amount || 0))}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compras parceladas</Text>

          {cardInstallments.length === 0 ? (
            <Text style={styles.empty}>Nenhuma compra parcelada ativa.</Text>
          ) : (
            <View style={styles.table}>
              <View style={styles.tableHeader} fixed>
                <Text style={styles.colFixedDesc}>Descrição</Text>
                <Text style={styles.colFixedDue}>Parcela</Text>
                <Text style={styles.colFixedValue}>Valor mensal</Text>
              </View>

              {cardInstallments.map((item, index) => {
                const progress = percentage(
                  item.current_installment,
                  item.total_installments
                );

                return (
                  <View key={index} style={styles.tableRow} wrap={false}>
                    <View style={styles.colFixedDesc}>
                      <Text>{item.description}</Text>
                      <View style={styles.progressBg}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${progress}%` },
                          ]}
                        />
                      </View>
                    </View>

                    <Text style={styles.colFixedDue}>
                      {item.current_installment}/{item.total_installments}
                    </Text>

                    <Text style={[styles.colFixedValue, styles.red]}>
                      {brl(Number(item.amount || 0))}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.footer} fixed>
          <Text>Patria Financeiro • Compromissos financeiros</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}