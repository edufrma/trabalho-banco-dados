import { db } from "../database.js";

export async function getAllNPCsWithMissions() {
  const query = `
    SELECT n.id AS npc_id, n.nome AS npc_nome, n.tipo, m.nome AS missao_nome
    FROM npc n
    LEFT JOIN missoes m ON n.id = m.id_fornecedor;
  `;
  const result = await db.query(query);
  return result.rows;
}

export async function createNPC(nome, tipo) {
    const query = `
      INSERT INTO npc (nome, tipo)
      VALUES ($1, $2)
      RETURNING id, nome, tipo;
    `;
    const values = [nome, tipo];
    const result = await db.query(query, values);
    return result.rows[0];
}

export async function getAllEnemiesWithSkills() {
    const query = `
      SELECT i.id AS inimigo_id, i.nome AS inimigo_nome, i.nivel, h.nome AS habilidade_nome, h.dano, h.custo
      FROM inimigo i
      LEFT JOIN inimigo_habilidades ih ON i.id = ih.id_inimigo
      LEFT JOIN habilidades h ON ih.nome_habilidade = h.nome;
    `;
    const result = await db.query(query);
    return result.rows;
}
  