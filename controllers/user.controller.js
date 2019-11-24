const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;
    user.save((err, doc) => {
        if (!err) {

            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'umangchopra75@gmail.com',
                    pass: 'mcaumang'
                }
            });

            var mailOptions = {
                from: 'umangchopra75@gmail.com',
                to: user.email,
                subject: 'Welcome To AptaDeomo',
                html: '<h1> Dear ' + user.fullName + ' </h1><br><br><p><b>Email : </b>' + user.email + '</p><p><b>Password : </b> ' + req.body.password + '</p><br><br><p>Thank You<br>AptaDemo</p>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email']) });
        }
    );
}

module.exports.getRegisterData = (req, res, next) => {
    User.find({},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ user });
        }
    );
}

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