// Code referenced from Module 14 - Mini Project

const newPostFormHandler = async function(event) {
    event.preventDefault();
  
    const postTitle = document.querySelector('input[name="post-title"]').value.trim();
    const postContent = document.querySelector('textarea[name="post-content"]').value.trim();
  
    // create a new post object and post to the posts api route
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            postTitle,
            postContent,
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    // if the response is OK, reload the current page
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        // else, alert the status text of the response and reload the current page
        alert(response.statusText);
        document.location.reload();
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);

