const userList = [null, undefined, 'john@gmail.com', ''];

for (const user of userList) {
    if (user) {
        console.log(`User email: ${user}`);
    } else {
        //
        console.log('Invalid or empty user');
    }
}
