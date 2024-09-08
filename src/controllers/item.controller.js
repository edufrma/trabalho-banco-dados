import * as itemService from '../services/item.service.js';

export async function getPersonagemItens(req, res) {
  try {
    const itens = await itemService.fetchPersonagemItens();
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).send('Erro ao buscar itens dos personagens');
  }
}
