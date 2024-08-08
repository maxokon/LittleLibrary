Little Library is a small book management SPA made for COMP1004 module. 
It lets users to keep track on books they own and on books they had read. 
They can save entries they have added to a flat files and re-upload them later on to add new entries or change existing ones.

Files randomBooks.csv and randomBooks.json are included for tests. 

!! KNOWN ISSUES:
- randomBooks.json is the only json file that can be read by Little Library
- I used fetch api  to read the json file, it might not work without a live server, but other functions work fine
- excel does not like any special symbols, so there will be unexpected symbols in csv files, but nothing too annoying 
