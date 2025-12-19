//./src/domain/finance/entities/Acount.ts
// entities/Account.ts
export class Account {
  constructor(
    public readonly accountId: string,
    public readonly userId: string,
    private readonly isActive: boolean
  ) {}

  deactivate() {
    if (!this.isActive) {
      throw new Error("Conta já está desativada");
    }
  }
}
