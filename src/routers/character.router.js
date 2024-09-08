import express from 'express';
import { createPersonagem, getPersonagensByControlador, updatePersonagem, deletePersonagem } from '../controllers/character.controller.js';
import { tokenValidation } from '../middlewares/token.validation.js';
import multer from 'multer';

const personagemRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

personagemRouter.post('/personagem', tokenValidation, createPersonagem);
personagemRouter.get('/personagens', tokenValidation, getPersonagensByControlador);
personagemRouter.put('/personagem/:id', tokenValidation, upload.single('foto'), updatePersonagem);
personagemRouter.delete('/personagem/:id', tokenValidation, deletePersonagem);

export default personagemRouter;
