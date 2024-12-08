const fs = require("fs");
const path = require("path");
const migrationsDir = path.join(__dirname, "migrations");

const migration = () => {
  fs.readdir(migrationsDir, (err, files) => {
    if (err) {
      return;
    }
    files.forEach((file) => {
      console.log(file);
      const filePath = path.join(migrationsDir, file);

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return;
        }
        // console.log(data);
      });
    });
  });
};

// migration();
// Steps to execute:
// Read last migration,
// Check if file-name migration exist.
// How to use?
// node run-migration.js
console.log("Hello students");
