
// src/database/transaction.ts
import { pool } from "./query";
import type { PoolClient } from "pg";

/**
 * Executa uma função dentro de uma transação ACID.
 *
 * - Suporta nível de isolamento configurável.
 * - Faz retry automático em SERIALIZABLE quando ocorrer concurrency abort (SQLSTATE '40001').
 *
 * @param fn       Função transacional que recebe o PoolClient.
 * @param options  Configurações: isolation level e número máx. de tentativas.
 */
export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>,
  options?: {
    isolation?: "read committed" | "repeatable read" | "serializable";
    maxRetries?: number; // apenas aplicável quando isolation = 'serializable'
    onRetry?: (attempt: number, err: unknown) => void; // callback opcional
  }
): Promise<T> {
  const isolation = (options?.isolation ?? "read committed").toLowerCase() as
    | "read committed"
    | "repeatable read"
    | "serializable";

  const maxRetries = options?.maxRetries ?? 3;

  let attempt = 0;
  // Em SERIALIZABLE, podemos precisar reexecutar a transação em caso de 40001
  const shouldRetry = () => isolation === "serializable" && attempt < maxRetries;

  while (true) {
    const client = await pool.connect();
    try {
      // BEGIN com nível de isolamento escolhido
      await client.query(
        isolation === "read committed"
          ? "BEGIN" // padrão do Postgres
          : `BEGIN ISOLATION LEVEL ${isolation.toUpperCase()}`
      );

      const result = await fn(client);

      await client.query("COMMIT");
      return result;
    } catch (error: any) {
      await client.query("ROLLBACK");

      // Detecta erro de serialização (SQLSTATE 40001) para retry
      const code = error?.code ?? error?.routine ?? "";
      const isSerializationFailure =
        code === "40001" ||
        (typeof error?.message === "string" &&
          error.message.toLowerCase().includes("could not serialize access"));

      if (isSerializationFailure && shouldRetry()) {
        attempt += 1;
        options?.onRetry?.(attempt, error);
        // Backoff simples para aliviar contenção
        await delay(50 * attempt);
        // Tenta novamente o loop
        continue;
      }

      // Sem retry aplicável: propagar erro
      throw error;
    } finally {
      client.release();
    }
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
