const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js')

router.post('/login' , authController.login)

router.post('/login-admin', authController.login_admin)

router.post('/register', authController.register)

router.post('/register-admin', authController.register_admin)

router.post('/logout' , authController.logout)

module.exports = router