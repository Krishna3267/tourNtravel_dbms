const express = require('express')
const router = express.Router()
const formController = require('../controllers/formController.js');

router.post('/book' , formController.book)

router.get('/update', formController.update_pass)
router.post('/delete' , formController.delete_booking)
router.get('/add-admin' , formController.add_admin)
router.get('/add-tour', formController.add_tour)

module.exports = router
