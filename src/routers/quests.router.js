import express from 'express';
import { getMissions, getMissoesRecompensas } from '../controllers/quests.controller.js';
import { tokenValidation } from '../middlewares/token.validation.js';

const questsRouter = express.Router();

questsRouter.get('/quests', getMissions);
questsRouter.get('/questsandrewards', tokenValidation, getMissoesRecompensas);


export default questsRouter;
