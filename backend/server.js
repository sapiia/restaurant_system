require('dotenv').config();
const express = require('express');
const config = require('./config');
const loaders = require('./src/loaders');
const errorMiddleware = require('./src/middlewares/error.middleware');

const app = express();

(async () => {
  // Initialize all loaders (express setup, DB connections, etc.)
  await loaders(app);

  // Global error handler — must be last middleware
  app.use(errorMiddleware);

  app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port} [${config.env}]`);
  });
})();
