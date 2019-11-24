var User = require('../models/product');

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
    user.product_name = req.body.product_name;
    user.link = req.body.link;
    user.users = req.body.users;


    // user.role = req.body.role;
    // save the User and check for errors
    user.save(function (err) {
        // if (err)
        // res.json(err);
        res.json({
            message: 'New Record created!',
            data: user
        });
    });
};

exports.delete = (req, res) => {
    req._id = req.body._id
    User.findByIdAndDelete(req._id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params._id
                });
            } console.log("here we go", req._id)
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
    if (!req.body._id) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    console.log("req.params._id", req.params._id);
    // Find user and update it with the request body
    User.findOneAndUpdate(req.params._id,

        {

            product_name: req.body.product_name,
            link: req.body.link,
            users: req.body.users,
        }, { new: true })
        .then(_id => {
            if (!_id) {
                return res.status(404).send({
                    message: "User not found with id " + req.params._id
                });
            }
            res.send(_id);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params._id
            });
        });
};






