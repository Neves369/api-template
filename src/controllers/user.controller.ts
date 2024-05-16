import httpStatus from "http-status";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";

/**
 * Create a new user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {json} - The created user
 */
const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

/**
 * Get a list of users
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {json} - List of users
 */
const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["nome", "role"]);
  const options = pick(req.query, ["sortBy"]);
  const result = await userService.queryUsers(filter, options, req.headers.empresa);
  res.send(result);
});

/**
 * Get user details
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {json} - User details
 */
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

/**
 * Update user details
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {json} - Updated user details
 */
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

/**
 * Delete user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {json} - No content
 */
const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};