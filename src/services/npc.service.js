import * as npcRepository from "../repository/npc.repository.js";

export async function fetchAllNPCsWithMissions() {
  return await npcRepository.getAllNPCsWithMissions();
}

export async function addNPC(nome, tipo) {
  return await npcRepository.createNPC(nome, tipo);
}

export async function fetchAllEnemiesWithSkills() {
    return await npcRepository.getAllEnemiesWithSkills();
}

