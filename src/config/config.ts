
//@ts-ignore
import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Carrega as variáveis de ambiente a partir do arquivo .env
dotenv.config({ path: path.join(__dirname, '../.env') });


// Define o esquema para as variáveis de ambiente permitidas
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().description('Chave secreta JWT'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutos após os quais os tokens de acesso expiram'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('dias após os quais os tokens de atualização expiram'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutos após os quais o token de redefinição de senha expira'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutos após os quais o token de verificação de email expira'),
    SMTP_HOST: Joi.string().description('servidor que enviará os emails'),
    SMTP_PORT: Joi.number().description('porta para se conectar ao servidor de email'),
    SMTP_USERNAME: Joi.string().description('usuário para o servidor de email'),
    SMTP_PASSWORD: Joi.string().description('senha para o servidor de email'),
    EMAIL_FROM: Joi.string().description('o campo "from" nos emails enviados pela aplicação'),
  })
  .unknown();

// Valida as variáveis de ambiente em relação ao esquema
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
// Se a validação falhar, lance um erro
if (error) {
  throw new Error(`Erro de validação de configuração: ${error.message}`);
}

// Exporte os valores de configuração necessários
export = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};