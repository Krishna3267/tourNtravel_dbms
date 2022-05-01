const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const ejs = require("ejs");
const app = express();
// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')));
// app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',  
	password : 'password',
	database : 'nodesql'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


// setting routes
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/getStarted.html'));
});

// app.get('/home', function(request, response) {
// 	// Render login template
// 	response.sendFile(path.join(__dirname + '/static/home.html'));
// });

// http://localhost:3000/home kinda private route
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		// response.send('Welcome back, ' + request.session.username + '!');
		response.sendFile(path.join(__dirname + "/static/home.html"));

	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	// response.end();
});

app.get("/userinfo", function (request, response) {
	// Render login template
	response.send({
	  username: request.session.username,
	});
  });
 
  //user profile details
  app.get("/userprofile", function (req, res, next) {
	var sql = `SELECT * FROM user_profiles WHERE username="${req.session.username}"`;
	connection.query(sql, function (err, data, fields) {
	  if (err) throw err;
	  res.render("userprofile", { title: "User List", userData: data });
	});
  });

  app.get("/adminprofile", function (req, res, next) {
	var sql = `SELECT * FROM admin WHERE username="${req.session.username}"`;
	connection.query(sql, function (err, data, fields) {
	  if (err) throw err;
	  res.render("adminprofile", { title: "User List", userData: data });
	});
  });

    
app.get("/userprofile", function (req, res, next) {
	var sql = `SELECT * FROM user_profiles WHERE username="${req.session.username}"`;
	connection.query(sql, function (err, data, fields) {
	  if (err) throw err;
	  res.render("userprofile", { title: "User List", userData: data });
	});
  });




app.get('/bookingform', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/bookingform.html'));
});

app.get('/addtour', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/addtour.html'));
});

app.get('/deleteform', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/deleteform.html'));
});

app.post("/delete", function (request, response) {
	// Capture the input fields
	let tourid = request.body.tourid;
	let name = request.body.name;
	// Ensure the input fields exists and are not empty
  
	var sql = `DELETE FROM bookings WHERE tourID = "${tourid}"  AND name = "${name}"`;
	connection.query(sql, function (err, result) {
	  if (err) throw err;
	  console.log(result.affectedRows);
	  if (result.affectedRows == 0) response.send("No such booking");
	  else {
		console.log("deleted booking");
		response.redirect("/mybooking");
	  }
	});
  });

app.get('/addadmin', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/addadmin.html'));
});

app.get('/login', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/login.html'));
});

app.get("/register", function (request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + "/static/register.html"));
  });

app.get("/adminLogin", function (request, response) {
// Render login template
response.sendFile(path.join(__dirname + "/static/adminLogin.html"));
});

  

app.get('/northplaces', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		// response.send('Welcome back, ' + request.session.username + '!');
		var sql = `SELECT * FROM tours where category="North"`;
		connection.query(sql, function (err, data, fields) {
		if (err) throw err;
		response.render("northplaces", { title: "User List", userData: data });
		});

	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	// response.end();
});


app.get('/southplaces', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		// response.send('Welcome back, ' + request.session.username + '!');
		var sql = `SELECT * FROM tours where category="South"`;
		connection.query(sql, function (err, data, fields) {
		if (err) throw err;
		response.render("southplaces", { title: "User List", userData: data });
		});

	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	// response.end();
});

app.get('/eastplaces', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		// response.send('Welcome back, ' + request.session.username + '!');
		var sql = `SELECT * FROM tours where category="East"`;
		connection.query(sql, function (err, data, fields) {
		if (err) throw err;
		response.render("eastplaces", { title: "User List", userData: data });
		});

	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	// response.end();
});

app.get('/westplaces', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		// response.send('Welcome back, ' + request.session.username + '!');
		var sql = `SELECT * FROM tours where category="West"`;
		connection.query(sql, function (err, data, fields) {
		if (err) throw err;
		response.render("westplaces", { title: "User List", userData: data });
		});

	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	// response.end();
});


app.get('/admindashboard', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		// response.send('Welcome back, ' + request.session.username + '!');
		var sql = `SELECT * FROM tours`;
		connection.query(sql, function (err, data, fields) {
		if (err) throw err;
		response.render("admindashboard", { title: "User List", userData: data });
		});

	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	// response.end();
});





// http://localhost:3000/auth
app.post('/auth', function(request, response) {
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
});

app.post('/signout', function(request, response) {
 
	if (request.session.loggedin) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		 
			// if (error) throw error;
			// If the account exists
			request.session.loggedin = false;
			response.redirect("/")
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});




