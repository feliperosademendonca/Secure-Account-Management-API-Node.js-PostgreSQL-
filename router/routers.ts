//./router/routers.ts
import express, { Router } from "express";
import type { Request, Response } from 'express';
import type { SignUpBody } from "../types/express"
export const router = Router();
import { validator } from "../validations/validator"
import createUser from "../controllers/dbController.js";

router.get("/", (req: Request, res: Response) => {
  res.send(`Rota index`);
});

router.get("/app", (req: Request, res: Response) => {
  //enviar para o cliente SPA da aplicação REACT
  res.send(`Rota app test `);
});

router.post("/signup", async (req: Request<{}, {}, SignUpBody>, res: Response) => {
  //receber os dados no body do request 
  const reqBody: SignUpBody = req.body
  console.log("Dados recebidos no /signup:", reqBody);

  const returnValidator = await validator(reqBody)
  createUser(req, res)


  res.send(returnValidator);
});

router.post("/login", (req: Request, res: Response) => {
  //receber os dados no body do request

  //validar os dados dentro das minhas regreas de negocio

  //retornar para resposta do request "success" ou "error"
  res.send();
});

router.post("/update", (req: Request, res: Response) => {
  //receber os dados no body do request

  //validar os dados dentro das minhas regreas de negocio

  //retornar para resposta do request "success" ou "error"
  res.send();
});

router.post("/recovery", (req: Request, res: Response) => {
  //receber os dados no body do request

  //validar os dados dentro das minhas regreas de negocio

  //retornar para resposta do request "success" ou "error"
  res.send();
})
