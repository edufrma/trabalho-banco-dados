import express from 'express';
import { getMissions } from '../controllers/quests.controller.js';

const questsRouter = express.Router();

questsRouter.get('/missions', getMissions);

export default questsRouter;
