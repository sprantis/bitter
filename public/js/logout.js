// Code referenced from Module 14 - Mini Project

const logout = async () => {
    // POST to the logout route
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    // if the response is OK, replace the url path with '/'
    if (response.ok) {
        document.location.replace('/');
    } else {
        // else, alert the status text of the response and reload the current page
        alert(response.statusText);
        document.location.reload();
    }
};

document.querySelector('#logout').addEventListener('click', logout);
