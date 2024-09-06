import express from 'express';
import { createNPC, getAllNPCs, getAllEnemies } from '../controllers/npc.controller.js';

const npcRouter = express.Router();

npcRouter.post('/npcs', createNPC);
npcRouter.get('/npcs', getAllNPCs);
npcRouter.get('/inimigos', getAllEnemies);

export default npcRouter;
