import * as questsRepository from "../repository/quests.repository.js";

export async function fetchMissionsWithRewards() {
  return await questsRepository.getMissionsWithRewards();
}
