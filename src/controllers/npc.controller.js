import * as npcService from "../services/npc.service.js";

export async function getAllNPCs(req, res) {
  try {
    const npcs = await npcService.fetchAllNPCsWithMissions();
    res.status(200).json(npcs);
  } catch (error) {
    res.status(500).send('Error fetching NPCs with missions');
  }
}

export async function createNPC(req, res) {
  const { nome, tipo } = req.body;

  if (!nome || !tipo) {
    return res.status(400).send('Nome e tipo são obrigatórios');
  }

  try {
    const npc = await npcService.addNPC(nome, tipo);
    res.status(201).json(npc);
  } catch (error) {
    res.status(500).send('Erro ao adicionar NPC');
  }
}
