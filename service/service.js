// Re-export model-level operations from `model/model.js` so routes can use
// `require('../service/service')` as the project's service layer.
module.exports = require('../model/model');