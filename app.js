const bodyParser = require("body-parser");
const request = require("request");
const fileUpload = require("express-fileupload");
const express = require("express");

const app = express();
const port = process.env.PORT || 4000;
const hostname = "localhost";

let spawn = require("child_process").spawn;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(fileUpload());

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/predict", (req, res) => {
  let process = spawn("python", [
    "./utility/test.py",
    "Jirayu",
    "Laungwilawan"
  ]);

  process.stdout.on("data", function(data) {
    res.send(data.toString());
  });
});

app.post("/train", (req, res) => {
  let epchoNumber = req.body.epochNumber;
  console.log(epchoNumber);
  let process = spawn("python", [
    "./utility/emotionDetection/train.py",
    epchoNumber
  ]);
  // let process = spawn("python", [
  //   "./utility/test.py",
  //   "Jirayu",
  //   "Laungwilawan"
  // ]);
  console.log("Before stdout");

  process.stdout.on("data", function(data) {
    console.log(data);
  });
  res.sendStatus(200);
});

app.post("/upload/:emotion", (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }

  req.files.files.mv(
    "./dataset/" + req.params.emotion + "/" + req.files.files.name,
    function(err) {
      if (err) return res.status(500).send(err);
      res.send(req.files.files.name + " uploaded!");
    }
  );
});

app.post("/predict", (req, res) => {
  let msg = "Recieve";
  res.send(msg);
  res.sendStatus(200);
  console.log(msg);
  curl("reply", body);
});

const url = "https://localhost:8080/";

function curl(method, body) {
  console.log("method:" + method);
  request.post(
    {
      url: url + method,
      headers: HEADERS,
      body: body
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
      console.log(err);
    }
  );
}

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
