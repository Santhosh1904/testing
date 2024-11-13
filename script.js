// Handle Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const key = document.getElementById("keyInput").value;

    const response = await fetch('/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
    });
    const result = await response.json();

    if (result.valid) {
        window.location.href = '/welcome.html'; // Redirect if key is valid
    } else {
        document.getElementById("message").innerText = result.message;
    }
});

// Handle Admin Form Submission
document.getElementById("adminForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newKey = document.getElementById("newKey").value;
    const duration = parseInt(document.getElementById("duration").value);

    const response = await fetch('/set-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newKey, duration })
    });
    const result = await response.json();
    document.getElementById("adminMessage").innerText = result.message;
});
