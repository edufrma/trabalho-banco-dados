import * as skillsService from "../services/skills.service.js";

export async function getEnemySkills(req, res) {
  try {
    const skills = await skillsService.fetchEnemySkillsWithEffectsAndCost();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).send('Error fetching enemy skills with effects and cost');
  }
}

export async function getCharacterSkills(req, res) {
    try {
      const skills = await skillsService.fetchCharacterSkillsWithEffectsAndCost();
      res.status(200).json(skills);
    } catch (error) {
      res.status(500).send('Error fetching character skills with effects and cost');
    }
}
  