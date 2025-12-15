// ./src/app.ts

import express from "express";
import cors from "cors";
import { router } from "./routes/routers";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";


export const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,                
}));


app.use(express.json());
app.use(cookieParser()); // 🔥 AQUI, antes das rotas

app.use(router);
app.use(errorHandler);
