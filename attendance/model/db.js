var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const route = require("../routes/index");

let login = async (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) console.log(err);
    var dbo = db.db("Employees");
  });
};
let get_one = async (user) => {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, (err, db) => {
      if (err) console.log(err);

      console.log("get_one ......................", user);
      var dbo = db.db("Employees");
      dbo
        .collection(`Employees`)
        .findOne(
          { name: user.name, password: user.password },
          (err, success) => {
            if (err || success == null) reject(err);
            console.log(err, success);
            resolve(success);
          },
        );
    });
  });
};
let get_all = new Promise((resolve, reject) => {
  MongoClient.connect(url, (err, db) => {
    if (err) console.log(err);
    var dbo = db.db("Employees");
    dbo
      .collection("Employees")
      .find()
      .toArray(function (err, result) {
        if (err) reject(err);
        db.close();
        resolve(result);
      });
  });
});
let update = async (user, set) => {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, (err, db) => {
      console.log("in the update", user, set);
      if (err) console.log(err);
      var dbo = db.db("Employees");
      dbo.collection("Employees").updateOne(user, set, (err, succ) => {
        if (err) reject(err);
        console.log(err, succ);
        resolve(succ);
      });
    });
  });
};
module.exports = {
  login,
  get_one,
  get_all,
  update,
};
