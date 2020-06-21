// instantiate csv-writer and set up the filename and column headers
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: `${studentName}.csv`,
  header: [
    { id: "date", title: "Date" },
    { id: "expectedCompletion", title: "Expected Completion" },
  ],
});

// studentName, startDate, numWeeks, completionType will come from web form

// use days of month and days of week to set up dates on csv file
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

let numDays = numWeeks * 7;
let daysToComplete = numWeeks * 5;
// need endDate to be date + numDays and if that is greater than allMonths[month]
// then it needs to subtract allMonths[month] else, it just the addition
let endDate = date + numDays;
if (endDate > allMonths[month]) {
  let endDate = date + numDays - allMonths[month];
}

// determine end date for course and correctly set month value when class spans two months
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
