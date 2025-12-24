
// ./src/view/scr/pages/Financial.tsx
import React, { useEffect, useState } from "react";

/** Helpers de API com cookie HttpOnly (mesma origem): */
async function apiPost<T>(path: string, body: unknown ): Promise<T> {
  const res = await fetch("http://localhost:3000/financial/deposit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 🔥 obrigatório
     
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  console.log('data deposito:', data)
  if (!res.ok) {
    throw new Error(data?.error ?? `Erro ${res.status}`);
  }
  return data as T;
}
 
async function apiGet<T>(path: string, csrfToken?: string): Promise<T> {
  const res = await fetch(path, {
    method: "GET",
    credentials: "include",
    headers: {
      ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error ?? `Erro ${res.status}`);
  }
  return data as T;
}

/** Versão hardcoded simples para saldo (sem CSRF): */

async function apiGetBalance(): Promise<{ balance: number }> {

  const response = await fetch("http://localhost:3000/financial/balance", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 🔥 obrigatório
  });

  console.log("Resposta do servidor:", response);


  if (!response.ok) {
    throw new Error("Erro ao buscar saldo");
  }

  return response.json(); // { balance: number }
}

function formatCurrencyBRL(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

/** Componente simples no estilo do seu `Me` (carrega saldo ao montar) */
export const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const data = await apiGetBalance();
        setBalance(data.balance);
      } catch (err) {
        setError("Não foi possível carregar o saldo");
      } finally {
        setLoading(false);
      }
    };

    loadBalance();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <input type="text" value={balance !== null ? formatCurrencyBRL(balance) : ""} readOnly />
    </div>
  );
};

