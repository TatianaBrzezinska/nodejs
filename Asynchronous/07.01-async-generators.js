async function* createAsyncGenerator() {
  yield Promise.resolve(1);
  yield 2;
  yield 3;
}
const asyncGen = createAsyncGenerator();
asyncGen.next().then((res) => console.log(res.value));
asyncGen.next().then((res) => console.log(res.value));
asyncGen.next().then((res) => console.log(res.value));
