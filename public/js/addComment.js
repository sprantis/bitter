// Code referenced from Module 14 - Mini Project

const addCommentFormHandler = async (event) => {
    event.preventDefault();

    // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const commentText = document.querySelector('textarea[name="comment-text"]').value.trim();

    // if there is valid comment text, create a new comment object and post to the comments api route
    if (commentText) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                commentText
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // if the response is OK, reload the current page
        if (response.ok) {
            document.location.reload();
        } else {
            // else, alert the status text of the response and reload the current page
            alert(response.statusText);
            document.location.reload();
        }
    };
}

document.querySelector('#add-comment-form').addEventListener('submit', addCommentFormHandler);

