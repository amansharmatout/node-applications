const upload = require("../middleware/upload");
var fs = require('fs');
const path = require("path");
const multipleUpload = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    var newData = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Files</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
          <style>
            img {
              width: 200px;
              height: 500px;
            }
          </style>`

    // directory logic ............................................................

    fs.readdir(`${__dirname}/../upload/`, (err, element) => {
      console.log(element);
      for (let i = 0; i < element.length; i++) {
        console.log(element.length, i, newData);
        let idata = element[i];
        newData += `<img class="img-fluid" src="../upload/${idata}" alt="" >`;
        if (i == (element.length - 1)) {
          newData += `</body></html>`;
          fs.writeFile(`${__dirname}/../views/show.html`, newData, (err) => {
            return res.sendFile(path.join(`${__dirname}/../views/show.html`));
          });
        }
      }

    });


    // EOF.............................................................






    // return res.send(`Files has been uploaded.`);


  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

module.exports = {
  multipleUpload: multipleUpload
};
