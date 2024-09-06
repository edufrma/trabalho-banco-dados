import * as skillsRepository from "../repository/skills.repository.js";

export async function fetchEnemySkillsWithEffectsAndCost() {
  return await skillsRepository.getEnemySkillsWithEffectsAndCost();
}

export async function fetchCharacterSkillsWithEffectsAndCost() {
    return await skillsRepository.getCharacterSkillsWithEffectsAndCost();
}
  