// 1 + 1 = 2
// 2 - 1 = 1
// i++ => i = i + 1 (2++ => 3)
// i-- => i = i - 1 (2-- => 1)
// 10 % 3 => 1
// console.log(10 % 3);


let one = 1;
let two = 1;


1 == '1' // true
1 === '1' // false



















// let x;
// console.log('X is undefined');
// console.log(x);
let x = 1;


// Цикл for для виведення чисел від 1 до 5
// i++, i--
// i = i + 1;
// i = i - 1;
for (let i = 1; i <= 5; i++) {
    console.log(i);
    // if(i === 2){
    //     break
    // }
}

[1, 2].forEach((value, index) => {
    // value 1, 2
    // index 0, 1
});

// Цикл while для виведення чисел від 1 до 5
let j = 1;
while (j <= 5) {
    console.log(j);
    j++;
}

// Використання switch case для визначення дня тижня за номером
let day = 3; // Номер дня тижня (1 - понеділок, 2 - вівторок, і так далі)

switch (day) {
    case 1:
        console.log("Понеділок");
        break;
    case 2:
        console.log("Вівторок");
        break;
    case 3:
        console.log("Середа");
        break;
    case 4:
        console.log("Четвер");
        break;
    case 5:
        console.log("П’ятниця");
        break;
    case 6:
        console.log("Субота");
        break;
    case 7:
        console.log("Неділя");
        break;
    default:
        console.log("Невірний номер дня тижня");
        break;
}

// If statement
if (5 < 3) {
    console.log('if');
} else {
    console.log('else');
}
// Тернарний оператор
// condition ? exprIfTrue : exprIfFalse
// let age = 15; let accessAllowed = (age >= 18) ? 'YES' : 'No'; console.log(accessAllowed); // "Yes"
let age = 18; let accessAllowed = (age >= 18) ? (age > 18 ? 1 : 3) : 'No'; console.log(accessAllowed); // "Yes"

// Оператор ?? (Nullish Coalescing Operator)
// value1 ?? value2

let user;
let defaultUser = "Anonymous";
let displayName = user ?? defaultUser;
console.log(displayName); // "Anonymous"
const foo = null ?? 'default string';
// console.log(foo);
// "default string"

const baz = 0 ?? 42;
// 0
// add(1, !2)
// console.log(addFunctionDeclaration(1, 2))

add(1, 3)
const add = (a, b) => a + b;
const addSecond = (a, b) => {
  return  a + b
};
const addResult = add(1, 3);
const addResult2 = addSecond(1, 3);
// console.log(addResult);
// console.log(addResult2);
// console.log(add(2, 3));
// const addTest = (a, b) => {
//     return a + b
// };
// console.log(add(2, 3));


// addFunctionDeclaration()
// function addFunctionDeclaration(a, b) {
//     const result =  a + b;
//     return result
// }
