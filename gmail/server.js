var http = require('http');
var path = require('path')
//var dt = require('./fmod');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/json'});
//   res.write("The area: " + dt.area(4));
//   res.end();
// }).listen(8080); 
var url = require('url')
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/json'});
//     // res.write("The area: " + req.url);
//     var q = url.parse(req.url, true).query;
//   var txt = q.year + " " + q.month;
//   res.write(txt)
//     res.end();
//   }).listen(8080); 
var mysql = require('mysql');


var fs = require('fs');
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = ".." + q.pathname;
    console.log('length', req.url.length)
    if (req.url.length > 100) {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root"
        });

        con.connect(function (err) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }
            var sql = `INSERT INTO customers (name, address,city,state,phone,fname,lname,email,zip,password) VALUES 
            ('${q.query.name}', '${q.query.address}','${q.query.city}','${q.query.state}','${q.query.phone}','${q.query.fname}','${q.query.lname}','${q.query.email}','${q.query.zip}','${q.query.pass}')`
            con.query('use mydb', function (err, result) {
                if (err) throw err;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("data inserted");
                    sql = 'select * from customers'
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        var i;
                        var txt = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>List</title>
                    </head>
                    <body><table border='1'> <tr><th>Username</th><th>city</th><th>E-mail</th> <th>phone</th></tr>`;
                        for (i = 0; i < result.length; i++) {
                            var user = result[i];
                            txt += `<tr><td>${user.name}</td><td>${user.city}</td><td>${user.email}</td><td>${user.phone}</td></tr>`
                        }
                        txt += `</table></body></html>`;
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(txt)
                        return res.end();
                    })
                });
            });

        });
    } else if (req.url.length > 30) {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root"
        });

        con.connect(function (err) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }
            con.query('use mydb', function (err, result) {
                var sql = `select * from customers where name='${q.query.uname}' and password='${q.query.psw}'`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    if (result.length == 0) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        return res.end("User Not Found. Please check credentials");
                    }
                    if (result[0].phone.length == 10) {
                        sql = 'select * from customers'
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            var i;
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
    <h2>List of Email Users</h2>
                    <table class="table table-fluid" id="myTable" border='1'> <thead> <tr><th>Username</th><th>city</th><th>E-mail</th> <th>phone</th></tr> </thead>
                    <tbody>`;
                            for (i = 0; i < result.length; i++) {
                                var user = result[i];
                                txt += `<tr><td>${user.name}</td><td>${user.city}</td><td>${user.email}</td><td>${user.phone}</td></tr>`
                            }
                            txt += `</tbody></table></div></body><script>
                            $(document).ready( function () {
                            $('#myTable').DataTable();
                        } );
                        var select=document.getElementsByTagName('select')
                            console.log(JSON.parse(select))
                            </script></html>`;
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write(txt)
                            return res.end();
                        })
                    }
                    else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        return res.end("404 Not Found");
                    }
                })
            })

        })
    } else {
        var s = q.pathname.split('.')
        fs.readFile(filename, function (err, data) {
            
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }
            if (s[s.length - 1] == 'html') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
            } else if (s[s.length - 1] == 'html') {
                res.writeHead(200, { 'Content-Type': 'text/css' });
            } else if (s[s.length - 1] == 'js') {
                res.writeHead(200, { 'Content-Type': 'text/JavaScript' });
            }
            res.write(data);
            return res.end();
        });
    }
}).listen(5000);
