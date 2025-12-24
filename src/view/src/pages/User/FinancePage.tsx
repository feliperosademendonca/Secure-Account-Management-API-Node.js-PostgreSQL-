//./


import { useEffect, useState } from "react";


useEffect(() => {
  fetch("http://localhost:3000/financial/balance")
    .then((r) => r.json())
    .then((data) => console.log("Front recebeu:", data))
    .catch((err) => console.error("Erro fetch:", err));
}, []);


type BalanceResponse = {
  balance: number; // ajuste se seu backend retornar outro formato
};

const FinanceBalance = () => {
  const [data, setData] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const response = await fetch("http://localhost:3000/financial/balance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // importante se usar cookie/JWT
        });

        if (!response.ok) {
          throw new Error("Falha ao carregar saldo");
        }

        console.log('responso:,' , response)
        const result: BalanceResponse = await response.json();
        setData(result.balance);
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
  if (data === null) return null;

  const formatCurrencyBRL = (n: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

  return (
    <div>
      <input type="text" value={formatCurrencyBRL(data)} readOnly />
    </div>
  );
};


export { FinanceBalance}