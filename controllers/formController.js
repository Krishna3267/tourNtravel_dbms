const path = require('path');
const book = (req , res) =>{
    res.render('forms/form-booking', {TourID : req.body.TourID, userName : req.session.username})
}

const update_pass = (req , res) =>{
    res.render('forms/form-updatepass')
}

const delete_booking = (req , res) =>{
    res.render('forms/form-delete-booking', {TourID : req.body.TourID, userName : req.session.username})
}

const add_admin = (req , res) =>{
    res.render('forms/form-add-admin')
}

const add_tour = (req , res) =>{
    res.render('forms/form-add-tour')
}

module.exports = {
    book, update_pass, delete_booking, add_admin,add_tour
}