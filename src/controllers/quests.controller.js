import * as questsService from "../services/quests.service.js";

export async function getMissions(req, res) {
  try {
    const missions = await questsService.fetchMissionsWithRewards();
    res.status(200).json(missions);
  } catch (error) {
    res.status(500).send('Error fetching missions with rewards');
  }
}
