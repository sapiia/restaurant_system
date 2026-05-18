const expressLoader = require('./express.loader');

/**
 * Run all startup loaders
 * @param {import('express').Application} app
 */
module.exports = async (app) => {
  expressLoader(app);
  console.log('✅ Express loaded');
};
