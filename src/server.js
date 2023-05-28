const Hapi = require('@hapi/hapi');
const routes = require('./routes');
 
// Configuration for the server
const config = {
  port: 9000,
  host: 'localhost',
};
 
/**
 * Initiate Hapi Server
 * @param {Object} config - Server configuration
 * @param {number} config.port - Port number
 * @param {string} config.host - Host address
 * @returns {Promise<Hapi.Server>} Initialized Hapi server instance
 */
const init = async (config) => {
  const server = Hapi.server({
    port: config.port,
    host: config.host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
 
  // Register routes
  server.route(routes);
 
  await server.start();
 
  // Uncomment the following line for development
  // console.log(`Server berjalan pada ${server.info.uri}`);
 
  return server;
};
 
// Start the server
init(config);