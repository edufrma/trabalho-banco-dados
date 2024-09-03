import joi from "joi";

export const authSchema = joi.object({
  password: joi.string().required().min(3),
  name: joi.string().required()
});
