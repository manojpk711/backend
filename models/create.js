// Create setup.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Setup schema
var createSchema = new Schema({ 
    client_name:         {type:String, require:true},
    product_name :      {type:String, require:true,unique:true},
    username:           {type:String, require:true},
    password:            {type:String, require:true},
    time:               {type:String, require:true}
    
});

// Export Create model
var Create = module.exports = mongoose.model('create', createSchema);
module.exports.get = function (callback, limit) {
    Create.find(callback).limit(limit);
}