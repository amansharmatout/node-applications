const router = require("express").Router();
const fs = require("fs");
const db = require("..//model/db");
const path = require("path");
const ObjectsToCsv = require("objects-to-csv");
var user = null;
const mail = require("./mail");
const sort = require("../routes/sort");
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - password
 *         - leads
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated id of the employee
 *         name:
 *           type: string
 *           description: The name of Employee
 *         role:
 *           type: integer
 *           description: The no. of role situated in role collection.
 *         password:
 *           type: string
 *           description: The password of Employee.
 *         leads:
 *           type: array
 *           description: The id's of team leaders of Employee.
 *       example:
 *         id: 983424798781
 *         name: aman sharma
 *         role: 2
 *         password: 1897138916
 *         leads: ["2379409238","28374278","78243972897"]
 *
 * */

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee_login:
 *       type: object
 *       required:
 *         - name
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of Employee
 *         password:
 *           type: string
 *           description: The password of Employee.
 *       example:
 *         name: "string"
 *         password: "string"
 *
 * */

/**
 * @swagger
 * tags:
 *   name: Attendance Management System
 *   description: The Employee Attendance Management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       required:
 *         - emp_id
 *         - Date
 *         - punch_in_at
 *         - punch_out_at
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated id of the attendance
 *         emp_id:
 *           type: ObjectId
 *           description: The id of the Employee
 *         Date:
 *           type: string
 *           description: The Date of attendance.
 *         punch_in_at:
 *           type: integer
 *           description: The login time of employee.
 *         punch_out_at:
 *           type: integer
 *           description: The log out time of employee. *
 *       example:
 *         id: 983424798781
 *         emp_id: 1897138916
 *         Date: "10/03/2021"
 *         punch_in_at: 1897138916
 *         punch_out_at: 23794092386
 *
 * */

/**
 * @swagger
 * components:
 *   schemas:
 *     Roles:
 *       type: object
 *       required:
 *         - _id
 *         - role
 *       properties:
 *         _id:
 *           type: integer
 *           description: The predefined id for role.
 *         role:
 *           type: string
 *           description: The role.
 *       example:
 *         _id: 1
 *         role: "Company Manager"
 * */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns the html login page
 *     tags: [Attendance Management System]
 *     responses:
 *       200:
 *         description: the html page for login
 *         content:
 *           text/html:
 */
