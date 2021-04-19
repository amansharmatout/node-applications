const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes/index");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv').config({path:'variables.env'});
const dotenv = require('dotenv');
dotenv.config();
app.use(
  session({
    secret: 'Ssdsd@#e$#Rfe@#$d#$#',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(routes);
// removeUsers();
// seedDB();

app.listen(5000, () => {
  console.log("Server is up and running");
});
