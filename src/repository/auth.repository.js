import { db } from "../database.js";

export async function findUserByName(name) {
  const query = 'SELECT * FROM Jogador WHERE nome = $1';
  const values = [name];
  const result = await db.query(query, values);
  return result.rows[0];
}

export async function createUser(name, hashedPassword) {
  const query = 'INSERT INTO Jogador (name, senha) VALUES ($1, $2) RETURNING *';
  const values = [name, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0]; 
}

export async function createSession(token, userId) {
  const query = 'INSERT INTO Sessao (token, id_jogador) VALUES ($1, $2) RETURNING *';
  const values = [token, userId];
  const result = await db.query(query, values);
  return result.rows[0]; 
}

export async function logoutUser(userId, token) {
  const query = 'DELETE FROM Sessao WHERE id_jogador = $1 AND token = $2 RETURNING *';
  const values = [userId, token];
  const result = await db.query(query, values);
  return result.rows[0]; 
}
