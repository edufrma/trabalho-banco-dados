import { db } from "../database.js";

export async function getAllRegions() {
  const query = `
    SELECT id, nome, foto
    FROM regiao;
  `;
  const result = await db.query(query);
  return result.rows;
}
