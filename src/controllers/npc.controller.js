import * as npcService from "../services/npc.service.js";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const createNPC = [
  upload.single('foto'),
  async (req, res) => {
    const { nome, tipo } = req.body;
    const foto = req.file ? req.file.buffer : null;

    if (!nome || !tipo) {
      return res.status(400).json({ message: 'Nome e tipo são obrigatórios.' });
    }

    try {
      await npcService.addNPC(nome, tipo, foto);
      res.sendStatus(201);
    } catch (error) {
      res.status(error.status || 500).send(error.message);
    }
  }
];

export async function getAllNPCs(req, res) {
  try {
    const npcs = await npcService.fetchAllNPCsWithMissions();
    res.status(200).json(npcs);
  } catch (error) {
    res.status(500).send('Error fetching NPCs with missions');
  }
}

export async function getAllEnemies(req, res) {
    try {
      const enemies = await npcService.fetchAllEnemiesWithSkills();
      res.status(200).json(enemies);
    } catch (error) {
      res.status(500).send('Error fetching enemies with skills');
    }
  }
