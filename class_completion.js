// I added this on the lesson-param branch

const prompt = require("prompt-sync")();
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// because student name is used as output file name, it's declared here
const studentName = prompt("Please enter student name: ");

// create csvWriter instance with output file path and column headers
const csvWriter = createCsvWriter({
  path: `${studentName}.csv`,
  header: [
    { id: "date", title: "Date" },
    { id: "expectedCompletion", title: "Expected Completion" },
  ],
});

// create the date object to manipulate all date information
const dateObj = new Date();

// this object is to find the end of the current month and roll over to the next
// month when the expected course completion date goes past end of current month
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

// define month, date, year and produce in m/d/yyyy format
let month = dateObj.getMonth() + 1;
let date = dateObj.getDate();
let year = dateObj.getFullYear();

console.log(`The course start date is ${month}/${date}/${year}`);

let day = prompt("Please enter the current weekday (m, tu, w, th, f): ");
const numWeeks = prompt("Please enter target number of weeks: ");

const completionType = prompt(
  "Enter 'l' to display completion as lesson or 'p' to display as percentage: "
);
console.log(`The expected end of course is ${numWeeks} weeks from now`);

// numDays will let us set dates correctly and daystoComplete to set lesson progress
let numDays = numWeeks * 7;
let daysToComplete = numWeeks * 5;
// need endDate to be date + numDays and if that is greater than allMonths[month]
// then it needs to subtract allMonths[month] else, it just the addition
let endDate = date + numDays;
if (endDate > allMonths[month]) {
  let endDate = date + numDays - allMonths[month];
}

// only problem is if the course goes past the second month, but I thnk this
// is not a common situation
let completionDate = "";
let completionMonth = "";
if (endDate - allMonths[month] > 1) {
  completionDate = endDate - allMonths[month];
  completionMonth = `${month + 1}`;
  console.log(
    `The expected end date is ${month + 1}/${
      endDate - allMonths[month]
    }/${year}`
  );
} else {
  completionDate = endDate;
  console.log(`The expected end date is ${month}/${endDate}/${year}`);
}

// store the data that will be written to the csv file
const data = [];

let x = daysOfWeek[day];

// Used one function to generate dates and completion as they belong to one object
function setDatesPercent(startDate, classLength) {
  let i = 1;
  for (let d = startDate; d < startDate + classLength; d++) {
    if (x % 7 === 5 || x % 7 === 6) {
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
function setDatesLessons(startDate, classLength) {
  let i = Math.round(numLessons / daysToComplete);
  for (let d = startDate; d < startDate + classLength; d++) {
    if (x % 7 === 5 || x % 7 === 6) {
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

// run the function corresponding to lessons or percentage
if (completionType === "p") {
  setDatesPercent(date, numDays);
} else {
  setDatesLessons(date, numDays);
}

// write the data to the csv file
csvWriter
  .writeRecords(data)
  .then(() => console.log("File successfully created!"));
