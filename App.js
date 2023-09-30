//template begin
const express = require('express');
const session = require('express-session');
const morgan = require('morgan')
const path = require('path');
const ejs = require("ejs");
const app = express();
const formRoutes = require('./routes/formRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const {connection} = require('./model/connection.js')
// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(morgan('dev'));
// app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')));
// app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))

// const connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',  
// 	password : 'kkyd1411',
// 	database : 'nodesql'
// });

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

//template end

// setting routes
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/landing.html'));
});

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



app.use('/form', formRoutes)

app.use('/auth' , authRoutes)

app.get('/login-admin' , (req , res) => {
	res.sendFile(path.join(__dirname + '/static/login-admin.html'));
})

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


app.get('/login', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/login.html'));
});

app.get("/register", function (request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + "/static/register.html"));
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