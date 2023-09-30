const path = require('path');
const book = (req , res) =>{
    res.render('form-booking')
}

const update_pass = (req , res) =>{
    res.render('form-updatepass')
}

const delete_booking = (req , res) =>{
    res.render('form-delete-booking')
}

const add_admin = (req , res) =>{
    res.render('form-add-admin')
}

const add_tour = (req , res) =>{
    res.render('form-add-tour')
}

module.exports = {
    book, update_pass, delete_booking, add_admin,add_tour
}