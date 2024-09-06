import { db } from "../database.js";

export async function getMissionsWithRewards() {
  const query = `
    SELECT m.Nome AS mission_name, m.Objetivo AS mission_objective, i.Nome AS item_name, r.Quantidade AS quantity
    FROM Missoes m
    JOIN Recompensa r ON m.Nome = r.Nome_missao
    JOIN Item i ON r.Nome_item = i.Nome;
  `;
  const result = await db.query(query);
  return result.rows;
}
