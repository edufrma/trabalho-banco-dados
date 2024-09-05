import * as personagemService from '../services/character.service';

export async function createPersonagem(req, res) {
    const { nome, nivel, nome_classe } = req.body;
    const controladorId = res.locals.user.id; 
  
    try {
      const personagemId = await personagemService.createPersonagem(nome, nivel, nome_classe, controladorId);
      res.status(201).send({ id: personagemId, message: 'Personagem criado com sucesso!' });
    } catch (error) {
      res.status(500).send(error.message);
    }
}

export async function getPersonagensByControlador(req, res) {
    const controladorId = res.locals.user.id; 
  
    try {
      const personagens = await personagemService.getPersonagensByControlador(controladorId);
      if (!personagens || personagens.length === 0) {
        return res.status(404).send('Nenhum personagem encontrado para este jogador');
      }
      res.status(200).send(personagens);
    } catch (error) {
      res.status(500).send(error.message);
    }
}

export async function updatePersonagem(req, res) {
    const { id } = req.params;
    const { nivel, nome_classe } = req.body;
    const controladorId = res.locals.user.id; 
  
    try {
      const personagem = await personagemService.getPersonagemById(id);
  
      if (personagem.Controlador !== controladorId) {
        return res.status(403).send('Você não tem permissão para atualizar este personagem');
      }
  
      await personagemService.updatePersonagem(id, nivel, nome_classe);
      res.status(200).send('Personagem atualizado com sucesso!');
    } catch (error) {
      res.status(500).send(error.message);
    }
}
  
export async function deletePersonagem(req, res) {
    const { id } = req.params;
    const controladorId = res.locals.user.id;
  
    try {
      const personagem = await personagemService.getPersonagemById(id);
  
      if (personagem.Controlador !== controladorId) {
        return res.status(403).send('Você não tem permissão para deletar este personagem');
      }
  
      await personagemService.deletePersonagem(id);
      res.status(200).send('Personagem deletado com sucesso!');
    } catch (error) {
      res.status(500).send(error.message);
    }
}
    