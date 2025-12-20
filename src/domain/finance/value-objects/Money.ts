//./src/domain/finance/value-objects/Money.ts

export class Money {
  constructor(public readonly amount: number) {
    if (amount < 0) {
      throw new Error("Valor monetário não pode ser negativo");
    }
  }

  add(value: Money): Money {
    return new Money(this.amount + value.amount);
  }

  subtract(value: Money): Money {
    if (this.amount < value.amount) {
      throw new Error("Saldo insuficiente");
    }
    return new Money(this.amount - value.amount);
  }
}



