const { request, response } = require('express');
const {connection} = require('../model/connection.js')
const path = require('path');
const login = (request , response) => {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect to home page
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }			
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
}

const login_admin = (request, response) => {
    let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/admindashboard');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
}

const register = (req, res) => {
    inputData = {
        // first_name: req.body.first_name,
        // last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        // gender: req.body.gender,
        // password: req.body.password,
        // confirm_password: req.body.confirm_password,
      };
  
      inputData2 = {  
          // first_name: req.body.first_name,
          // last_name: req.body.last_name,
          username: req.body.username,
          email: req.body.email,
          number: req.body.phno,
          state: req.body.state,
          address: req.body.address
          // gender: req.body.gender,
          // password: req.body.password,
          // confirm_password: req.body.confirm_password,
        };  
      // check unique email address
      var sql = "SELECT * FROM accounts WHERE email =?";
      connection.query(sql, [inputData.email], function (err, data, fields) {
        console.log(msg);
        if (err) throw err;
        if (data.length > 1) {
          var ans = inputData.email + "was already exist";
          // alert(ans);
        }
        // else if (inputData.confirm_password != inputData.password) {
        //   var msg = "Password & Confirm Password is not Matched";
        // }
        else {
          // save users data into database
          var sql = "INSERT INTO accounts SET ?";
          connection.query(sql, inputData, function (err, data) {
            if (err) throw err;
            
          });
          var sql1 = "INSERT INTO user_profiles SET ?";
          connection.query(sql1, inputData2, function (err, data) {
            if (err) throw err;
          });
          var msg = "Your are successfully registered";
        }
        console.log(msg);
        res.redirect('/login');
      });
}

const register_admin = (req, res) => {
    inputData = {
        // first_name: req.body.first_name,
        // last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        // gender: req.body.gender,
        // password: req.body.password,
        // confirm_password: req.body.confirm_password,
      };
      // check unique email address
      var sql = "SELECT * FROM admin WHERE email =?";
      connection.query(sql, [inputData.email], function (err, data, fields) {
        console.log(msg);
        if (err) throw err;
        if (data.length > 1) {
          var ans = inputData.email + "was already exist";
          // alert(ans);
        }
        // else if (inputData.confirm_password != inputData.password) {
        //   var msg = "Password & Confirm Password is not Matched";
        // }
        else {
          // save users data into database
          var sql = "INSERT INTO admin SET ?";
          connection.query(sql, inputData, function (err, data) {
            if (err) throw err;
          });
          var msg = "Your are successfully registered";
        }
        console.log(msg);
        res.redirect("/admindashboard");
      });
}

const logout = (request , response) => {

    if (request.session.loggedin) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		 
			// if (error) throw error;
			// If the account exists
			request.session.loggedin = false;
			response.redirect("/")
	} else {
		response.send('Not logged in how to logout!');
		response.end();
	}
}

module.exports = {login , login_admin, register, register_admin, logout}