import joi from "joi";

export const authSchema = joi.object({
  senha: joi.string().required().min(3),
  nome: joi.string().required()
});
