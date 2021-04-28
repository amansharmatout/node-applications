const mongoose = require("mongoose");
mongoose.connect(
	"mongodb://localhost:27017/employeemanagementsystem",
	(err) => {
		if (!err) {
			console.log("connect to mongodb is successful");
		} else {
			console.log("err..." + JSON.stringify(err, undefined, 2));
		}
	},
);
module.exports = mongoose;
