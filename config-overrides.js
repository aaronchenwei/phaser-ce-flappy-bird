const rewirePhaserCE = require('react-app-rewire-phaser-ce');

module.exports = function override(config, env) {
  config = rewirePhaserCE(config, env);
  return config;
};
