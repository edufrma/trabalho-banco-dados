import * as authService from "../services/auth.service.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export async function signUp(req, res) {
  const { nome, senha } = req.body;
  const foto = req.file ? req.file.buffer : null; 

  if (!nome || !senha) {
    return res.status(400).json({ message: '"nome" e "senha" são obrigatórios' });
  }

  try {
    await authService.signUp(nome, senha, foto); 
    res.sendStatus(201);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
}


export const uploadPhoto = upload.single('foto'); 

// export async function signIn(req, res) {
//   const { nome, senha } = req.body; 

//   try {
//     const tokenData = await authService.signIn(nome, senha); 
//     res.setHeader('Authorization', `Bearer ${tokenData.token}`);
//     res.status(200).send({ token: tokenData.token, username: tokenData.username });
//   } catch (error) {
//     res.status(error.status || 500).send(error.message);
//   }
// }
export async function signIn(req, res) {
  const { nome, senha } = req.body;

  try {
    const tokenData = await authService.signIn(nome, senha); 
    res.setHeader('Authorization', `Bearer ${tokenData.token}`);
    res.status(200).send({
      token: tokenData.token, 
      username: tokenData.username, 
      foto: tokenData.foto ? Buffer.from(tokenData.foto).toString('base64') : null // Converter a imagem para Base64
    });
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
}



export async function logout(req, res) {
  const userId = res.locals.user_id;
  const token = req.headers.authorization?.replace('Bearer ', '');

  try {
    await authService.logout(userId, token);
    res.send('Logout bem-sucedido');
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
}
