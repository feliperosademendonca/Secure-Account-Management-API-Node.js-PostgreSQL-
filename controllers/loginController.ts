import { loginSchema } from "../validations/inputsValidator";
import { response, type Request, type Response } from "express";
import { findUserByPhone } from "./dbController.js";

export const login = (req: Request, res: Response) => {
    // console.log('req.body', req.body);
    // Lógica de autenticação do usuário
    const { phone, password } = req.body;
    console.log('phone', phone);
     const userFinded = findUserByPhone(phone);
    console.log('userFinded', userFinded);
    // Aqui você implementaria a lógica para verificar as credenciais do usuário
    if (phone === userFinded.phone && password === userFinded.password) {
        console.log( userFinded?'usuário localizado':'Usuario não localizado')
        res.status(200).send({ message: "Login successful" });
    } else {
        res.status(401).send({ message: "Invalid credentials" });
    }
};


