import * as questsRepository from "../repository/quests.repository.js";

export async function fetchMissionsWithRewards() {
  return await questsRepository.getMissionsWithRewards();
}

export async function fetchMissoesRecompensasByJogador(controladorId) {
  try {
    const missoesRecompensas = await questsRepository.getMissoesRecompensasByJogador(controladorId);
    return missoesRecompensas;
  } catch (error) {
    throw new Error(`Erro ao buscar missões e recompensas: ${error.message}`);
  }
}
