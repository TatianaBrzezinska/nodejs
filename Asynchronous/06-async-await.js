(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const a = new Promise((resolve) => setTimeout(resolve, 1000));
  const b = new Promise((resolve) => setTimeout(resolve, 1000));
  const c = new Promise((resolve) => setTimeout(resolve, 1000));
  const d = new Promise((resolve, reject) => setTimeout(reject, 1000));

  Promise.all([a, b, c, d])
    .then((results) => {
      console.log("results");
      console.log(results);
    })
    .catch(console.error);
})();
