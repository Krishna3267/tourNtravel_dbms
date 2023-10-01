const path = require('path');
const book = (req , res) =>{
    res.render('form-booking', {TourID : req.body.TourID, userName : req.session.username})
}

const update_pass = (req , res) =>{
    res.render('form-updatepass')
}

const delete_booking = (req , res) =>{
    res.render('form-delete-booking', {TourID : req.body.TourID, userName : req.session.username})
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