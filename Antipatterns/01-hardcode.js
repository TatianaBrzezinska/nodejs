
function getUserRole(userId) {
    let role;

    if (userId === 1) {
        role = 'Admin';
    } else if (userId === 2) {
        role = 'Moderator';
    } else if (userId === 3) { //
        role = 'User';
    } else if (userId === 4) {
        role = 'SuperUser';
    } else if (userId === 5) {
        role = 'PowerUser';
    } else if (userId === 6) {
        role = 'LimitedUser';
    } else if (userId === 7) {
        role = 'RestrictedUser';
    } else if (userId === 8) {
        role = 'ReadOnlyUser';
    } else if (userId === 9) {
        role = 'TrialUser';
    } else {
        role = 'Guest';
    }

    console.log('User with ID ' + userId + ' has role: ' + role);
    return role;
}

// getUserRole(1);
// getUserRole(5);
// getUserRole(9);
// getUserRole(100);

const usersTimeZone = 'America/Vancouver';
console.log(usersTimeZone);

const primaryNameStreet = 'Bohdan street';
console.log(primaryNameStreet);