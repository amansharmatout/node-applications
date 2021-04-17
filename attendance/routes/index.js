var url = require("url");
var fs = require("fs");
const path=require('path');
exports.sendfile = (req, res) => {
  var q = url.parse(req.url, true);
  if (q.pathname == "/") q.pathname = "/list.html";
  var s = q.pathname.split(".");
  console.log(req.url,q.pathname)
  if (s[s.length - 1] == "html") {
    fs.readFile(__dirname + "/../views" + q.pathname, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.write(data);
      return res.end();
    });
  }
  else if (s[s.length - 1] == "css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.readFile(path.join(__dirname,'../',q.pathname), function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.write(data);
      return res.end();
    });
  }else if (s[s.length - 1] == "js") {
    res.writeHead(200, { "Content-Type": "text/JavaScript" });
    fs.readFile(path.join(__dirname,'../',q.pathname), function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.write(data);
      return res.end();
    });
  }else if (s[s.length - 1] == "csv") {
    res.writeHead(200, { "Content-Type": "text/csv" });
    fs.readFile(path.join(__dirname,'../',q.pathname), function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.write(data);
      return res.end();
    });
  }
//   fs.readFile(__dirname + "/../views" + q.pathname, function (err, data) {
//     if (err) {
//       res.writeHead(404, { "Content-Type": "text/html" });
//       return res.end("404 Not Found");
//     }
//     if (s[s.length - 1] == "html") {
//       res.writeHead(200, { "Content-Type": "text/html" });
//     } else if (s[s.length - 1] == "html") {
//       res.writeHead(200, { "Content-Type": "text/css" });
//     } else if (s[s.length - 1] == "js") {
//       res.writeHead(200, { "Content-Type": "text/JavaScript" });
//     }
//     res.write(data);
//     return res.end();
//   });
};
