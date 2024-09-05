import { db } from "../database.js";

export async function findUserByName(nome) {
  const query = `
    SELECT id, nome, senha
    FROM jogador
    WHERE nome = $1;
  `;
  const values = [nome];
  const result = await db.query(query, values);
  
  return result.rows[0];
}

export async function createUser(nome, hashedPassword, foto) {
  const query = `
    INSERT INTO jogador (nome, senha, foto)
    VALUES ($1, $2, $3)
    RETURNING id;
  `;
  const values = [nome, hashedPassword, foto];
  const result = await db.query(query, values);

  return result.rows[0].id;
}


export async function createSession(token, userId) {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1); 

  const query = `
    INSERT INTO sessao (id_jogador, token, expiration)
    VALUES ($1, $2, $3);
  `;
  const values = [userId, token, expiration];
  await db.query(query, values);
}


export async function logoutUser(userId, token) {
  const query = `
    DELETE FROM sessao
    WHERE id_jogador = $1 AND token = $2;
  `;
  const values = [userId, token];
  await db.query(query, values);
}

export async function findUserByToken(token) {
    const query = `
      SELECT jogador.id AS user_id, jogador.nome
      FROM jogador
      JOIN sessao ON jogador.id = sessao.id_jogador
      WHERE sessao.token = $1;
    `;
    const values = [token];
    const result = await db.query(query, values);
  
    if (result.rows.length > 0) {
      return {
        id: result.rows[0].user_id,  
        nome: result.rows[0].nome,
      };
    }
    return null;
}

export async function updateUserPhoto(userId, foto) {
  const query = `
    UPDATE jogador
    SET foto = $1
    WHERE id = $2;
  `;
  const values = [foto, userId];
  await db.query(query, values);
}

