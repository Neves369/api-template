import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import tokenTypes  from './tokens';
import { User } from '../models';
import config from './config';
import AppDataSource from '../database/config/ormconfig';

/**
 * Opções de configuração para a estratégia de autenticação JWT
 */
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

/**
 * Função para verificar o payload do JWT e retornar o usuário se o token estiver válido
 * @param payload - Payload do JWT
 * @param done - Função de callback para retornar o usuário ou o erro
 */
const jwtVerify = async (payload: { type: string; sub: any; }, done: (arg0: unknown, arg1: boolean) => void) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Token inválido');
    }
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne(payload.sub);
    if (!user) {
      return done(null, false);
    }
    //@ts-ignore
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

/**
 * Estratégia de autenticação JWT
 */
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;