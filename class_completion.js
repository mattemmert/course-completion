const prompt = require("prompt-sync")();

let dateObj = new Date();

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
console.log(`The expected end of course is ${numWeeks} weeks from now`);

const numDays = numWeeks * 5;
// need endDate t0 be date + numDays and if that is greater than allMonths[month]
// then it needs to subtract allMonths[month] else, it just the addition
let endDate = date + numDays;
if (endDate > allMonths[month]) {
  let endDate = date + numDays - allMonths[month];
}

// create allMonths object with k:v and if date + numDays > allMonths[{month}],
// then month + 1, date = (date + numDays - however many days in current month)

if (endDate - allMonths[month] > 1) {
  console.log(
    `The expected end date is ${month + 1}/${
      endDate - allMonths[month]
    }/${year}`
  );
} else {
  console.log(`The expected end date is ${month}/${endDate}/${year}`);
}
