const {
  Worker,
  isMainThread,
  workerData,
  parentPort,
} = require("worker_threads");

if (isMainThread) {
  const sharedBuffer = new SharedArrayBuffer(4); // Allocate memory for both threads
  const sharedCounter = new Int32Array(sharedBuffer); // get value
  sharedCounter[0] = 0;

  const worker1 = new Worker(__filename, { workerData: sharedBuffer });
  const worker2 = new Worker(__filename, { workerData: sharedBuffer });

  let completedWorkers = 0;
  const onWorkerExit = () => {
    completedWorkers++;
    if (completedWorkers === 2) {
      console.log("Final Counter Value:", sharedCounter[0]);
    }
  };

  worker1.on("exit", onWorkerExit);
  worker2.on("exit", onWorkerExit);
} else {
  const sharedCounter = new Int32Array(workerData);
  for (let i = 0; i < 100000; i++) {
    sharedCounter[0]++;
  }
  parentPort.close();
}
