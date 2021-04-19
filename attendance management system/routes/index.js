const router = require("express").Router();
const fs = require("fs");
const db = require("..//model/db");
var user = null;
router.get("/", async (req, res) => {
  fs.readFile(__dirname + "/../views/list.html", (err, data) => {
    if (err) res.end(err);
    res.end(data);
  });
});
router.post("/login", (req, res) => {
  let dt = new Date();
  user = req.body;
  db.get_one(user).then(
    (result) => {
      if (result) {
        let attendance = {
          emp_id: result._id,
          Date: dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear(),
          punch_in_at: Date.now(),
        };
        db.create_attendance(attendance).then(
          (result) => {
            res.end("done");
          },
          (err) => {
            res.end("something went wrong");
          },
        );
      } else res.end("user not found");
    },
    (err) => {
      res.end(err);
    },
  );
});
router.post("/logout", (req, res) => {
  let dt = new Date();
  db.logout(req.body,
  ).then(
    (success) => {
      res.end("successfully logout");
    },
    (err) => {
      res.end("something went wrong..." + err);
    },
  );
});
router.post('/data_export',(req,res)=>{

});
router.post('/create',(req,res)=>{
    db.create(req.body).then(success=>{
        res.end('success')
    },err=>{
        res.end('something went wrong...'+err)
    })
});

module.exports = router;