router.get("/", async (req, res) => {
	console.log(req.url);
	fs.readFile(__dirname + "/../views/list.html", (err, data) => {
		if (err) res.end(err);
		res.end(data);
	});
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login employee and creates attendance
 *     tags: [Attendance Management System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee_login'
 *     responses:
 *       200:
 *         description: The employee was successfully logged in.
 *         content:
 *           text/html:
 *             schema:
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */
router.post("/login", (req, res) => {
	console.log(req.url, req.body);
	let dt = new Date();
	user = req.body;
	db.get_one(user).then(
		result => {
			if (result) {
				let attendance = {
					emp_id: result._id,
					Date: dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear(),
					punch_in_at: Date.now(),
				};
				db.create_attendance(attendance).then(
					result => {
						fs.readFile(__dirname + "/../views/todo.html", (err, data) => {
							if (err) res.end(err);
							res.writeHead(200, { "Content-type": "text/html" });
							res.end(data);
						});
					},
					err => {
						res.writeHead(500, { "Content-type": "text/html" });
						res.end("something went wrong");
					},
				);
			} else {
				res.writeHead(404, { "Content-type": "text/html" });
				res.end("User not found");
			}
		},
		err => {
			res.writeHead(500, { "Content-type": "text/html" });
			res.end("Something went wrong");
		},
	);
});
router.get("/login.html", (req, res) => {
	fs.readFile(__dirname + "/../views/login.html", (err, data) => {
		if (err) res.end(err);
		res.end(data);
	});
});
router.get("/admin_login.html", (req, res) => {
	console.log(req.url);

	fs.readFile(__dirname + "/../views/admin_login.html", (err, data) => {
		res.write(data);
		res.end();
	});
});
router.get("/mail.html", (req, res) => {
	console.log(req.url);
	fs.readFile(__dirname + "/../views/mail.html", (err, data) => {
		res.write(data);
		res.end();
	});
});
router.get("/create.html", (req, res) => {
	console.log(req.url);
	fs.readFile(__dirname + "/../views/create.html", (err, data) => {
		res.write(data);
		res.end();
	});
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout employee and update logout time in attendance
 *     tags: [Attendance Management System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee_login'
 *     responses:
 *       200:
 *         description: The employee was successfully logged out.
 *         content:
 *           text/html:
 *             schema:
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */
router.post("/logout", (req, res) => {
	console.log(req.url);
	let dt = new Date();
	user = req.body;
	db.get_one(user).then(
		result => {
			if (result) {
				db.logout(user).then(
					success => {
						fs.readFile(__dirname + "/../views/list.html", (err, data) => {
							if (err) res.end(err);
							res.writeHead(200, { "Content-type": "text/html" });
							res.end(data);
						});
					},
					err => {
						res.writeHead(500, { "Content-type": "text/html" });
						res.end("something went wrong..." + err);
					},
				);
			}
		},
		err => {
			res.writeHead(404, { "Content-type": "text/html" });
			res.end("user not found");
		},
	);
});
async function send(csv, res) {
	console.log(path.join(__dirname, "/../files/attendance.csv"));
	await csv.toDisk(path.join(__dirname, "/../public/files/attendance.csv"));
	let txt = `<a href='/files/attendance.csv' download='attendance.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>`;
	res.write(txt);
	res.end();
}
/**
 * @swagger
 * /data_export:
 *   post:
 *     summary: Returns all employee attendance in a csv file.
 *     tags: [Attendance Management System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee_login'
 *     responses:
 *       200:
 *         description: file downloaded successfully.
 *         content:
 *           text/css:
 *             schema:
 *       404:
 *         description:  File Not found
 *       500:
 *         description: Something went wrong
 */
router.post("/data_export", (req, res) => {
	console.log(req.url);
	db.get_one(req.body).then(result => {
		if (result.admin) {
			db.get_attendance().then(success => {
				let jsonArray = [];
				success.sort(sort.compare_item);
				for (let index = 0; index < success.length; index++) {
					const element = success[index];
					jsonArray.push({
						Name: element.employee[0].name,
						Date: element.Date,
						Entry: new Date(element.punch_in_at).toTimeString(),
						Exit: new Date(element.punch_out_at).toTimeString(),
					});
				}
				const csv = new ObjectsToCsv(jsonArray);
				send(csv, res);
			});
		}
	});
});

/**
 * @swagger
 * /user/attendance:
 *   post:
 *     summary: Returns single employee attendance in HTML Table.
 *     tags: [Attendance Management System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee_login'
 *     responses:
 *       200:
 *         description: HTML Table of attendance of corresponding user.
 *         content:
 *           text/html:
 *             schema:
 *       404:
 *         description:  User Not found
 *       500:
 *         description: Something went wrong
 */
router.post("/user/attendance", (req, res) => {
	console.log(req.url);
	console.log(req.body);
	db.get_one(req.body).then(
		result => {
			if (result) {
				db.get_attendance_by_user(result._id).then(
					success => {
						res.writeHead(200, { "Content-type": "text/html" });
						var txt = `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>List</title>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>

<script
src="http://code.jquery.com/jquery-3.3.1.min.js"
integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" ></script>
          </head>
          <body>
          <div class="container">
<h2>Your Attendance</h2><table class="table table-fluid" id="myTable" border='1'> <thead> <tr><th>S. no</th><th>Name</th><th>Date</th><th>Entry</th><th>Exit</th></tr> </thead>
<tbody>`;
						success.sort(sort.compare_item);
						console.log(JSON.stringify(success[0]));
						for (let i = 0; i < success.length; i++) {
							txt +=
								"<tr><td>" +
								(i + 1) +
								"</td><td>" +
								success[i].employee[0].name +
								"</td><td>" +
								success[i].Date +
								"</td><td>" +
								new Date(success[i].punch_in_at).toTimeString() +
								"</td><td>" +
								new Date(success[i].punch_out_at).toTimeString() +
								"</td></tr>";
						}
						txt += `</tbody></table></div>
          <a href="/logout">Log out</a>
          </body><script>
          $(document).ready( function () {
          $('#myTable').DataTable();
      } );
      var select=document.getElementsByTagName('select')         
          </script></html>`;
						res.write(txt);
						res.end();
					},
					err => {
						res.writeHead(500, { "Content-type": "text/html" });
						res.end("Something went wrong");
					},
				);
			} else {
				res.writeHead(404, { "Content-type": "text/html" });
				res.end("User not found");
			}
		},
		err => {
			res.writeHead(404, { "Content-type": "text/html" });
			res.end("User not found");
		},
	);
});

/**
 * @swagger
 * /get_users:
 *   get:
 *     summary: Returns the list of all employees
 *     tags: [Attendance Management System]
 *     responses:
 *       200:
 *         description: The list of employees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/get_users", (req, res) => {
	console.log(req.url);
	db.get_all_employee.then(success => {
		res.json(success);
	});
});
/**
 * @swagger
 * /all_attendance:
 *   post:
 *     summary: Returns all employee's attendance in HTML Table.
 *     tags: [Attendance Management System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee_login'
 *     responses:
 *       200:
 *         description: HTML Table of attendance of all employee.
 *         content:
 *           text/html:
 *             schema:
 *       404:
 *         description:  User Not found
 *       500:
 *         description: Something went wrong
 */
router.post("/all_attendance", (req, res) => {
	console.log(req.url);
	user = req.body;
	db.get_one(req.body).then(
		result => {
			if (result.role == 1) {
				db.get_attendance().then(
					success => {
						res.writeHead(200, { "Content-type": "text/html" });
						var txt = `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>List</title>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>

<script
src="http://code.jquery.com/jquery-3.3.1.min.js"
integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" ></script>
<link rel="stylesheet" href="/css/common.css">
          </head>
          <body>
          <div class="panel panel-default">
          <div class="panel-heading">
            <h1 style="text-align:center;">Attendance management system</h1>
          </div>
          <div class="panel-body d-flex justify-content-around">
            <a href="/get_attendance.html" class="btn btn-primary">Download File</a>
            <a href="/mail.html" class="btn btn-primary ">Get File by mail</a>
            <a href="/create.html" class="btn btn-primary ">Add Employee</a>
          </div>

          </div>
          
    </div>
          </div>
          <div class="container">
<table class="table table-fluid" id="myTable" border='1'> <thead> <tr><th>S. no</th><th>Name</th><th>Date</th><th>Entry</th><th>Exit</th></tr> </thead>
<tbody>`;
						success.sort(sort.compare_item);
						console.log(JSON.stringify(success[0]));
						for (let i = 0; i < success.length; i++) {
							txt +=
								"<tr><td>" +
								(i + 1) +
								"</td><td>" +
								success[i].employee[0].name +
								"</td><td>" +
								success[i].Date +
								"</td><td>" +
								new Date(success[i].punch_in_at).toTimeString() +
								"</td><td>" +
								new Date(success[i].punch_out_at).toTimeString() +
								"</td></tr>";
						}
						txt += `</tbody></table></div>
            
          
          <a class="btn btn-primary" href="/logout">Log out</a>
          </body><script>
          $(document).ready( function () {
          $('#myTable').DataTable();
      } );
      var select=document.getElementsByTagName('select')         
          </script></html>`;
						res.write(txt);
						res.end();
					},
					err => {
						res.end("error..." + err);
					},
				);
			} else {
				db.get_attendance_by_user(result._id).then(
					success => {
						res.writeHead(200, { "Content-type": "text/html" });
						var txt = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>List</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
  
  <script
  src="http://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
  <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" ></script>
            </head>
            <body>
            <div class="container">
  <h2>Your Attendance</h2><table class="table table-fluid" id="myTable" border='1'> <thead> <tr><th>S. no</th><th>Name</th><th>Date</th><th>Entry</th><th>Exit</th></tr> </thead>
  <tbody>`;
						success.sort(sort.compare_item);
						console.log(JSON.stringify(success[0]));
						for (let i = 0; i < success.length; i++) {
							txt +=
								"<tr><td>" +
								(i + 1) +
								"</td><td>" +
								success[i].employee[0].name +
								"</td><td>" +
								success[i].Date +
								"</td><td>" +
								new Date(success[i].punch_in_at).toTimeString() +
								"</td><td>" +
								new Date(success[i].punch_out_at).toTimeString() +
								"</td></tr>";
						}
						txt += `</tbody></table></div>
            <a href="/logout">Log out</a>
            </body><script>
            $(document).ready( function () {
            $('#myTable').DataTable();
        } );
        var select=document.getElementsByTagName('select')         
            </script></html>`;
						res.write(txt);
						res.end();
					},
					err => {
						res.end("error..." + err);
					},
				);
			}
		},
		err => {
			res.end("error..." + err);
		},
	);
});
router.get("/get_attendance.html", (req, res) => {
	fs.readFile(__dirname + "/../views/get_attendance.html", (err, data) => {
		res.end(data);
	});
});

/**
 * @swagger
 * /create:
 *   post:
 *     summary: creates employee and returns the same.
 *     tags: [Attendance Management System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: returns created user in the form of json.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Something went wrong
 */
router.post("/create", (req, res) => {
	console.log(req.url);
	console.log(req.body);
	db.create(req.body).then(
		success => {
			res.writeHead(200, { "Content-type": "application/json" });
			res.end(req.body);
		},
		err => {
			res.writeHead(500, { "Content-type": "application/json" });
			res.end({ message: "something went wrong..." });
		},
	);
});
/**
 * @swagger
 * /create:
 *   post:
 *     summary: sends all employees attendance data to the corresponding email.
 *     tags: [Attendance Management System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: returns created user in the form of json.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Something went wrong
 */
router.post("/get_email", (req, res) => {
	console.log(req.body.email);
	db.get_attendance().then(
		success => {
			let jsonArray = [];
			success.sort(sort.compare_item);
			for (let index = 0; index < success.length; index++) {
				const element = success[index];
				jsonArray.push({
					Name: element.employee[0].name,
					Date: element.Date,
					Entry: new Date(element.punch_in_at).toTimeString(),
					Exit: new Date(element.punch_out_at).toTimeString(),
				});
			}
			const csv = new ObjectsToCsv(jsonArray);
			csv
				.toDisk(path.join(__dirname, "/../public/files/attendance.csv"))
				.then(success => {
					console.log("sending...");
					mail.send(req.body, res);
				});
		},
		err => {
			res.end("error " + err);
		},
	);
});
module.exports = router;
