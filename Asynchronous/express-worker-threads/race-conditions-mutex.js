const {
  Worker,
  isMainThread,
  workerData,
  parentPort,
} = require("worker_threads");

if (isMainThread) {
  const sharedBuffer = new SharedArrayBuffer(8); // 4 bytes for mutex + 4bytes for variable
  const sharedArray = new Int32Array(sharedBuffer);
  sharedArray[0] = 0;
  sharedArray[1] = 0; // 0 - FREE, 1 - Occupied

  const worker1 = new Worker(__filename, { workerData: sharedBuffer });
  const worker2 = new Worker(__filename, { workerData: sharedBuffer });

  let completedWorkers = 0;
  const onWorkerExit = () => {
    completedWorkers++;
    if (completedWorkers === 2) {
      console.log("Final Counter Value:", sharedArray[0]);
    }
  };

  worker1.on("exit", onWorkerExit);
  worker2.on("exit", onWorkerExit);
} else {
  const sharedArray = new Int32Array(workerData);

  for (let i = 0; i < 100000; i++) {
    // Locked mutex
    while (Atomics.compareExchange(sharedArray, 1, 0, 1) !== 0) {
      Atomics.wait(sharedArray, 1, 1); // Wait until
    }

    // Shared variable
    sharedArray[0]++;

    // Set free mutex
    Atomics.store(sharedArray, 1, 0);
    Atomics.notify(sharedArray, 1); // Notify others that our mutex is free
  }

  parentPort.close();
}
