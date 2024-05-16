//@ts-nocheck
import bcrypt from 'bcryptjs';
import { Raw } from 'typeorm';
import { User } from '../models';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import AppDataSource from '../database/config';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody: any): Promise<User> => {
  let email = userBody.email;
  const userRepository = AppDataSource.getRepository(User)
  if (await userRepository.findOne({ where: {email} })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email já existe!');
  }
  userBody.password = bcrypt.hashSync(userBody.password, 8);
  return userRepository.save(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter: object, options: { sortBy?: string; limit?: number; page?: number;}, empresa: string): Promise<QueryResult> => {
  const userRepository = AppDataSource.getRepository(User);

    const skip = options.page ? (options.page - 1) * options.limit : 0;
    const take = options.limit || 10;

    // Adiciona a empresa ao filtro
    let where: any = { };

    // Adiciona condição para buscar nome se fornecido
    if (filter.nome) {
      where = [
        { nome: Raw(alias => `unaccent(${alias}) ILIKE unaccent('%${filter.nome.toLowerCase()}%')`) }
      ];
    }

    console.log(where);

    const users = await userRepository.findAndCount({
        where,
        order: { [options.sortBy || 'id']: 'ASC' },
        skip,
        take,
    });

    return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id: ObjectId): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User)
  return userRepository.findOne({where:{id}});
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.findOneBy({email});
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId: ObjectId, updateBody: object): Promise<User> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId: ObjectId): Promise<User> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

export = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
