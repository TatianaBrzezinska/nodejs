function processData(args) {
    const {name, age, company} = args;
    console.log(name);
    console.log(age);
    console.log(company);
}

processData({name: 'John', age: 42, company: 'Robot dreams'});
