setTimeout(() => {
  console.log("setTimeout");
}, 0);

new Promise((resolve) => {
  resolve();
}).then((r) => console.log("Promise"));

console.log("Am I last?");
