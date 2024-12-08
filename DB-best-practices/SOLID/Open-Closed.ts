// class Animal {
//   type: string;
//
//   constructor(type: string) {
//     this.type = type;
//   }
//
//   makeSound() {
//     switch (this.type) {
//       case "dog":
//         console.log("Bark");
//         break;
//       case "cat":
//         console.log("Meow");
//         break;
//       default:
//         console.log("Unknown animal");
//     }
//   }
// }
//
// const dog = new Animal("dog");
// dog.makeSound();
//
// const cat = new Animal("cat");
// cat.makeSound();

class Animal {
  makeSound() {
    console.log("Base Sound");
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Bark");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log("Meow");
  }
}

const animals = [new Dog(), new Cat()];

animals.forEach((animal) => animal.makeSound());
