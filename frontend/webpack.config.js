const path = require('path');

module.exports = {
  // Other configurations...
  resolve: {
    alias: {
      '@backend': path.resolve(__dirname, '../backend/src/controller')
    }
  }
};
