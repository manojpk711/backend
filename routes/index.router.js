const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/getRegisterData', ctrlUser.getRegisterData);
// router.post('/deletesignup', ctrlUser.delete);

var createController =require('../controllers/createController');
    router.route('/createlogin')
    .get(createController.index)
    .post(createController.new)

    var createController =require('../controllers/createController');
    router.route('/deletedata')
    .post(createController.delete)

    var createController =require('../controllers/user.controller');
    router.route('/deletesignup')
    .post(ctrlUser.delete)

    var createController =require('../controllers/createController');
    router.route('/updatecreatedata')
    .post(createController.update)

    var productListController =require('../controllers/productListController');
    router.route('/clearproductdata')
    .post(productListController.delete)


    var productListController =require('../controllers/productListController');
    router.route('/updateproductdata')
    .post(productListController.update)

    var productListController =require('../controllers/productListController');
    router.route('/productListController')
    .get(productListController.index)
    .post(productListController.new);

module.exports = router;







