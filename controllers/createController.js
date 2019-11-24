var User = require('../models/create');


// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, User) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "User retrieved successfully",
            data: User
        });
    });
};

// Handle create User actions
exports.new = function (req, res) {
    var user = new User();
    user.client_name = req.body.client_name ? req.body.client_name : user.client_name;
    user.username = req.body.username;
    user.product_name = req.body.product_name;
    user.password = req.body.password;
    user.time = req.body.time;
    // user.role = req.body.role;
    // save the User and check for errors
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    })
}


exports.delete = (req, res) => {
    req._id = req.body._id
    User.findByIdAndDelete(req._id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params._id
                });
            }console.log("here we go",req._id)
            res.send({ message: "product name deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({

                    message: "product name not found...." + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete.... " + req.params.id
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body._id) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    console.log("req.params._id",req.params._id);
    // Find user and update it with the request body
    User.findOneAndUpdate(req.params._id, 
        
        {
            // _id:req.params._id,
            client_name: req.body.client_name,
            username: req.body.username,
            product_name:req.body.product_name,
            password:req.body.password,
            time:req.body.time
    }, {new: true})
    .then(_id => {
        if(!_id) {
            return res.status(404).send({
                message: "User not found with id " + req.params._id
            });
        }
        res.send(_id);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params._id
        });
    });
};
