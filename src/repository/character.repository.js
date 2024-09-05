import { db } from "../database.js";

export async function createPersonagem(nome, nivel, nome_classe, controladorId) {
  const query = `
    INSERT INTO Personagem (Nome, Nivel, Nome_classe, Controlador)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;
  const values = [nome, nivel, nome_classe, controladorId];
  const result = await db.query(query, values);
  
  return result.rows[0].id;
}

export async function getPersonagensByControlador(controladorId) {
    const query = `
      SELECT id, Nome, Nivel, Nome_classe
      FROM Personagem
      WHERE Controlador = $1;
    `;
    const result = await db.query(query, [controladorId]);
  
    return result.rows;
}
  
export async function getPersonagemById(id) {
    const query = `
      SELECT id, Nome, Nivel, Nome_classe, Controlador
      FROM Personagem
      WHERE id = $1;
    `;
    const result = await db.query(query, [id]);
  
    return result.rows[0];
}
  
export async function updatePersonagem(id, nivel, nome_classe) {
    const query = `
      UPDATE Personagem
      SET Nivel = $1, Nome_classe = $2
      WHERE id = $3;
    `;
    const values = [nivel, nome_classe, id];
    await db.query(query, values);
}

export async function deletePersonagem(id) {
    const query = `
      DELETE FROM Personagem
      WHERE id = $1;
    `;
    await db.query(query, [id]);
}
  
  