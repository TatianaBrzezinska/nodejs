// Bad example
// interface WorkerInterface {
//   work(): void;
//   eat(): void;
// }
//
// class HumanWorker implements WorkerInterface {
//   work() {
//     console.log("Human working...");
//   }
//
//   eat() {
//     console.log("Human eating...");
//   }
// }
//
// class RobotWorker implements WorkerInterface {
//   work() {
//     console.log("Robot working...");
//   }
//
//   eat() {
//     throw new Error("Robots do not eat!");
//   }
// }

// Fix
// interface Workable {
//   work(): void;
// }
//
// interface Eatable {
//   eat(): void;
// }
//
// class HumanWorker implements Workable, Eatable {
//   work() {
//     console.log("Human working...");
//   }
//
//   eat() {
//     console.log("Human eating...");
//   }
// }
//
// class RobotWorker implements Workable {
//   work() {
//     console.log("Robot working...");
//   }
// }
