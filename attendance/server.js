const excel = require("exceljs");
const http = require("http");
const os = require("os");
const uri = require("url");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const ObjectsToCsv = require("objects-to-csv");
var MongoClient = require("mongodb").MongoClient;
const { Console } = require("console");
var url = "mongodb://127.0.0.1:27017/";
var json2xls = require("json2xls");
const nodemailer = require("nodemailer");
var user = { name: "aman sharma" };

async function send(csv, res) {
  await csv.toDisk("./attendance.csv");
  let txt = `<a href='./attendance.csv' download='attendance.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>`;
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
    if (req.url == "/") {
      fs.readFile("./list.html", (err, data) => {
        if (err) console.error(err);
        res.write(data);
        return res.end();
      });
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
        // MongoClient.connect(url, (err, db) => {
        //   var dbo = db.db("Employees");
        //   dbo.collection("Employees").insertOne(user, (err, success) => {
        //     fs.readFile("./list.html", (err, data) => {
        //       if (err) console.error(err);
        //       res.write(data);
        //       return res.end();
        //     });
        //   });
        // });
        MongoClient.connect(url, function (err, db) {
          if (err) console.error(err);
          var dbo = db.db("Employees");
          try {
            let dt = new Date();
            dbo
              .collection(`Employees`)
              .findOne(
                { name: user.name, password: user.password },
                (err, success) => {
                  if (err) {
                    console.error(err);
                    fs.readFile("./list.html", (err, data) => {
                      if (err) console.error(err);
                      res.write(data);
                      return res.end();
                    });
                  }

                  let attnd = success.attendance;
                  for (let x = 0; x < attnd.length; x++) {
                    if (
                      attnd[x].createdAt ==
                      dt.getDate() +
                        "/" +
                        dt.getMonth() +
                        "/" +
                        dt.getFullYear()
                    ) {
                      attnd[x].entry = Date.now();
                    }

                    if (x == attnd.length - 1) {
                      dbo
                        .collection("Employees")
                        .updateOne(
                          { name: user.name, password: user.password },
                          { $set: { attendance: attnd } },
                          (err, succ) => {
                            db.close();
                            fs.readFile("./todo.html", (err, data) => {
                              if (err) console.error(err);
                              res.write(data);
                              return res.end();
                            });
                          },
                        );
                    }
                  }
                },
              );
          } catch (err) {}
        });
      });
    } else if (req.url == "/user/attendance" && req.method == "POST") {
      req.on("data", (data) => {
        data = data.toString();
        user = {
          name: data.split("&")[0].split("=")[1],
          password: data.split("&")[1].split("=")[1],
        };
        MongoClient.connect(url, (err, db) => {
          if (err) console.log(err);
          var dbo = db.db("Employees");
          dbo.collection("Employees").findOne(user, (err, success) => {
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
          });
        });
      });
    } else if (req.method == "GET" && req.url == "/logout") {
      MongoClient.connect(url, function (err, db) {
        if (err) console.error(err);
        var dbo = db.db("Employees");
        try {
          let dt = new Date();
          dbo
            .collection(`Employees`)
            .findOne(
              { name: user.name, password: user.password },
              (err, success) => {
                if (err) {
                  console.error(err);
                  fs.readFile("./todo.html", (err, data) => {
                    if (err) console.error(err);
                    res.write(data);
                    return res.end();
                  });
                }
                let attnd = success.attendance;
                for (let x = 0; x < attnd.length; x++) {
                  if (
                    attnd[x].createdAt ==
                    dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear()
                  ) {
                    attnd[x].exit = Date.now();
                  }

                  if (x == attnd.length - 1) {
                    dbo
                      .collection("Employees")
                      .updateOne(
                        { name: user.name, password: user.password },
                        { $set: { attendance: attnd } },
                        (err, succ) => {
                          db.close();
                          fs.readFile("./list.html", (err, data) => {
                            if (err) console.error(err);
                            res.write(data);
                            return res.end();
                          });
                        },
                      );
                  }
                }
              },
            );
        } catch (err) {}
      });
    } else if (req.url == "/login") {
      res.writeHead(200, { "Content-type": "text/html" });
      fs.readFile("./login.html", (err, data) => {
        if (err) console.error(err);
        res.write(data);
        return res.end();
      });
    } else if (req.url == "/admin_login") {
      res.writeHead(200, { "Content-type": "text/html" });
      fs.readFile("./admin_login.html", (err, data) => {
        if (err) console.error(err);
        res.write(data);
        return res.end();
      });
    } else if (req.url == "/all_attendance") {
      req.on("data", (data) => {
        data = data.toString();
        user = {
          name: data.split("&")[0].split("=")[1],
          password: data.split("&")[1].split("=")[1],
        };
        MongoClient.connect(url, (err, db) => {
          if (err) console.log(err);
          var dbo = db.db("Employees");
          dbo.collection("Employees").findOne(user, (err, success) => {
            if (success.admin) {
              dbo
                .collection("Employees")
                .find()
                .toArray(function (err, result) {
                  if (err) throw err;
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
                  db.close();
                });
            } else {
              res.write("You are not an admin.");
              res.end();
            }
          });
        });
      });
    } else if (req.url == "/mail.html") {
      fs.readFile("./mail.html", (err, data) => {
        if (err) console.log(err);
        res.write(data);
        res.end();
      });
    } else if (req.url == "/get_email" && req.method == "POST") {
      req.on("data", (data) => {
        data = data.toString();
        data = data.split("=")[1];
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "amansharma.tout@gmail.com",
            pass: "1932815aman",
          },
        });
        var mailOptions = {
          from: "amansharma.tout@gmail.com",
          to: data.split("%40")[0] + "@" + data.split("%40")[1],
          subject: "Sending Email using Node.js",
          text: "That was easy!",
          attachments: [
            {
              filename: "attendance.xlsx",
              path: __dirname + "/attendance.xlsx",
            },
          ],
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
            res.end();
          }
        });
      });
    } else if (req.url == "/data_export" && req.method == "POST") {
      req.on("data", (data) => {
        data = data.toString();
        user = {
          name: data.split("&")[0].split("=")[1],
          password: data.split("&")[1].split("=")[1],
        };
        MongoClient.connect(url, (err, db) => {
          if (err) console.log(err);
          var dbo = db.db("Employees");
          dbo.collection("Employees").findOne(user, (err, success) => {
            if (success.admin) {
              dbo
                .collection("Employees")
                .find()
                .toArray(function (err, result) {
                  if (err) throw err;
                  let jsonArray = [];
                  for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    element.attendance.forEach(function (
                      instance,
                      indexx,
                      record,
                    ) {
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
      });
    } else if (req.url == "/get_attendance.html") {
      fs.readFile("./get_attendance.html", (err, data) => {
        if (err) console.log(err);
        res.write(data);
        res.end();
      });
    } else if (req.url == "/attendance.csv") {
      fs.readFile("./attendance.csv", (err, data) => {
        res.write(data.toString());
        res.end();
      });
    } else {
      res.writeHead(404, { "Content-type": "text/html" });
      res.write("404 Error : Not Found.");
      return res.end();
    }
  })
  .listen(5000);

// db.Employees.updateOne({name:'harsh',password:'123'},{$set:{attendance:[
//     {
//         createdAt:'12/5/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'16/5/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'20/5/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'24/5/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'28/5/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'31/5/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'5/6/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'10/6/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'15/6/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'20/6/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'25/6/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'30/6/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'5/7/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'10/7/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'15/7/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'20/7/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'10/11/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'5/11/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'30/10/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'25/10/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'20/10/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'15/10/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'10/10/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'5/10/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'30/9/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'25/9/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'20/9/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'15/9/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'10/9/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'5/9/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'30/8/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     },{
//         createdAt:'25/7/2021',
//         entry:1618221211983,
//         exit:1618223211983
//     }
// ]}})
  