import Joi from "joi";
import express from 'express'
import  type { SignUpBody } from "../types/express"
 
 
const allowedDomains = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com"
 ];

const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .custom((value, helpers) => {
    const domain = value.split("@")[1];
    if (!allowedDomains.includes(domain)) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "domain whitelist")
  .messages({
    "any.invalid": "Este domínio de e-mail não é permitido"
  });



const signUpSchema = Joi.object({
  phone: Joi.string().min(11).max(15).required(),
  name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  id: Joi.string().required()
});

export async function validator (  body: SignUpBody) {
  console.log(body)
  const { error, value } = signUpSchema.validate(body);

  if (error) {
    throw new Error(error.message);
  }

  // aqui entram regras de negócio
  // ex: hash da senha, salvar no banco etc.

  return {
    msg: "Usuário criado",
    data: value
  };
}
