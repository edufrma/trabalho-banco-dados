import * as personagemRepository from '../repository/personagem.repository.js';

export async function createPersonagem(nome, nivel, nome_classe, controladorId) {
  return await personagemRepository.createPersonagem(nome, nivel, nome_classe, controladorId);
}

export async function getPersonagensByControlador(controladorId) {
    return await personagemRepository.getPersonagensByControlador(controladorId);
}
  
export async function getPersonagemById(id) {
    return await personagemRepository.getPersonagemById(id);
}
  
export async function updatePersonagem(id, nivel, nome_classe) {
    return await personagemRepository.updatePersonagem(id, nivel, nome_classe);
}
  
export async function deletePersonagem(id) {
    return await personagemRepository.deletePersonagem(id);
}
  