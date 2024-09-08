import * as itemRepository from '../repository/item.repository.js'

export async function fetchPersonagemItens() {
  return await itemRepository.getPersonagemItens();
}
