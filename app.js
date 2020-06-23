const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const path = require("path");
const dp = require("./dataPush");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const dateObj = new Date();
let startDate = dateObj.getDay();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/public/index.html"))
);

app.post("/success", (req, res) =>
  res.sendFile(path.join(__dirname + "/public/success.html"))
);

// maybe do a redirect or send a message saying that request was successful
let numLessons = 20;
let currentDate = dateObj.getDate();

app.post(
  "/",
  (req, res, next) => {
    console.log("Received post data:", req.body);
    res.redirect(307, "/success");

    if (req.body.completionType === "l") {
      dp.setDatesLessons(
        currentDate,
        req.body.numWeeks * 7,
        req.body.numWeeks * 5
      );
      console.log(dp.data);
    } else {
      dp.setDatesPercent(
        currentDate,
        req.body.numWeeks * 7,
        req.body.numWeeks * 5
      );
      console.log(dp.data);
    }
    next();
  },
  function (req, res, next) {
    csvWriter = createCsvWriter({
      path: req.body.studentName + ".csv",
      header: [
        { id: "date", title: "Date" },
        { id: "expectedCompletion", title: "Expected Completion" },
      ],
    });
    next();
  },
  function (req, res, next) {
    csvWriter.writeRecords(dp.data);
    console.log("File successfully created!");
    next();
  },
  function (req, res, next) {
    dp.reset();
    next();
  }
);
app.listen(port, () => console.log(`Started server on port ${port}`));
