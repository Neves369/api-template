import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import {  userService, tokenService, emailService, authService } from '../services';

// Registra um novo usuário
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

// Efetua o login de um usuário
const login = catchAsync(async (req, res) => {
  const { email, senha } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, senha);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

// Desconecta um usuário
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

// Renova os tokens de autenticação
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

// Solicita a redefinição de senha de um usuário
const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
});

// Redefine a senha de um usuário
const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.senha);
  res.status(httpStatus.NO_CONTENT).send();
});

// Envia um e-mail de validação para o endereço de e-mail de um usuário
const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

// Valida o e-mail de um usuário
const verifyEmail = catchAsync(async (req, res) => {
  // await authService.verifyEmail(req.query.token);
  // res.status(httpStatus.NO_CONTENT).send();
});

export = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};