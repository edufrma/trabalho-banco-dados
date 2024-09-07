import express from 'express';
import { createNPC, getAllNPCs, getAllEnemies } from '../controllers/npc.controller.js';
import multer from 'multer';

const npcRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

npcRouter.post('/npcs', upload.single('foto'), createNPC);
npcRouter.get('/npcs', getAllNPCs);
npcRouter.get('/inimigos', getAllEnemies);

export default npcRouter;
