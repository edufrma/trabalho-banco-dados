import * as personagemRepository from '../repository/character.repository.js';

export async function createPersonagem(nome, nivel, nome_classe, controladorId, foto) {
  return await personagemRepository.createPersonagem(nome, nivel, nome_classe, controladorId, foto);
}

export async function getPersonagensByControlador(controladorId) {
    return await personagemRepository.getPersonagensByControlador(controladorId);
}

export async function getPersonagemById(id) {
    return await personagemRepository.getPersonagemById(id);
}

export async function updatePersonagem(id, nivel, nome_classe, foto) {
    return await personagemRepository.updatePersonagem(id, nivel, nome_classe, foto);
}

export async function deletePersonagem(id) {
    return await personagemRepository.deletePersonagem(id);
}
