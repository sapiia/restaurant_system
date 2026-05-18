// const rateLimit = require('express-rate-limit');

/**
 * Rate limiter middleware
 * Install: npm install express-rate-limit
 */
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
// });

// module.exports = limiter;
module.exports = (req, res, next) => next(); // placeholder
