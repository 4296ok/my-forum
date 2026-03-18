async function fetchPost() {
    const res = await fetch('/post');
    const data = await res.json();
    document.getElementById('post').innerText = data.content;
}

async function fetchComments() {
    const res = await fetch('/comments');
    const data = await res.json();
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = '';
    data.forEach(c => {
        // Only render comments with actual text
        if (c.message) {
            const div = document.createElement('div');
            div.className = 'comment';
            div.innerHTML = `<strong>${c.username || 'Anonymous'}</strong>: ${c.message}`;
            commentsDiv.appendChild(div);
        }
    });
}

async function addComment() {
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    const username = usernameInput.value.trim() || 'Anonymous';
    const message = messageInput.value.trim();

    if (!message) return alert('Comment cannot be empty');

    await fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, message })
    });

    messageInput.value = '';
    fetchComments();
}

// Only attach event listener to the button, don’t call addComment on load
document.getElementById('submitComment').addEventListener('click', addComment);

// Fetch post and comments on load
fetchPost();
fetchComments();
setInterval(fetchComments, 5000); // refresh comments every 5s