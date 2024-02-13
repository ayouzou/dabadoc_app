const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserControllers')


router.post('/register',userController.createUser);
router.post('/login',userController.login);
router.get('/:id',userController.getUserById)


module.exports = router;

