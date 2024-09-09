import * as authRepository from "../repository/auth.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(nome, senha, foto) {
  const existingUser = await authRepository.findUserByName(nome); 
  if (existingUser) {
    const error = new Error("Nome de usuário já cadastrado!");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(senha, 10);
  await authRepository.createUser(nome, hashedPassword, foto); 
}

export async function signIn(nome, senha) {
  const user = await authRepository.findUserByName(nome); 
  if (!user) {
    const error = new Error("Usuário não cadastrado!");
    error.status = 404;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(senha, user.senha);
  if (!isPasswordCorrect) {
    const error = new Error("Senha incorreta!");
    error.status = 401;
    throw error;
  }

  const token = uuid();
  await authRepository.createSession(token, user.id);

  return { 
    token, 
    userId: user.id, 
    username: user.nome, 
    foto: user.foto 
  };
}

export async function logout(userId, token) {
  await authRepository.logoutUser(userId, token);
}

export async function updateUserPhoto(userId, foto) {
  await authRepository.updateUserPhoto(userId, foto);
}

export async function changePassword(userId, currentPassword, newPassword) {
  const user = await authRepository.findUserById(userId); 

  if (!user) {
    const error = new Error('Usuário não encontrado.');
    error.status = 404;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(currentPassword, user.senha);
  if (!passwordMatch) {
    const error = new Error('A senha atual está incorreta.');
    error.status = 401;
    throw error;
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await authRepository.updateUserPassword(userId, hashedNewPassword); 

  return;
}