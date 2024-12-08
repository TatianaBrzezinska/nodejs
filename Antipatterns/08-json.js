const someArray = [
    {
        user: 'Jane',
        userNumber: BigInt(123456789012345678901234567890)
    },
    {
        user: 'Alex',
        userNumber: 1
    }
];
// const cloned = someArray;
// cloned.push({user: 'John'});
// console.log(someArray);

const clonedByJSON = JSON.parse(JSON.stringify(someArray));
clonedByJSON.push({user: 'John'});
console.log(someArray);
