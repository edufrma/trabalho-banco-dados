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

export async function getMissoesRecompensasByJogador(controladorId) {
  const query = `
    SELECT 
      m.Nome AS Missao, 
      m.Objetivo, 
      i.Nome AS Item, 
      r.Quantidade,
      p.Nome AS Personagem
    FROM Missoes m
    JOIN Recompensa r ON m.Nome = r.Nome_missao
    JOIN Item i ON r.Nome_item = i.Nome
    JOIN Participa_missoes pm ON m.Nome = pm.Nome_missao
    JOIN Personagem p ON pm.id_personagem = p.id
    WHERE p.controlador = $1;
  `;
  const values = [controladorId];
  
  const result = await db.query(query, values);
  return result.rows;
}
