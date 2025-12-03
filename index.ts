// ./index.ts
 import { router } from './router/routers.ts'; // Importando as rotas
import express from "express";
import cors from "cors";

const app = express();

// CORS COMPLETO
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// NECESSÁRIO para pré-flight OPTIONS
app.options("/",cors());


// Middleware para parsear o corpo da requisição (necessário para rotas POST)
app.use(express.json());  // Adicionando o middleware para trabalhar com JSON

// Usando o roteador no aplicativo
app.use(router);  

app.listen(3000, () => {
  console.log('Servidor TypeScript Rodando');
});
 
