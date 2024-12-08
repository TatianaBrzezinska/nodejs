const userRoles = {
    1: 'Admin',
    2: 'Moderator',
    3: 'User',
    4: 'SuperUser',
    5: 'PowerUser',
    6: 'LimitedUser',
    7: 'RestrictedUser',
    8: 'ReadOnlyUser',
    9: 'TrialUser'
};

function getUserRole(userId) {
    console.log(userRoles[userId] || 'Guest')
    return userRoles[userId] || 'Guest';
}


getUserRole(1);
getUserRole(5);
getUserRole(9);
getUserRole(100);

const usersTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(usersTimeZone);

let primaryNameStreet = '';
// fetch primaryNameStreet from GoogleAPI