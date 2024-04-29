//@ts-nocheck
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import tokenService from './token.service';
import userService from './user.service';
import Token from '../models/token.model';
import ApiError from '../utils/ApiError';
import tokenTypes  from '../config/tokens';
import AppDataSource from '../database/config';
import User  from '../models/usuario.model';
import Permissao from '../models/permissao.model';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} senha
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email: string, senha: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const permissionsRepository = AppDataSource.getRepository(Permissao);
  const user = await userRepository.findOne({ where: { email }, relations: ['empresa', 'perfilAcesso'] });
  const perfilAcessoId = user.perfilAcesso.id 
  const permissoes = await permissionsRepository.query(`
    SELECT gestao.permissoes.*
    FROM gestao.permissoes
    JOIN gestao.permissoes_perfil_acesso ON gestao.permissoes.id = gestao.permissoes_perfil_acesso.permissao_id
    WHERE gestao.permissoes_perfil_acesso.perfil_acesso_id = ${perfilAcessoId}; 
  `)


  user.permissoes = permissoes;
  if (!user || !(bcrypt.compareSync(senha, user.senha))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email ou Senha incorretos!');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken: string): Promise<any> => {
  const tokenRepository = AppDataSource.getRepository(Token);
  const refreshTokenDoc = await tokenRepository.findOne({ where: {token: refreshToken }});
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await tokenRepository.delete(refreshTokenDoc);
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken: string): Promise<object> => {
  try {
    const tokenRepository = AppDataSource.getRepository(Token);
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    console.log("teste: ", refreshTokenDoc)
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await tokenRepository.delete({token: refreshTokenDoc.token});
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error);
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken: string, newPassword: string): Promise<any> => {
  try {
    const tokenRepository = AppDataSource.getRepository(Token);
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await tokenRepository.delete({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error);
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken: string): Promise<any> => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

export = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
