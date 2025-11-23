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
        <title>Steam213 - Download Amazing Games</title>
        <link rel="stylesheet" href="/css/style.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    </head>
    <body>
        <!-- Header -->
        <header class="header">
            <div class="container">
                <div class="nav">
                    <div class="logo">
                        <i class="fas fa-fire"></i>
                        <span>Steam213</span>
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
                <!-- Popular Games Carousel -->
                <div class="carousel-section">
                    <div class="carousel-header">
                        <h2>Popular Games Now</h2>
                        <div class="carousel-controls">
                            <button class="carousel-btn prev-btn">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="carousel-btn next-btn">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div class="carousel-container">
                        <div class="carousel-track" id="carouselTrack">
                            <!-- Carousel items will be loaded here -->
                        </div>
                    </div>
                </div>

                <!-- All Games Grid -->
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
                        <h3>Steam213</h3>
                        <p>Your ultimate destination for amazing games. Discover the hottest titles trending right now!</p>
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
                    <p>&copy; 2024 Steam213. All rights reserved.</p>
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