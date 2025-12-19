

function IndexPage() {
  return (
    <div className="">
      <hr />
      <h1>Plataforma Financeira - Projeto de Portfólio Técnico</h1>
      {/* Conteúdo da página de atualização */}
      <section className={"container-fluid"}>
        <hr />
        <h2>📚 Sobre o projeto</h2>
        <p>
          Este projeto é uma aplicação de portfólio desenvolvida para demonstrar capacidade de modelagem de sistemas backend, com foco em domínio financeiro, regras de negócio e decisões arquiteturais.
          O sistema foi projetado para ir além de um CRUD tradicional, simulando conceitos utilizados em sistemas financeiros reais, como:
        </p>
            <hr />
      </section>
  

      <section>
        <h2>🔐 Principais características</h2>
        <ul>
          <li>Ledger-based system (créditos e débitos imutáveis)</li>
          <li>Saldo derivado a partir do histórico de transações</li>
          <li>Regras explícitas de negócio para depósitos e saques</li>
          <li>Separação clara entre domínio, serviços e infraestrutura</li>
          <li>Autenticação JWT e validações consistentes</li>
          <li>Gestão de usuários com validações e regras de atualização</li>
          <li>Sistema financeiro baseado em ledger (créditos e débitos imutáveis)</li>
        </ul>
        <hr />
        <h2>Stack e abordagem</h2>
        <ul>
          <li>Node.js + TypeScript</li>
          <li>Arquitetura orientada a domínio (DDD leve / hexagonal-inspired)</li>
          <li>Código preparado para evolução, testes e auditoria</li>
          <li>Decisões pensadas para ambientes serverless e monolitos bem estruturados</li>
        </ul>
        <hr />
        <h2>🧱 Abordagem técnica</h2>
        <ul>
          <li>Este projeto de portfólio aplica conceitos utilizados em sistemas reais, como:</li>
          <li> Ledger-based systems</li>
          <li>  Modelagem financeira orientada a eventos</li>
          <li>Domain-Driven Design (DDD – abordagem leve)</li>
          <li> Tipagem forte com TypeScript</li>
          <li>  Código organizado para facilitar testes, evolução e auditoria</li>
          <li> O objetivo é demonstrar capacidade de projetar sistemas, não apenas escrever código, explorando decisões arquiteturais e seus impactos.</li>
        </ul>
              <hr />

      </section>
      <section>
        <h2>🎯Objetivo</h2>
        <p>
          Demonstrar, de forma prática, como estruturar um backend moderno, seguro e escalável,
          com foco em domínio financeiro, clareza de regras e manutenibilidade,
          servindo como base de estudo e apresentação profissional.
        </p>
      </section>
    </div>
  );
}

export default IndexPage;