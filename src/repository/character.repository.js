import { db } from "../database.js";

export async function createPersonagem(nome, nivel, nome_classe, controlador) {
    const query = `
      INSERT INTO Personagem (Nome, Nivel, Nome_classe, Controlador)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const values = [nome, nivel, nome_classe, controlador];
    const result = await db.query(query, values);
    
    return result.rows[0].id;
}
  