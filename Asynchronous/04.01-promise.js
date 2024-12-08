const promiseA = new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, 1000);
});

const promiseB = new Promise((resolve) => {
  resolve(true);
});

promiseA.then((value) => console.log(`First Promise: ${value}`));
promiseB.then((value) => console.log(`Second Promise: ${value}`));

console.log("End");
