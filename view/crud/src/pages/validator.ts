console.log("scripts validador de inputs")

export function validator(data: any) {
  // Exemplo simples de validação
  if (!data.name || !data.phone || !data.password || !data.confirmPassword || !data.indicationId) {
    return false; // Dados inválidos se algum campo obrigatório estiver vazio
  } else {
    return true; // Dados válidos
  }
}