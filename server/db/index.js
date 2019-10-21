const db = require('./db.js');

// register models
require('./models');

// export db object once created
module.exports = db;

