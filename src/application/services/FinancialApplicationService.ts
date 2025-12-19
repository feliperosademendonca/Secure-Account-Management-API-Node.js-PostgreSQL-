// src/application/services/FinancialApplicationService.ts
import type { LedgerRepository } from "../contracts/LedgerRepository";
import { createDeposit } from "../../domain/finance/rules/createDeposit";
import { createWithdraw } from "../../domain/finance/rules/createWithdraw";
import { Money } from "../../domain/finance/value-objects/Money";
import { randomUUID } from "crypto";

export class FinancialApplicationService {
  constructor(
    private readonly ledgerRepository: LedgerRepository
  ) {}

  async deposit(params: {
    userId: string;
    accountId: string;
    amount: number;
  }): Promise<void> {
    // 🔐 aqui entra autorização (ex: validar conta do usuário)
    this.validateAmount(params.amount);

    const entry = createDeposit({
      id: randomUUID(),
      accountId: params.accountId,
      amount: new Money(params.amount),
    });

    await this.ledgerRepository.save(entry);
  }

  async withdraw(params: {
    userId: string;
    accountId: string;
    amount: number;
  }): Promise<void> {
    this.validateAmount(params.amount);

    const ledger = await this.ledgerRepository.findByAccountId(
      params.accountId
    );

    const entry = createWithdraw({
      id: randomUUID(),
      accountId: params.accountId,
      amount: new Money(params.amount),
      ledger,
    });

    await this.ledgerRepository.save(entry);
  }

  private validateAmount(amount: number) {
    if (!Number.isFinite(amount)) {
      throw new Error("Valor inválido");
    }
  }
}
