const fs = require("fs");

console.log("Start");

const fileContent = fs.readFileSync(`${__dirname}/some-file.txt`);
console.log(fileContent);
console.log("End");

console.log("Start");
a;
fs.readFile(`${__dirname}/some-file.txt`, () => {
  console.log("Read some file");
});

console.log("End");
