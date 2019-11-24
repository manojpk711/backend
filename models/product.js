// Create setup.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Setup schema
var createSchema = new Schema({
    product_name: { type: String, require: true, unique: true },
    link: { type: String, require: true },  
    users: { type: [], require: true },


});

// Export Create model
var Create = module.exports = mongoose.model('productList', createSchema);
module.exports.get = function (callback, limit) {
    Create.find(callback).limit(limit);
}