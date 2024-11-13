const express = require('express');
const app = express();
const PORT = 3000;

let accessKey = '12345';  // Default key
let expirationTime = new Date(Date.now() + 5 * 60 * 1000); // Default expiration in 5 minutes

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files (HTML, JS)

// Endpoint to validate the login key
app.post('/validate-key', (req, res) => {
    const { key } = req.body;
    const now = new Date();

    if (key === accessKey && now < expirationTime) {
        res.json({ valid: true });
    } else if (now >= expirationTime) {
        res.json({ valid: false, message: 'Key expired. Please contact admin for a new key.' });
    } else {
        res.json({ valid: false, message: 'Invalid key.' });
    }
});

// Endpoint for admin to set a new key and duration
app.post('/set-key', (req, res) => {
    const { newKey, duration } = req.body;
    accessKey = newKey;
    expirationTime = new Date(Date.now() + duration * 60 * 1000); // Duration in minutes

    res.json({ message: `New key set with ${duration} minutes of validity.` });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
