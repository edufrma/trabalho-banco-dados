import * as itemRepository from '../repositories/item.repository.js';

export async function fetchPersonagemItens() {
  return await itemRepository.getPersonagemItens();
}
