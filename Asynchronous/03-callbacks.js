function baseFunction() {
  console.log("I am base function!");
}

function iAmCallingBaseFn(callback) {
  //
  callback();
}

iAmCallingBaseFn(baseFunction);