//register


app.post('/auth3', function(request, response) {
	// Capture the input fields
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
});


app.post("/booking", function (req, res, next) {
	inputData = {  
		// first_name: req.body.first_name,
		// last_name: req.body.last_name,
		name: req.body.name,
		tourID: req.body.tour,
		email: req.body.email,
		age: req.body.age,
		numberabv12: req.body.numberabv12,
		numberbelow12: req.body.numberbelow12,
		address: req.body.address,
		state: req.body.state,
		phone: req.body.phno,
		amount: 0,
		// gender: req.body.gender,
		// password: req.body.password,
		// confirm_password: req.body.confirm_password,
	  };  
	// check unique email address
	var sql = "SELECT * FROM bookings WHERE email =?";
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
		var sql = "INSERT INTO bookings SET ?";
		connection.query(sql, inputData, function (err, data) {
		  if (err) throw err;
		});
		
		var msg = "Package successfully booked.";
	  }
	  console.log(msg);
	  res.sendFile(path.join(__dirname + "/static/home.html"));
	});
  });


  app.post("/tours", function (req, res, next) {
	inputData = {  
		// first_name: req.body.first_name,
		// last_name: req.body.last_name,
		name: req.body.name,
		TourID: req.body.tour,
		destination: req.body.dest,
		agency: req.body.agency,
		datefrom: req.body.datefrom,
		dateto: req.body.dateto,  
		amount: req.body.amount,
		features: req.body.features,
		file_data: req.body.pic,
		category: req.body.cat,
		duration: req.body.dura,
		// gender: req.body.gender, 
		// password: req.body.password,
		// confirm_password: req.body.confirm_password,
	  };  
	// check unique email address
	var sql = "SELECT * FROM tours WHERE TourID =?";
	connection.query(sql, [inputData.TourID], function (err, data, fields) {
	  console.log(msg);
	  if (err) throw err;
	  if (data.length > 1) {
		var ans = inputData.TourID + "was already exist";
		// alert(ans);
	  }
	  // else if (inputData.confirm_password != inputData.password) {
	  //   var msg = "Password & Confirm Password is not Matched";
	  // }
	  else {
		// save users data into database
		var sql = "INSERT INTO tours SET ?";
		connection.query(sql, inputData, function (err, data) {
		  if (err) throw err;
		});
		
		var msg = "Tour successfully added.";
	  }
	  console.log(msg);
	  res.redirect("/admindashboard");
	});
  });



  app.post("/auth2", function (req, res, next) {
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
	  res.sendFile(path.join(__dirname + "/static/login.html"));
	});
  });


  app.post("/auth4", function (req, res, next) {
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
	  res.sendFile(path.join(__dirname + "/static/home.html"));
	});
  });

  //update password

  app.get("/updatepass", function (request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + "/static/updatepass.html"));
  });
  
  app.post("/updation", function (request, response) {
	// Capture the input fields
	let oldpass = request.body.oldpass;
	let newpass = request.body.newpass;
	// Ensure the input fields exists and are not empty
  
	var sql = `UPDATE accounts SET password = "${newpass}"  WHERE password = "${oldpass}" AND username = "${request.session.username}"`;
	connection.query(sql, function (err, result) {
	  if (err) throw err;
	  console.log(result.affectedRows);
	  if (result.affectedRows == 0) response.send("wrong old passowrd");
	  else {
		console.log("record(s) updated");
		response.redirect("/userprofile");
	  }
	});
  });


  //my bookings fetching
 
//   app.get("/mybooking", function (request, response) {
// 	// Render login template
// 	response.render("mybooking");
//   });

  app.get("/mybooking", function (req, res, next) {

	if (req.session.loggedin) {
		// Output username
		// response.send('Welcome back, ' + request.session.username + '!');
		var sql = `SELECT * FROM bookings where name="${req.session.username}"`;
	console.log(sql)
	connection.query(sql, function (err, data, fields) {
	  if (err) throw err;
	  console.log(data);
	  res.render("mybooking", { title: "User List", userData: data });
		 
	});

	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
	
  });

  app.get("/allbookings", function (req, res, next) {

	if (req.session.loggedin) {
		// Output username
		// response.send('Welcome back, ' + request.session.username + '!');
		var sql = `SELECT * FROM bookings`;
	console.log(sql)
	connection.query(sql, function (err, data, fields) {
	  if (err) throw err;
	  console.log(data);
	  res.render("allbookings", { title: "User List", userData: data });
		 
	});

	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
	
  });

  

  //access token.................................................................................
  


app.listen(3000);
