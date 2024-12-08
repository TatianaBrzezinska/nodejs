// // setTimeout
//
// // setTimeout(() => {
// //     console.log('Я залогувався через 3 секунд')
// // }, 1000 * 3)
//
// // Приклад асинхронної операції з fs.readFile:
// const fs = require('fs');
//
// console.log('--- Синхронний приклад ---');
// console.time('Синхронний час');
// const syncData = fs.readFileSync('example.txt', 'utf8');
// console.log(syncData);
// console.timeEnd('Синхронний час');
//
// console.log('--- Асинхронний приклад ---');
// console.time('Асинхронний час');
// fs.readFile('example.txt', 'utf8', (err, asyncData) => {
//     if (err) throw err;
//     console.log(asyncData);
//     console.timeEnd('Асинхронний час');
// });


// new Promise((resolve, reject) => {
//     setTimeout(() => reject('error'), 1000 * 2)
// }).then((value) => {
//     console.log(`I am ${value}`)
// }, (err) => {
//     console.log(`I am done with ${err}`)
// });

function asyncFunction() {
    return new Promise((reject) => {
        setTimeout(() => reject('Error'), 1000);
    });
}

(async () => {
    try { //
        const asyncFunctionResult = await asyncFunction();
        console.log('asyncFunctionResult: ', asyncFunctionResult);
    } catch (error) { //
        console.error('Error: ', error);
    } finally {
        console.log('finally')
    }
})();

// await new Promise(())





try {

} catch (e) {

} finally {

}