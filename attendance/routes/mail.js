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
    to: data.split("%40")[0] + "@" + data.split("%40")[1],
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    attachments: [
      {
        filename: "attendance.csv",
        path: __dirname + "/../files/attendance.csv",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      condole.log(info.response);
      res.end("Email sent: " + info.response);
    }
  });
};
