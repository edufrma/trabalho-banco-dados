import { db } from "../database.js";

export async function getEnemySkillsWithEffectsAndCost() {
  const query = `
    SELECT h.nome AS skill_name, h.custo AS cost, h.dano AS damage, eh.efeito AS effect
    FROM habilidades h
    JOIN inimigo_habilidades ih ON h.nome = ih.nome_habilidade
    LEFT JOIN efeitos_habilidades eh ON h.nome = eh.nome_habilidade;
  `;
  const result = await db.query(query);
  return result.rows;
}

export async function getCharacterSkillsWithEffectsAndCost() {
    const query = `
      SELECT h.nome AS skill_name, h.custo AS cost, h.dano AS damage, eh.efeito AS effect
      FROM habilidades h
      JOIN personagem_habilidades ph ON h.nome = ph.nome_habilidade
      LEFT JOIN efeitos_habilidades eh ON h.nome = eh.nome_habilidade;
    `;
    const result = await db.query(query);
    return result.rows;
}
  