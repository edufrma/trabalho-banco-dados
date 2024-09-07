import { db } from "../database.js";

export async function createPersonagem(nome, nivel, nome_classe, controladorId, foto) {
  const query = `
    INSERT INTO Personagem (Nome, Nivel, Nome_classe, Controlador, foto)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, encode(foto, 'base64') AS foto;
  `;
  const values = [nome, nivel, nome_classe, controladorId, foto];
  const result = await db.query(query, values);
  
  return result.rows[0].id;
}

export async function getPersonagensByControlador(controladorId) {
    const query = `
      SELECT id, Nome, Nivel, Nome_classe, encode(foto, 'base64') AS foto
      FROM Personagem
      WHERE Controlador = $1;
    `;
    const result = await db.query(query, [controladorId]);
  
    return result.rows;
}

export async function getPersonagemById(id) {
    const query = `
      SELECT id, Nome, Nivel, Nome_classe, Controlador, encode(foto, 'base64') AS foto
      FROM Personagem
      WHERE id = $1;
    `;
    const result = await db.query(query, [id]);
  
    return result.rows[0];
}

export async function updatePersonagem(id, nivel, nome_classe, foto) {
    const query = `
      UPDATE Personagem
      SET Nivel = $1, Nome_classe = $2, foto = $3
      WHERE id = $4;
    `;
    const values = [nivel, nome_classe, foto, id];
    await db.query(query, values);
}

export async function deletePersonagem(id) {
    const query = `
      DELETE FROM Personagem
      WHERE id = $1;
    `;
    await db.query(query, [id]);
}

export async function getAllClasses() {
  const query = `
    SELECT id, nome, descricao
    FROM classes;
  `;
  const result = await db.query(query);
  return result.rows;
}