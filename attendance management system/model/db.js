var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const route = require("../routes/index");

let create_attendance = (attnd) => {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, (err, db) => {
      let dbo = db.db("Employees");
      dbo.collection("Attendance").insertOne(attnd, (err, success) => {
        if (err || success == null) reject(err);
        console.log(err, success);
        resolve(success);
      });
    });
  });
};
let create = (user) => {
  return new Promise(function (resolve, reject) {
      console.log(user,'here');
    MongoClient.connect(url, (err, db) => {
      if (err) console.log(err);
      var dbo = db.db("Employees");
      dbo.collection(`Employees`).insertOne(user, (err, success) => {
        if (err || success == null) reject(err);
        console.log(err, success);
        resolve(success);
      });
    });
  });
};
let get_one = async (user) => {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, (err, db) => {
      if (err) console.log(err);
      var dbo = db.db("Employees");
      dbo.collection(`Employees`).findOne(user, (err, success) => {
        if (err || success == null) reject(err);
        console.log(err, success);
        resolve(success);
      });
    });
  });
};
let logout = (user) => {
  return new Promise(function (resolve, reject) {
    let dt = new Date();
    let date = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
    MongoClient.connect(url, (err, db) => {
      if (err) console.log(err);
      var dbo = db.db("Employees");
      get_one({name:user.name,password:user.password}).then(
        (success) => {
          dbo
            .collection("Attendance")
            .updateOne(
              { emp_id: success._id, Date: date },
              { $set: { punch_out_at: Date.now() } },
              (err, result) => {
                if (err || result == null) reject(err);
                resolve(result);
              },
            );
        },
        (err) => {},
      );
    });
  });
};
let get_all_employee = new Promise((resolve, reject) => {
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
let get_attendance = async (id) => {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, (err, db) => {
      if (err) console.log(err);
      var dbo = db.db("Employees");
      dbo
        .collection("Employees")
        .findOne({ emp_id: id })
        .toArray(function (err, result) {
          if (err) reject(err);
          db.close();
          resolve(result);
        });
    });
  });
};
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
  get_one,
  get_all_employee,
  update,
  get_attendance,
  create,
  create_attendance,
  logout,
};
