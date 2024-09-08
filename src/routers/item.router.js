import express from 'express';
import { getPersonagemItens } from '../controllers/item.controller.js';
import { tokenValidation } from '../middlewares/token.validation.js';

const itemRouter = express.Router();

itemRouter.get('/personagens-itens', tokenValidation, getPersonagemItens);

export default itemRouter;
