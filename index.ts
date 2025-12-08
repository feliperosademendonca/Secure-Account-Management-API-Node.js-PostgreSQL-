// ./index.ts
 import { router } from './router/routers.ts'; // Importando as rotas
import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
 
// CORS liberado para tudo
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Habilitar OPTIONS para qualquer rota (Express 5 requer "/*")
app.use(cors('/*'));


// Middleware para parsear o corpo da requisição (necessário para rotas POST)
app.use(express.json());  // Adicionando o middleware para trabalhar com JSON

// Usando o roteador no aplicativo
app.use(router);  

// este sempre por último
app.use(errorHandler);
app.listen(3000, () => {
  console.log('Servidor TypeScript Rodando');
});
 
