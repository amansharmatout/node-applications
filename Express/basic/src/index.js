const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
var exphbs = require("express-handlebars")

app.engine(
	"hbs", 
	exphbs({
		extname: "hbs",
		defaultLayout: "index",
		layoutsDir: "designs/",
	}),
)
app.set("view engine", "hbs");
app.set("views", __dirname + "/../designs");
app.use(bodyParser.urlencoded({ extended: true }));
const staticPath = path.join(__dirname, "../public");
console.log(staticPath);
// app.use(express.static(staticPath));
app.get("/", (req, res) => {
	res.render("index", {
		Name: "Aman",
	})
})

app.get("/", (req, res) => {
	res.send("hello world")
})

app.post("/", (req, res) => {
	res.status(200).contentType("text/html").send(req.body)
})

app.listen(5000, "127.5.5.5", (req, res) => {
	console.log("server started at 5000")
})
