// Code referenced from Module 14 - Mini Project

const deletePostBtnHandler = async function(event) {
    event.preventDefault();

    // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  
    // delete a post using the post's ID
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
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

document.querySelector('#delete-post-btn').addEventListener('click', deletePostBtnHandler);