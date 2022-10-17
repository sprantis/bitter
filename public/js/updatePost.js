// Code referenced from Module 14 - Mini Project

const updatePostFormHandler = async function(event) {
    event.preventDefault();

    // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const postTitle = document.querySelector('input[name="post-title"]').value.trim();
    const postContent = document.querySelector('textarea[name="post-content"]').value.trim();
  
    // update a post object and send it to the posts API route
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
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
}

document.querySelector('#update-post-form').addEventListener('submit', updatePostFormHandler);