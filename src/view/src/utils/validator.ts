console.log("scripts validador de inputs")
import  type { SignUpBody } from "../../../../types/express"

import Joi from "joi";
 
 

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
  email:emailSchema,
  password: Joi.string().min(6).required(),
  id: Joi.string().required()
});

export async function validator (  body: SignUpBody) {
  console.log(body)
  const { error, value } = signUpSchema.validate(body);

  if (error) {
    throw new Error(error.message);
  }

  return {
    msg: "dados válidos, prossiga.",
    data: value
  };
}
