import * as npcRepository from "../repository/npc.repository.js";

export async function fetchAllNPCsWithMissions() {
  return await npcRepository.getAllNPCsWithMissions();
}

export async function addNPC(nome, tipo, foto) {
  return await npcRepository.createNPC(nome, tipo, foto);
}

export async function fetchAllEnemiesWithSkills() {
  return await npcRepository.getAllEnemiesWithSkills();
}
