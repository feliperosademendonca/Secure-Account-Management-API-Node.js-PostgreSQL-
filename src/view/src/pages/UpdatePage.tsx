

 function UpdatePage() {
  return (
    <div>
      <h2>Update Page</h2>
      {/* Conteúdo da página de atualização */}
     <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="input" />

           <label htmlFor="tel">Telefone</label>
        <input type="tel" id="tel" className="input" />

        
     </form>
    </div>
  );
}

export  default UpdatePage;