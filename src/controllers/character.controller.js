import * as personagemService from '../services/character.service.js';
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const createPersonagem = [
  upload.single('foto'),
  async (req, res) => {
    const { nome, nivel, nome_classe } = req.body;
    const controladorId = res.locals.user.id; 
    const foto = req.file ? req.file.buffer : null;

    if (!nome || !nivel || !nome_classe) {
      return res.status(400).json({ message: 'Nome, nível e classe são obrigatórios.' });
    }

    try {
      await personagemService.createPersonagem(nome, nivel, nome_classe, controladorId, foto);
      res.sendStatus(201);
    } catch (error) {
      res.status(error.status || 500).send(error.message);
    }
  }
];

export const updatePersonagem = [
  upload.single('foto'),
  async (req, res) => {
    const { id } = req.params;
    const { nivel, nome_classe } = req.body;
    const controladorId = res.locals.user.id;
    const foto = req.file ? req.file.buffer : null;

    if (!nivel || !nome_classe) {
      return res.status(400).json({ message: 'Nível e classe são obrigatórios.' });
    }

    try {
      const personagem = await personagemService.getPersonagemById(id);
      if (!personagem) {
        return res.status(404).send('Personagem não encontrado.');
      }
      if (personagem.controlador !== controladorId) {
        return res.status(403).send('Você não tem permissão para atualizar este personagem.');
      }

      await personagemService.updatePersonagem(id, nivel, nome_classe, foto);
      res.sendStatus(200);
    } catch (error) {
      res.status(error.status || 500).send(error.message);
    }
  }
];

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
  
export async function deletePersonagem(req, res) {
    const { id } = req.params;
    const controladorId = res.locals.user.id;
  
    try {
      const personagem = await personagemService.getPersonagemById(id);
        
        if (!personagem) {
            return res.status(404).send('Personagem não encontrado');
        }
        if (personagem.controlador !== controladorId) {
            return res.status(403).send('Você não tem permissão para deletar este personagem');
        }

      await personagemService.deletePersonagem(id);
      res.status(200).send('Personagem deletado com sucesso!');
    } catch (error) {
      res.status(500).send(error.message);
    }
}
    