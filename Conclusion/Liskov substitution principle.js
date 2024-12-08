// Object <= Function <= AsyncFunction

const func = () => console.log("Func");
const asyncFunc = async () => console.log("Async Func");

setTimeout(func, 1000);
setTimeout(asyncFunc, 1000);