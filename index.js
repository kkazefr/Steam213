const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GameHub - Download Amazing Games</title>
        <link rel="stylesheet" href="/css/style.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    </head>
    <body>
        <!-- Header -->
        <header class="header">
            <div class="container">
                <div class="nav">
                    <div class="logo">
                        <i class="fas fa-gamepad"></i>
                        <span>GameHub</span>
                    </div>
                    <div class="search-bar">
                        <input type="text" placeholder="Search games...">
                        <button><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="main">
            <div class="container">
                <h1 class="page-title">Popular Games</h1>
                <div class="games-grid" id="gamesGrid">
                    <!-- Games will be loaded here by JavaScript -->
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>GameHub</h3>
                        <p>Your ultimate destination for amazing games. Download and play the best titles for free!</p>
                    </div>
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <a href="#">Home</a>
                        <a href="#">All Games</a>
                        <a href="#">Categories</a>
                        <a href="#">Support</a>
                    </div>
                    <div class="footer-section">
                        <h4>Legal</h4>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">DMCA</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 GameHub. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <script src="/js/scripts.js"></script>
    </body>
    </html>
  `);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});