import express from 'express';
import { getMissions } from '../controllers/quests.controller.js';

const questsRouter = express.Router();

questsRouter.get('/quests', getMissions);

export default questsRouter;
