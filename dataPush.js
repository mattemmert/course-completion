const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: `placeholder.csv`,
  header: [
    { id: "date", title: "Date" },
    { id: "expectedCompletion", title: "Expected Completion" },
  ],
});

const allMonths = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

// set variable for days of week to skip weekend dates on csv file
const daysOfWeek = {
  m: 0,
  tu: 1,
  w: 2,
  th: 3,
  f: 4,
  sa: 5,
  su: 6,
};

const dateObj = new Date();
let month = dateObj.getMonth() + 1;
let date = dateObj.getDate();
let year = dateObj.getFullYear();

// store the data that will be written to the csv file
let data = [];
let x = new Date().getDay();

// Used one function to generate dates and completion as they belong to one object
function setDatesPercent(startDate, classLength, daysToComplete) {
  let i = 1;
  for (let d = startDate; d < startDate + classLength; d++) {
    if (x % 7 === 6 || x % 7 === 0) {
      data.push({ date: "", expectedCompletion: "" });
      i--;
    } else {
      if (d <= allMonths[month]) {
        data.push({
          date: `${month}/${d}/${year}`,
          expectedCompletion: Math.round((100 / daysToComplete) * i) + "%",
        });
      } else {
        data.push({
          date: `${month + 1}/${d % allMonths[month]}/${year}`,
          expectedCompletion: Math.round((100 / daysToComplete) * i) + "%",
        });
      }
    }
    i++;
    x++;
  }
}

// always 20 lessons
const numLessons = 20;

// right now i don't think it tells it to not print
function setDatesLessons(startDate, classLength, daysToComplete) {
  let i = Math.round(numLessons / daysToComplete);
  for (let d = startDate; d < startDate + classLength; d++) {
    if (x % 7 === 6 || x % 7 === 0) {
      data.push({ date: "", expectedCompletion: "" });
    } else {
      if (d <= allMonths[month]) {
        data.push({
          date: `${month}/${d}/${year}`,
          expectedCompletion: Math.round(i) + " lessons",
        });
      } else {
        data.push({
          date: `${month + 1}/${d % allMonths[month]}/${year}`,
          expectedCompletion: Math.round(i) + " lessons",
        });
      }
      i += numLessons / daysToComplete;
    }
    x++;
  }
}

function reset() {
  for (let y = data.length; y > 0; y--) {
    data.shift();
  }
}

exports.setDatesLessons = setDatesLessons;
exports.setDatesPercent = setDatesPercent;
exports.data = data;
exports.reset = reset;
