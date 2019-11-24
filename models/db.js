const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp'); 
require('./user.model');
require('./create');
require('./product')