const expressLoader = require('./express.loader');
const databaseLoader = require('../core/database');

/**
 * Run all startup loaders
 * @param {import('express').Application} app
 */
module.exports = async (app) => {
  await databaseLoader();
  console.log('Database loaded');

  expressLoader(app);
  console.log('Express loaded');
};
