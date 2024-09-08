import * as itemService from '../services/item.service.js';

export async function getPersonagemItens(req, res) {
    const controladorId = res.locals.user.id;
    
    try {
      const itens = await itemService.fetchPersonagemItensByControlador(controladorId);
      
      if (itens.length === 0) {
        return res.status(404).send('Nenhum item encontrado para os personagens deste jogador.');
      }
  
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).send('Erro ao buscar itens dos personagens');
    }
}