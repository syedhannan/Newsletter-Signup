const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(express.static("public")); //It is for Static folder.Since css and image files are static here we are creating a public folder and writing this statement
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  //   console.log(firstName, lastName, email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us20.api.mailchimp.com/3.0/lists/870b1893f1";
  const options = {
    method: "POST",
    auth: "hannan:b5029fb1499ce650f869530e508758d2-us20",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
// api key b5029fb1499ce650f869530e508758d2-us20
//audience id 870b1893f1
