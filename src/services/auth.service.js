import * as authRepository from "../repository/auth.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(name, password) {
  const existingUser = await authRepository.findUserByName(name);
  if (existingUser) {
    const error = new Error("Nickname já cadastrado!");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await authRepository.createUser(name, hashedPassword);
}

export async function signIn(name, password) {
  const user = await authRepository.findUserByName(name);
  if (!user) {
    const error = new Error("Usuário não cadastrado!");
    error.status = 404;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.senha);
  if (!isPasswordCorrect) {
    const error = new Error("Senha incorreta!");
    error.status = 401;
    throw error;
  }

  const token = uuid();
  await authRepository.createSession(token, user.id);

  console.log("Usuário logado com sucesso, ID do usuário:", user.id);
  return { token, userId: user.id, username: user.nome }
}

export async function logout(userId, token) {
  await authRepository.logoutUser(userId, token);
}
