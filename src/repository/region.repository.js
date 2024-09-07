import { db } from "../database.js";

export async function getAllRegions() {
  const query = `
    SELECT id, nome, foto
    FROM regiao;
  `;
  const result = await db.query(query);
  const formattedRegions = result.rows.map(region => {
    return {
      ...region,
      foto: region.foto ? region.foto.toString('base64') : null // Converte o buffer para base64
    };
  });

  return formattedRegions;
}
