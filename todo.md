The lessons will need to be displayed in either number of lessons or percentage of total course. User determines whether the course will use lessons or percentage.

Either 20 lessons or 100 percent. Start date is NOT always the current date. Always set length of course in terms of weeks. CSV file should have a column for date (which is every day from start to end) as well as a column for lesson or % completion expected for that date (needs to add up, so day 1 is 5%, day 2 is 10%, etc).

The completion column should say 'lesson 5' or '5% completed'

Enter student name, enter course identifier (name or course #), enter # of weeks to finish, enter lesson or %. Output csv file as studentName.csv, (can i edit worksheet title?) with column for date and column for completion (lesson or % expected as corresponding to the date, as calculated by end date \* 5 school days/week).

\*\*6/19/20 - it works! You can enter student name, percentage, number of weeks, and it will output a csv where dates and percentages correctly line up!

To Do:
allow user to set start date

~allow user to set lessons or course percentage~

allow user to set directory where file will output or alternatively, allow for download?

add a variable to track which day of the week the date is and skip ones that correspond to Satuday and Sunday

only accept week input as 2, 3, 4 week -maybe not necessary
