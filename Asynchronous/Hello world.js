Promise.all([new Promise((resolve) => resolve("Hello world"))]).then(
  (value) => {
    console.log(value);
  },
);
