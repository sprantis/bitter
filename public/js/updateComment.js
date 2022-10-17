// Code referenced from Module 14 - Mini Project

const updateCommentFormHandler = async (event) => {
    event.preventDefault();

    // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const commentId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const commentText = document.querySelector('textarea[name="comment-text"]').value.trim();

    // update a comment object and send it to the comments API route
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({
            commentText
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

document.querySelector('#update-comment-form').addEventListener('submit', updateCommentFormHandler);

