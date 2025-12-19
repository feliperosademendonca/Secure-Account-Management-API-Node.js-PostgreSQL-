## 📊 Plataforma Financeira — Projeto de Portfólio

Este projeto é uma **aplicação de portfólio** desenvolvida para demonstrar boas práticas de backend e **modelagem de domínio financeiro**.

A aplicação simula um sistema financeiro real, utilizando:
- Autenticação com JWT
- Ledger de créditos e débitos imutáveis
- Cálculo de saldo derivado a partir do histórico
- Regras explícitas para depósitos e saques
- Código organizado com foco em domínio e manutenibilidade

O objetivo é praticar a **capacidade de design de sistemas**, não apenas implementação de CRUD.




src/
├── domain/
│   └── finance/
│        ├── entities/
│        ├── value-objects/
│        ├── rules/
│        └── types.ts
│
├── application/
│   ├── contracts/
│   │    └── LedgerRepository.ts
│   └── services/
│        └── FinancialApplicationService.ts
│
├── infrastructure/
│   └── postgres/
│        └── PostgresLedgerRepository.ts
│
├── database/
│   └── query.ts
│
├── controllers/
│   └── financeController.ts
│
└── server.ts
