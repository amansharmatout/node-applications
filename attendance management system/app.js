const express = require("express");
const app = express();
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes/index");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config({ path: "variables.env" });
const dotenv = require("dotenv");
dotenv.config();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Attendance Management System",
			version: "1.0.0",
			description: "A simple attendance management with modern features.",
		},
		servers: [{ url: "http://localhost:5000" }],
	},
	apis: ["./routes/index.js"],
};
const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
app.use(express.static(__dirname + "/public"));
app.use(
	session({
		secret: "Ssdsd@#e$#Rfe@#$d#$#",
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(routes);

app.listen(5000, () => {
	console.log("Server is up and running");
});
