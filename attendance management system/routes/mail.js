const nodemailer = require("nodemailer");
exports.send = async (data, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amansharma.tout@gmail.com",
      pass: "1932815aman",
    },
  });
  var mailOptions = {
    from: "amansharma.tout@gmail.com",
    to: data.email,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    attachments: [
      {
        filename: "attendance.csv",
        path: __dirname + "/../public/files/attendance.csv",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (info) {
        console.log(info.response);
        res.end("Email sent: " + info.response);
    } else {
      console.log(error);
      res.end(error);
    }
  });
};
