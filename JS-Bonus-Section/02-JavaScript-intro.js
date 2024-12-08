// // Objects
// const demoObject = {
//     value: {
//         val: {
//             test: []
//         }
//     }
// }
//
// // Set
// const firstSet = new Set([1, 2, 3, 4]);
// console.log(firstSet);
//
// // Map
// const firstMap = new Map();
// firstMap.set("apples", 500);
// firstMap.set("bananas", 300);
// firstMap.set("oranges", 200);
// console.log(firstMap);

// const weekSet = new WeakSet([{}])
// const weekMap = new WeakMap();

// LET / CONST
// const x = 10;
// // x = 20; // Помилка, тому що const не можна перевизначити
// let y = 15;
// y = 20; // Спрацює, тому що let можна перевизначити
//
// // LET / CONST
// let a;
// a = 5; // Можна оголосити змінну let без початкового значення

const c = 10; // Правильний синтаксис для const

// SCOPE
// if (true) {
//     var x = 5;
//     let y = 10;
// }
// console.log(x); // 5, змінна var доступна поза блоком
// console.log(y); // Помилка, змінна let недоступна поза блоком

// HOSTING
// console.log(x); // undefined, через hoisting змінна "піднята" на рівень видимості, але значення не присвоєно
// var x = 10;
//
// console.log(y); // Помилка, оскільки let не піднімається
// let y = 20;

// // REDECLARATION
// var x = 10;
// var x = 20; // Спрацює, тому що var дозволяє повторно оголошувати змінні
//
// let y = 10;!
// // let y = 20; // Помилка, оскільки let не дозволяє повторно оголошувати змінну в тому ж самому блоці

function ObjectConstructor() {}
//
// ObjectConstructor.prototype.sayHello = function() {
//     return 'Hello';
// };
//
// const object = new ObjectConstructor();
//
// console.log(object.sayHello()); // 'Hello'
// console.log(object.toString()); // '[object Object]' (inherit from Object.prototype)

// console.log(ObjectConstructor.testLecture)
//!
// let a = 10;  // Примітивне значення (число)
// let b = a;   // Копіюємо значення змінної `a`
//
// // b = 20;  // Змінюємо значення `b`
// console.log(a); // 10, значення `a` не змінилося
// console.log(b); // 20, значення `b` змінено
//
// //
// let obj1 = { name: 'Alice' };  // Об'єкт
// let obj2 = obj1;               // Копіюємо посилання на об'єкт
//
// obj2.name = 'Bob';  // Змінюємо властивість в obj2
// console.log(obj1.name); // 'Bob', тому що обидві змінні посилаються на один об'єкт
// console.log(obj2.name); // 'Bob'
// //
// let obj1 = { name: 'Alice' };
// let obj2 = JSON.parse(JSON.stringify(obj1));  // Гл!@@@ибока копія об'єкта
//
// obj2.name = 'Bob';  // Змінюємо властивість в obj2
// console.log(obj1.name); // 'Alice', оригінальний об'єкт не змінився
// console.log(obj2.name); // 'Bob'


