function nestedHell(data) {
    if (!data) {
        console.log('No data provided.');
        return;
    }
    if (!data.isValid) {
        console.log('Data is not valid.');
        return;
    }
    if (!data.user) {
        console.log('No user found.');
        return;
    }
    if (!data.user.isLoggedIn) {
        console.log('User is not logged in.');
        return;
    }
    if (!data.user.permissions) {
        console.log('No permissions found.');
        return;
    }
    if (!data.user.permissions.canAccess) {
        console.log('User does not have access.');
        return;
    }
    if (!data.settings) {
        console.log('No settings available.');
        return;
    }
    if (!data.settings.theme) {
        console.log('No theme selected.');
        return;
    }

    console.log(data.settings.theme === 'dark' ? 'Dark theme is set.' : 'Light theme is set.');
}

nestedHell({isValid: true})