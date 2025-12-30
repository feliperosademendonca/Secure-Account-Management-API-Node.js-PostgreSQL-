// ./src/domain/finance/value-objects/Money.ts

export class Money {

  private readonly cents: number;

  constructor(cents: number) {
    if (!Number.isInteger(cents)) {
      throw new Error("Money deve ser inteiro em centavos");
    }
    if (cents < 0) {
      throw new Error("Money não pode ser negativo");
    }
    this.cents = cents;
  }
  // Cria Money a partir de valor em reais (ex: 12.34)
  static fromReais(value: number): Money {
    const cents = Math.round(value * 100);
    return new Money(cents);
  }

  // Cria Money diretamente a partir de centavos
  static fromCents(cents: number): Money {
    return new Money(cents);
  }

  add(other: Money): Money {
    return new Money(this.cents + other.cents);
  }

  subtract(other: Money): Money {
    if (this.cents < other.cents) {
      throw new Error("Saldo insuficiente");
    }
    return new Money(this.cents - other.cents);
  }

  toReais(): number {
    return this.cents / 100;
  }

  toCents(): number {
    return this.cents;
  }
}
