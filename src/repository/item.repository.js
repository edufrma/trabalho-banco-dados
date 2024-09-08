import { db } from '../database.js';

export async function getPersonagemItens() {
  const query = `
    SELECT p.Nome AS personagem, i.Nome AS item, pi.Quantidade
    FROM Personagem p
    JOIN Personagens_itens pi ON p.id = pi.id_personagem
    JOIN Item i ON pi.Nome_item = i.Nome;
  `;

  const result = await db.query(query);
  return result.rows;
}
