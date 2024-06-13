const express = require('express');
const { getAllUsers, loginController, registerController } = require('../controllers/userController');


//router object

const router = express.Router();
//get all users 'or' get request
router.get('/all-users', getAllUsers);
//create user 'or' post request
router.post('/register', registerController);
//login user 'or' post request
router.post('/login', loginController);

module.exports = router;