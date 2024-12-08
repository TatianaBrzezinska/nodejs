const fetchData = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`ID: ${id}`);
    }, 1000);
  });
};

const ids = [1, 2, 3, 4];

(async () => {
  for await (const id of ids) {
    const result = await fetchData(id);
    console.log(result);
  }
})();
