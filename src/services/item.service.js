import * as itemRepository from '../repository/item.repository.js'

export async function fetchPersonagemItensByControlador(controladorId) {
    return await itemRepository.getPersonagemItensByControlador(controladorId);
}