//@ts-nocheck
import Joi from 'joi'
import httpStatus from 'http-status'
import pick from '../utils/pick'
import ApiError from '../utils/ApiError'

/**
 * Validation middleware function to validate the request object using Joi schema.
 * This function accepts a Joi schema as a parameter and validates the 'params', 'query', and 'body' properties of the request object.
 * If validation fails, it sends a Bad Request error with the validation error messages.
 * If validation passes, it assigns the validated properties to the request object and passes it to the next middleware function.
 *
 * @param {Object} schema - Joi schema object
 * @returns {Function} - Middleware function
 */
const validate = (schema: object): Function => (req: object, res: any, next: (arg0: ApiError | undefined) => any) => {
  // Pick the required properties from the schema
  const validSchema = pick(schema, ['params', 'query', 'body'])
  
  // Extract the required properties from the request object
  const object = pick(req, Object.keys(validSchema))
  
  // Compile the schema and validate the request object
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object)
  
  // If validation fails, send a Bad Request error
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ')
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage))
  }
  
  // If validation passes, assign the validated properties to the request object and pass it to the next middleware function
  Object.assign(req, value)
  return next()
}

export default validate