const FinancialPage: React.FC = () => {
  // Se você usa CSRF, pode ler de <meta name="csrf-token"> (opcional):
  const [csrfToken] = useState<string | undefined>(() => {
    const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
    return meta?.content || undefined;
  });

  /** Depósito */
  const [depAmount, setDepAmount] = useState<number>(0);
  const [entryId, setEntryId] = useState<string>(""); // idempotência opcional
  const [depLoading, setDepLoading] = useState(false);
  const [depError, setDepError] = useState<string | null>(null);
  const [depResult, setDepResult] = useState<any>(null);

  /** Saque */
  const [wdAmount, setWdAmount] = useState<number>(0);
  const [wdLoading, setWdLoading] = useState(false);
  const [wdError, setWdError] = useState<string | null>(null);
  const [wdResult, setWdResult] = useState<any>(null);

  /** Saldo sob demanda (botão) */
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  
  async function handleDeposit(e: React.FormEvent) {
    e.preventDefault();
    setDepError(null);
    setDepResult(null);
    setDepLoading(true);
    try {
      if (!depAmount || depAmount <= 0) throw new Error("Informe um valor válido para depósito.");
      const payload = entryId.trim() ? { amount: depAmount, entryId } : { amount: depAmount };
      const data = await apiPost<any>("/financial/deposit", payload );
      setDepResult(data);
    } catch (err: any) {
      setDepError(err.message ?? "Falha ao realizar depósito.");
    } finally {
      setDepLoading(false);
    }
  }

  async function handleWithdraw(e: React.FormEvent) {
    e.preventDefault();
    setWdError(null);
    setWdResult(null);
    setWdLoading(true);
    try {
      if (!wdAmount || wdAmount <= 0) throw new Error("Informe um valor válido para saque.");
      const data = await apiPost<any>("/financial/withdraw", { amount: wdAmount } );
      setWdResult(data);
    } catch (err: any) {
      setWdError(err.message ?? "Falha ao realizar saque.");
    } finally {
      setWdLoading(false);
    }
  }

  async function handleGetBalance() {
    setBalanceError(null);
    setBalanceLoading(true);
    try {
      const data = await apiGetBalance(); // ← AQUI: aguardar e setar número
      setBalance(data.balance);
    } catch (err: any) {
      setBalanceError(err.message ?? "Falha ao obter saldo.");
    } finally {
      setBalanceLoading(false);
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Financeiro</h1>
        <p>Operações autenticadas via cookie HttpOnly.</p>
      </header>

      <article>
        <header>
          <h2>Saldo</h2>
          <p>GET <code>/financial/balance</code></p>
        </header>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button onClick={handleGetBalance} aria-busy={balanceLoading}>
            {balanceLoading ? "Consultando…" : "Obter saldo"}
          </button>
          {balance !== null && <strong>{formatCurrencyBRL(balance)}</strong>}
        </div>

        {balanceError && <small role="alert" style={{ color: "var(--del-color)" }}>{balanceError}</small>}
      </article>

      <article>
        <header>
          <h2>Saldo (auto)</h2>
          <p>Carrega automaticamente ao montar (componente estilo "Me"):</p>
        </header>

        <Balance />

        <article>
          <header>
            <h2>Depósito</h2>
            <p>POST <code>/financial/deposit</code></p>
          </header>

          <form onSubmit={handleDeposit}>
            <label>
              Valor (R$)
              <input
                type="number"
                step="0.01"
                min="0"
                value={depAmount}
                onChange={(e) => setDepAmount(Number(e.target.value))}
                placeholder="Ex.: 100"
                required
              />
            </label>

            <details>
              <summary>Opções avançadas</summary>
              <label>
                entryId (idempotência, opcional)
                <input
                  type="text"
                  value={entryId}
                  onChange={(e) => setEntryId(e.target.value)}
                  placeholder="UUID estável para evitar duplicidade em retries"
                />
              </label>
              <small>
                Requer <code>UNIQUE(id)</code> em <code>ledger_entries</code> + <code>ON CONFLICT DO NOTHING</code> no backend
                para evitar duplicidade quando usar o mesmo <code>entryId</code>.
              </small>
            </details>

            <button type="submit" aria-busy={depLoading}>
              {depLoading ? "Processando…" : "Depositar"}
            </button>

            {depError && <small role="alert" style={{ color: "var(--del-color)" }}>{depError}</small>}
          </form>

          {depResult && (
            <section>
              <hgroup>
                <h3>Resultado</h3>
              </hgroup>
              <ul>
                <li><strong>Mensagem:</strong> {depResult.message}</li>
                <li><strong>Entry ID:</strong> {depResult.entry?.id}</li>
                <li><strong>Conta:</strong> {depResult.entry?.accountId}</li>
                <li><strong>Tipo:</strong> {depResult.entry?.type}</li>
                <li><strong>Valor:</strong> {formatCurrencyBRL(depResult.entry?.amount?.amount ?? depAmount)}</li>
                <li><strong>Data:</strong> {depResult.entry?.createdAt}</li>
              </ul>
              <pre style={{ maxWidth: "100%", overflowX: "auto" }}>
                {JSON.stringify(depResult, null, 2)}
              </pre>
            </section>
          )}
        </article>

        <article>
          <header>
            <h2>Saque</h2>
            <p>POST <code>/financial/withdraw</code></p>
          </header>

          <form onSubmit={handleWithdraw}>
            <label>
              Valor (R$)
              <input
                type="number"
                step="0.01"
                min="0"
                value={wdAmount}
                onChange={(e) => setWdAmount(Number(e.target.value))}
                placeholder="Ex.: 50.00"
                required
              />
            </label>

            <button type="submit" aria-busy={wdLoading}>
              {wdLoading ? "Processando…" : "Sacar"}
            </button>

            {wdError && <small role="alert" style={{ color: "var(--del-color)" }}>{wdError}</small>}
          </form>

          {wdResult && (
            <section>
              <hgroup>
                <h3>Resultado</h3>
              </hgroup>
              <pre style={{ maxWidth: "100%", overflowX: "auto" }}>
                {JSON.stringify(wdResult, null, 2)}
              </pre>
            </section>
          )}
        </article>


      </article>
    </main>
  );
};

export default FinancialPage;
