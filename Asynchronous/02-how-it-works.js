console.log("Start");

new Promise((resolve) => {
  resolve();
}).then((r) => {
  for (let i = 0; i < 100000; i++) {
    // some logic here
  }
  console.log("Then");
});

console.log("End");
