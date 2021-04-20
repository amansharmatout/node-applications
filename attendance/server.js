const http = require("http");
const fs = require("fs");
const path = require("path");
const ObjectsToCsv = require("objects-to-csv");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const nodemailer = require("nodemailer");
var user = { name: "aman sharma" };
const route = require("./routes/index");
const db = require("./model/db");
const mail = require("./routes/mail");

async function send(csv, res) {
  await csv.toDisk("./files/attendance.csv");
  let txt = `<a href='./files/attendance.csv' download='attendance.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>`;
  res.write(txt);
  res.end();
}

function compare_item(a, b) {
  // a should come before b in the sorted order
  if (
    parseInt(a.createdAt.split("/")[1]) < parseInt(b.createdAt.split("/")[1])
  ) {
    return -1;
    // a should come after b in the sorted order
  } else if (
    parseInt(a.createdAt.split("/")[1]) > parseInt(b.createdAt.split("/")[1])
  ) {
    return 1;
    // and and b are the same
  } else {
    if (
      parseInt(a.createdAt.split("/")[0]) < parseInt(b.createdAt.split("/")[0])
    ) {
      return -1;
      // a should come after b in the sorted order
    } else {
      return 1;
      // and and b are the same
    }
  }
}

function compare_date(a, b) {
  // a should come before b in the sorted order
  if (parseInt(a.Date.split("/")[1]) < parseInt(b.Date.split("/")[1])) {
    return -1;
    // a should come after b in the sorted order
  } else if (parseInt(a.Date.split("/")[1]) > parseInt(b.Date.split("/")[1])) {
    return 1;
    // and and b are the same
  } else {
    if (parseInt(a.Date.split("/")[0]) < parseInt(b.Date.split("/")[0])) {
      return -1;
      // a should come after b in the sorted order
    } else {
      return 1;
      // and and b are the same
    }
  }
}

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    if (req.url == "/" && req.method == "GET") {
      route.sendfile(req, res);
    } else if (req.url == "/login" && req.method == "POST") {
      req.on("data", (data) => {
        data = data.toString();
        let dt = new Date();
        user = {
          name: data.split("&")[0].split("=")[1],
          password: data.split("&")[1].split("=")[1],
          attendance: [
            {
              createdAt:
                dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear(),
            },
          ],
        };

        db.get_one(user).then(
          (success) => {
            console.log(success);
            let attnd = success.attendance;
            for (let x = 0; x < attnd.length; x++) {
              if (
                attnd[x].createdAt ==
                dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear()
              ) {
                attnd[x].entry = Date.now();
              }

              if (x == attnd.length - 1) {
                db.update(
                  { name: user.name, password: user.password },
                  { $set: { attendance: attnd } },
                ).then(
                  (succ) => {
                    req.url = "/todo.html";
                    console.log(succ);
                    route.sendfile(req, res);
                  },
                  (err) => {
                    req.url = "/list.html";
                    console.log(err);
                    route.sendfile(req, res);
                  },
                );
              }
            }
          },
          (err) => {
            req.url = "/list.html";
            console.log(err);
            route.sendfile(req, res);
          },
        );
      });
    } else if (req.url == "/user/attendance" && req.method == "POST") {
      req.on("data", (data) => {
        data = data.toString();
        user = {
          name: data.split("&")[0].split("=")[1],
          password: data.split("&")[1].split("=")[1],
        };
        db.get_one(user).then(
          (success) => {
            success.attendance.sort(compare_item);
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
<h2>Your Attendance</h2><table class="table table-fluid" id="myTable" border='1'> <thead> <tr><th>S. no</th><th>Date</th><th>Entry</th><th>Exit</th></tr> </thead>
<tbody>`;
            for (var x = 0; x < success.attendance.length; x++) {
              txt +=
                "<tr><td>" +
                (x + 1) +
                "</td><td>" +
                success.attendance[x].createdAt +
                "</td><td>" +
                new Date(success.attendance[x].entry).toTimeString() +
                "</td><td>" +
                new Date(success.attendance[x].exit).toTimeString() +
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
          (err) => {
            req.url = "/list.html";
            console.log(err);
            route.sendfile(req, res);
          },
        );
      });
    } else if (req.method == "GET" && req.url == "/logout") {
      db.get_one(user).then((success) => {
        console.log(success);
        let dt = new Date();
        let attnd = success.attendance;
        for (let x = 0; x < attnd.length; x++) {
          if (
            attnd[x].createdAt ==
            dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear()
          ) {
            attnd[x].exit = Date.now();
          }

          if (x == attnd.length - 1) {
            db.update(
              { name: user.name, password: user.password },
              { $set: { attendance: attnd } },
            ).then(
              (success) => {
                req.url = "/list.html";
                route.sendfile(req, res);
              },
              (err) => {
                req.url = "/todo.html";
                route.sendfile(req, res);
              },
            );
          }
        }
      });
    } else if (req.url == "/all_attendance") {
      req.on("data", (data) => {
        data = data.toString();
        user = {
          name: data.split("&")[0].split("=")[1],
          password: data.split("&")[1].split("=")[1],
        };

        db.get_one(user).then((success) => {
          if (success.admin) {
            db.get_all.then((result) => {
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
              for (let i = 0; i < result.length; i++) {
                for (var x = 0; x < result[i].attendance.length; x++) {
                  result[i].attendance.sort(compare_item);
                  txt +=
                    "<tr><td>" +
                    (x + 1) +
                    "</td><td>" +
                    result[i].name +
                    "</td><td>" +
                    result[i].attendance[x].createdAt +
                    "</td><td>" +
                    new Date(result[i].attendance[x].entry).toTimeString() +
                    "</td><td>" +
                    new Date(result[i].attendance[x].exit).toTimeString() +
                    "</td></tr>";
                }
              }
              txt += `</tbody></table></div>
                <div>
      <a href="/get_attendance.html"> Download File</a>
    </div>
    <div>
      <a href="/mail.html"> Get File by mail</a>
    </div>
          <a href="/logout">Log out</a>            
          </body><script>
          $(document).ready( function () {
          $('#myTable').DataTable();
      } );
      var select=document.getElementsByTagName('select')
          console.log(JSON.parse(select))
          </script></html>`;
              res.write(txt);
              res.end();
            });
          } else {
            res.write("You are not an admin.");
            res.end();
          }
        });
      });
    } else if (req.url == "/get_email" && req.method == "POST") {
      req.on("data", async function (data) {
        data = data.toString();
        data = data.split("=")[1];
        db.get_all.then(async (result) => {
          let jsonArray = [];
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            element.attendance.forEach(function (instance, indexx, record) {
              var tempArry = {
                Name: element.name,
                Date: record[indexx].createdAt,
                Entry: new Date(record[indexx].entry).toTimeString(),
                Exit: new Date(record[indexx].exit).toTimeString(),
              };
              jsonArray.push(tempArry);
            });
          }
          jsonArray.sort(compare_date);
          const csv = new ObjectsToCsv(jsonArray);
          console.log("before await............");
          await csv.toDisk("./files/attendance.csv");
          console.log("before", data);
          mail.send(data, res);
        });
      });
    } else if (req.url == "/data_export" && req.method == "POST") {
      req.on("data", (data) => {
        data = data.toString();
        user = {
          name: data.split("&")[0].split("=")[1],
          password: data.split("&")[1].split("=")[1],
        };
        db.get_one(user).then((success) => {
          if (success.admin) {
            db.get_all.then((result) => {
              let jsonArray = [];
              for (let index = 0; index < result.length; index++) {
                const element = result[index];
                element.attendance.forEach(function (instance, indexx, record) {
                  var tempArry = {
                    Name: element.name,
                    Date: record[indexx].createdAt,
                    Entry: new Date(record[indexx].entry).toTimeString(),
                    Exit: new Date(record[indexx].exit).toTimeString(),
                  };
                  jsonArray.push(tempArry);
                });
              }
              jsonArray.sort(compare_date);
              const csv = new ObjectsToCsv(jsonArray);
              send(csv, res);
            });
          }
        });
      });
    } else {
      route.sendfile(req, res);
    }
  })
  .listen(5000);

// db.Attendance.insert([
//     {
//         emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'12/5/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'16/5/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'20/5/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'24/5/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'28/5/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'31/5/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//         Date:'5/6/2021',
//         punch_in_at:1618221211983,
//         emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         punch_out_at:1618223211983
//     },{
//         Date:'10/6/2021',
//         emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//         Date:'15/6/2021',
//         emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'20/6/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//         Date:'25/6/2021',
//         emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//         Date:'30/6/2021',
//         emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
      
//         Date:'5/7/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//         Date:'10/7/2021',
//         emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'15/7/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'20/7/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'10/11/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'5/11/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'30/10/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'25/10/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'20/10/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'15/10/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'10/10/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//         Date:'5/10/2021',
//         emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'30/9/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'25/9/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'20/9/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'15/9/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'10/9/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//         Date:'5/9/2021',
//         emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'30/8/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     },{
//       emp_id:ObjectId("607404cc21bb3f14644aa843"),
//         Date:'25/7/2021',
//         punch_in_at:1618221211983,
//         punch_out_at:1618223211983
//     }
// ])



