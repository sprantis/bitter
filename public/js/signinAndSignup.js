// Code referenced from Module 14 - Mini Project

const signinFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the signin form fields
    const username = document.querySelector('#username-signin').value.trim();
    const password = document.querySelector('#password-signin').value.trim();

    if (username && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/signin', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // If successful, redirect the browser to their dashboard page
            document.location.replace('/dashboard');
        } else {
            // else, alert the status text of the response and reload the current page
            alert(response.statusText);
            document.location.reload();
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the signin form fields
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // If successful, redirect the browser to their dashboard page
            document.location.replace('/dashboard');
        } else {
            // else, alert the status text of the response and reload the current page
            alert(response.statusText);
            document.location.reload();
        }
    }
};

document.querySelector('.signin-form').addEventListener('submit', signinFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
