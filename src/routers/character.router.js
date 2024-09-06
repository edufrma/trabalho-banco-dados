import express from 'express';
import { createPersonagem, getPersonagensByControlador, updatePersonagem, deletePersonagem } from '../controllers/character.controller.js';
import { tokenValidation } from '../middlewares/token.validation.js';
const personagemRouter = express.Router();

personagemRouter.post('/personagem', tokenValidation, createPersonagem); 
personagemRouter.get('/personagens', tokenValidation, getPersonagensByControlador); 
personagemRouter.put('/personagem/:id', tokenValidation, updatePersonagem); 
personagemRouter.delete('/personagem/:id', tokenValidation, deletePersonagem); 

export default personagemRouter;
