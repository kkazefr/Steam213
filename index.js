const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Basic route - homepage
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My Node.js Site!</h1>
    <p>This is running on Render!</p>
    <a href="/about">About Page</a>
    <a href="/api">API Example</a>
  `);
});

// About page route
app.get('/about', (req, res) => {
  res.send(`
    <h1>About Us</h1>
    <p>This is a simple Node.js web service deployed on Render.</p>
    <a href="/">Home</a>
  `);
});

// JSON API route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Hello from Node.js API!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});