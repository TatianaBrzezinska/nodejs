function nestedHell(data) {
    if (data) {
        if (data.isValid) {
            if (data.user) {
                if (data.user.isLoggedIn) {
                    if (data.user.permissions) {
                        if (data.user.permissions.canAccess) {
                            if (data.settings) {
                                if (data.settings.theme) {
                                    if (data.settings.theme === 'dark') {
                                        console.log('Dark theme is set.');
                                    } else {
                                        console.log('Light theme is set.');
                                    }
                                } else {
                                    console.log('No theme selected.');
                                }
                            } else {
                                console.log('No settings available.');
                            }
                        } else {
                            console.log('User does not have access.');
                        }
                    } else {
                        console.log('No permissions found.');
                    }
                } else {
                    console.log('User is not logged in.');
                }
            } else {
                console.log('No user found.');
            }
        } else {
            console.log('Data is not valid.');
        }
    } else {
        console.log('No data provided.');
    }
}

nestedHell({isValid: true})