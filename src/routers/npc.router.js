import express from 'express';
import { createNPC, getAllNPCs } from '../controllers/npc.controller.js';

const npcRouter = express.Router();

npcRouter.post('/npcs', createNPC);
npcRouter.get('/npcs', getAllNPCs);

export default npcRouter;
