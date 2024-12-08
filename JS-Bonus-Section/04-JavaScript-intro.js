// console.log('Початок синхронного коду'); // 1
//
// setTimeout(() => {
//     console.log('Макрозавдання: setTimeout'); // 3
// }, 0);
//
// Promise.resolve().then(() => {
//     console.log('Мікрозавдання: проміс'); // 2
// });
//
// console.log('Кінець синхронного коду'); // 1
//
//
// setInterval(() => {
//     console.log('Hello')
// }, 1000 * 3);
// 3
// const { Subject } = require('rxjs');
// const { debounceTime } = require('rxjs/operators');
//
// const eventSubject = new Subject();
// eventSubject.pipe(
//     debounceTime(300)
// ).subscribe((value) => {
//     console.log('Debounced value:', value);
// });
//
// eventSubject.next('First event');
// eventSubject.next('Second event');
// eventSubject.next('Third event');


let timeoutId;
function debounceEvent(value) {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
        console.log('Debounced value:', value);
    }, 300);
}

debounceEvent('First event');
setTimeout(() => debounceEvent('Second event'), 100);
setTimeout(() => debounceEvent('Third event'), 400);

