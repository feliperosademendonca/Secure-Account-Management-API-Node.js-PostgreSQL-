// ./index.ts
import { router } from './router/routers.ts'; // Importando as rotas
import express from "express";

const app = express();

// Middleware para parsear o corpo da requisição (necessário para rotas POST)
app.use(express.json());  // Adicionando o middleware para trabalhar com JSON

// Usando o roteador no aplicativo
app.use(router);  

app.listen(3000, () => {
  console.log('Servidor TypeScript Rodando');
});
