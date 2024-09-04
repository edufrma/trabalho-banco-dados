import * as authService from "../services/auth.service.js";

export async function signUp(req, res) {
  const { name, password } = req.body; 

  try {
    await authService.signUp(name, password); 
    res.sendStatus(201);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { name, password } = req.body; 

  try {
    const tokenData = await authService.signIn(name, password); 
    res.setHeader('Authorization', `Bearer ${tokenData.token}`);
    res.status(200).send({ token: tokenData.token, username: tokenData.username });
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
