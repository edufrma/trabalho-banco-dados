import * as regionService from "../services/region.service.js";

export async function getAllRegions(req, res) {
  try {
    const regions = await regionService.fetchAllRegions();
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).send('Erro ao buscar regiões');
  }
}
