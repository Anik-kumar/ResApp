const express = require('express');
const router = express.Router();
const authService = require('./../services/AuthService');
const authController = require('./../controllers/AuthController');


router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);




module.exports = router;
