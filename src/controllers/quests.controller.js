import * as questsService from "../services/quests.service.js";

export async function getMissions(req, res) {
  try {
    const missions = await questsService.fetchMissionsWithRewards();
    res.status(200).json(missions);
  } catch (error) {
    res.status(500).send('Error fetching missions with rewards');
  }
}


export async function getMissoesRecompensas(req, res) {
  const controladorId = res.locals.user.id; 
  try {
    const missoesRecompensas = await questsService.fetchMissoesRecompensasByJogador(controladorId);
    if (!missoesRecompensas || missoesRecompensas.length === 0) {
      return res.status(404).json({ message: 'Nenhuma missão encontrada para esse jogador' });
    }

    res.status(200).json(missoesRecompensas);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar missões: ${error.message}` });
  }
}