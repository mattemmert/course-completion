const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const path = require("path");
const cp = require("./csv_processor");

const dateObj = new Date();
let startDate = dateObj.getDay();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/public/index.html"))
);

// maybe do a redirect or send a message saying that request was successful
app.post("/", (req, res) => {
  console.log("Received post data:", req.body);
  // res.sendStatus(200);
  res.send(req.body);
});

app.listen(port, () => console.log(`Started server on port ${port}`));
