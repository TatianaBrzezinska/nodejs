const userList = ['John', 'Jane', 'Mile', 'Lina', 'Michael'];
const othersUsers = ['Mila', 'Mile'];
const externalUsers = ['Lina', 'Jake'];
const matchedUsers = new Set();

for (const user of userList) {
    const handleMichael = () => {
        if (user === 'Michael') {
            //
        }
    }

    handleMichael();

    for (const otherUser of othersUsers) {
        if (otherUser === user) {
            matchedUsers.add(user);
        }
    }

    for (const externalUser of externalUsers) {
        if (externalUser === user) {
            matchedUsers.add(externalUser);
        }
    }
}

console.log(matchedUsers);