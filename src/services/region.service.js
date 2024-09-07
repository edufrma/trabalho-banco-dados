import * as regionRepository from "../repository/region.repository.js";

export async function fetchAllRegions() {
  return await regionRepository.getAllRegions();
}
