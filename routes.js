const routes = require('next-routes')();

routes
  .add('/concerts/new', '/concerts/new')
  .add('/concerts/:address', '/concerts/show')

module.exports = routes;
