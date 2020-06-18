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

// define month, date, year and produce in m/d/yyyy format
let month = dateObj.getMonth() + 1;
let date = dateObj.getDate();
let year = dateObj.getFullYear();
console.log(`The course start date is ${month}/${date}/${year}`);

const numWeeks = prompt("Please enter target number of weeks: ");
const completionType = prompt(
  "Enter 'l' to display completion as lesson or 'p' to display as percentage: "
);
console.log(`The expected end of course is ${numWeeks} weeks from now`);

const numDays = numWeeks * 5;
// need endDate t0 be date + numDays and if that is greater than allMonths[month]
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

// completionMonth and completionDate are the ending values. I need to display every
// date between start and expected completion in the date column
// `${completionMonth}/${completionDate}/${year}`

// let completion = "";
// if (completionType === "p") {
//   let completion = Math.round(100 / numDays);
//   console.log(completion);
// }

const data = [
  {
    date: `${month}/${date}/${year}`,
  },
  { expectedCompletion: Math.round(100 / numDays) + "%" },
];

// write the data to the csv file
csvWriter
  .writeRecords(data)
  .then(() => console.log("File successfully created!"));
