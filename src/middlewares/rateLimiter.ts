// Import the express-rate-limit package to limit the rate of requests
import rateLimit from 'express-rate-limit';

// Initialize authLimiter to limit the rate of requests for authentication purposes
const authLimiter = rateLimit({

  // Set the window period for which the request count is measured
  // in this case, 15 minutes (15 * 60 * 1000 milliseconds)
  windowMs: 15 * 60 * 1000,

  // Set the maximum number of requests allowed during the window period
  max: 20,

  // Skip successful requests in the rate limit count
  skipSuccessfulRequests: true,
});

// Export the authLimiter middleware to use in the application routes
export default authLimiter;