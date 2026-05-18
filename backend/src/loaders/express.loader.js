const express = require('express');

/**
 * Initialize Express application with middleware and routes
 * @param {express.Application} app
 */
module.exports = (app) => {
  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // TODO: Register API routes here
  // const v1Routes = require('../api/v1');
  // app.use('/api/v1', v1Routes);
};
