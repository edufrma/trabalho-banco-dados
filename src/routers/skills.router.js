import express from 'express';
import { getEnemySkills, getCharacterSkills } from '../controllers/skills.controller.js';

const skillsRouter = express.Router();

skillsRouter.get('/enemy-skills', getEnemySkills);
skillsRouter.get('/character-skills', getCharacterSkills); 

export default skillsRouter;
