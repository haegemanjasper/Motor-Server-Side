const packageJson = require('../../package.json');

// server healthy?
const ping = () => ({ pong: true });

// server's information
const getVersion = () => ({
  env: process.env.NODE_ENV,
  version: packageJson.version,
  name: packageJson.name,
});

module.exports = {
  ping,
  getVersion,
};