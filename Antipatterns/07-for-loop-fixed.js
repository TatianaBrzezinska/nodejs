const userList = ['John', 'Jane', 'Mile', 'Lina', 'Michael'];
const othersUsers = ['Mila', 'Mile'];
const externalUsers = ['Lina', 'Jake'];
const matchedUsers = new Set();

function handleUser(user) {
    if (user === 'Michael') {
    }
    matchOtherUsers(user);
    addExternalUsers(user);
}

function matchOtherUsers(user) {
    if (othersUsers.some(otherUser => otherUser === user)) {
        matchedUsers.add(user);
    }
}
function addExternalUsers(user) {
    if (externalUsers.some(externalUser => externalUser === user)) {
        matchedUsers.add(user);
    }
}
userList.forEach(user => handleUser(user));

console.log(matchedUsers);
