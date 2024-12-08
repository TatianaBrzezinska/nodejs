const _ = require('lodash');
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
const cloned = _.cloneDeep(someArray);
cloned.push( {
    user: 'User1',
    userNumber: 1
})
console.log(cloned);