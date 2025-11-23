const express = require('express');
const path = require('path');
const { dbHelper } = require('./database');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route - fetches from database
app.get('/', (req, res) => {
  // Get popular games for carousel and all games for genre sections
  dbHelper.getPopularGames((err, popularGames) => {
    if (err) {
      console.error('Error fetching popular games:', err);
      popularGames = [];
    }

    dbHelper.getAllGames((err, allGames) => {
      if (err) {
        console.error('Error fetching all games:', err);
        return res.status(500).send('Server error');
      }

      // Convert database games to the format expected by frontend
      const gamesForFrontend = allGames.map(game => ({
        id: game.id,
        title: game.title,
        genre: game.genre,
        image: game.image
      }));

      const popularGameIds = popularGames.map(game => game.id);

      console.log(`📊 Loaded ${gamesForFrontend.length} games from database`);
      console.log(`🔥 ${popularGameIds.length} popular games for carousel`);

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
                            <img src="/images/logo.png" alt="Steam213 Logo" class="logo-image">
                            <span>Steam213</span>
                        </div>
                        
                        <div class="nav-right">
                            <button class="nav-btn home-btn" onclick="scrollToTop()">
                                <i class="fas fa-home"></i>
                                <span>Home</span>
                            </button>
                            
                            <div class="dropdown">
                                <button class="nav-btn categories-btn">
                                    <i class="fas fa-th-large"></i>
                                    <span>Categories</span>
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                                <div class="dropdown-content">
                                    <a href="#" onclick="scrollToGenre('action')">Action Games</a>
                                    <a href="#" onclick="scrollToGenre('rpg')">RPG Games</a>
                                    <a href="#" onclick="scrollToGenre('adventure')">Adventure Games</a>
                                </div>
                            </div>

                            <button class="theme-toggle" id="themeToggle">
                                <i class="fas fa-moon"></i>
                            </button>
                            
                            <a href="https://discord.gg/BRwHfHFD" class="discord-btn" target="_blank">
                                <i class="fab fa-discord"></i>
                            </a>

                            <div class="search-container">
                                <button class="search-toggle" id="searchToggle">
                                    <i class="fas fa-search"></i>
                                </button>
                                <div class="search-bar" id="searchBar">
                                    <input type="text" placeholder="Search games...">
                                    <button class="search-submit"><i class="fas fa-search"></i></button>
                                </div>
                            </div>
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

                    <!-- Genre Sections -->
                    <div class="genre-sections" id="genreSections">
                        <!-- Genre sections will be loaded here by JavaScript -->
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

            <script>
                // Pass data from server to frontend
                window.ALL_GAMES = ${JSON.stringify(gamesForFrontend)};
                window.POPULAR_GAME_IDS = ${JSON.stringify(popularGameIds)};
            </script>
            <script src="/js/scripts.js"></script>
        </body>
        </html>
      `);
    });
  });
});

// Enhanced Individual Game Pages Route with Database
app.get('/game/:gameId', (req, res) => {
    const gameId = parseInt(req.params.gameId);
    
    dbHelper.getGameById(gameId, (err, game) => {
        if (err) {
            console.error('Error fetching game:', err);
            return res.status(500).send('Server error');
        }
        
        if (!game) {
            res.status(404).send('Game not found');
            return;
        }

        // Parse features from pipe-separated string to array
        const features = game.features ? game.features.split('|') : [];
        
        // Parse requirements from pipe-separated string
        const requirements = game.requirements ? game.requirements.split('|') : [];

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${game.title} - Steam213</title>
                <link rel="stylesheet" href="/css/style.css">
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
            </head>
            <body>
                <!-- Header -->
                <header class="header">
                    <div class="container">
                        <div class="nav">
                            <div class="logo">
                                <img src="/images/logo.png" alt="Steam213 Logo" class="logo-image">
                                <span>Steam213</span>
                            </div>
                            
                            <div class="nav-right">
                                <button class="nav-btn home-btn" onclick="window.location.href='/'">
                                    <i class="fas fa-home"></i>
                                    <span>Home</span>
                                </button>
                                
                                <div class="dropdown">
                                    <button class="nav-btn categories-btn">
                                        <i class="fas fa-th-large"></i>
                                        <span>Categories</span>
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="dropdown-content">
                                        <a href="/#action">Action Games</a>
                                        <a href="/#rpg">RPG Games</a>
                                        <a href="/#adventure">Adventure Games</a>
                                    </div>
                                </div>

                                <button class="theme-toggle" id="themeToggle">
                                    <i class="fas fa-moon"></i>
                                </button>
                                
                                <a href="https://discord.gg/BRwHfHFD" class="discord-btn" target="_blank">
                                    <i class="fab fa-discord"></i>
                                </a>

                                <div class="search-container">
                                    <button class="search-toggle" onclick="window.location.href='/'">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Game Page Content -->
                <main class="main">
                    <div class="container">
                        <div class="game-page">
                            <div class="game-hero">
                                <div class="game-hero-image">
                                    ${game.image ? 
                                        `<img src="${game.image}" alt="${game.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` :
                                        ''
                                    }
                                    <div class="game-placeholder" style="${game.image ? 'display: none;' : ''}">
                                        <i class="fas fa-gamepad"></i>
                                    </div>
                                </div>
                                <div class="game-hero-info">
                                    <h1 class="game-title">${game.title}</h1>
                                    <p class="game-genre">${game.genre.charAt(0).toUpperCase() + game.genre.slice(1)} Game</p>
                                    <button class="download-btn-large" onclick="handleDownload(${game.id})">
                                        <i class="fas fa-download"></i>
                                        Download Now
                                    </button>
                                    <div class="game-stats">
                                        <div class="stat">
                                            <i class="fas fa-download"></i>
                                            <span>${game.download_count ? game.download_count.toLocaleString() : '0'}+ Downloads</span>
                                        </div>
                                        <div class="stat">
                                            <i class="fas fa-star"></i>
                                            <span>${game.rating || '4.5'}/5 Rating</span>
                                        </div>
                                        ${game.file_size ? `
                                        <div class="stat">
                                            <i class="fas fa-hdd"></i>
                                            <span>${game.file_size}</span>
                                        </div>
                                        ` : ''}
                                        ${game.version ? `
                                        <div class="stat">
                                            <i class="fas fa-code-branch"></i>
                                            <span>v${game.version}</span>
                                        </div>
                                        ` : ''}
                                        ${game.release_date ? `
                                        <div class="stat">
                                            <i class="fas fa-calendar"></i>
                                            <span>${game.release_date}</span>
                                        </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="game-details">
                                <h2>About This Game</h2>
                                ${game.para1 ? `<p>${game.para1}</p>` : '<p>An amazing gaming experience awaits!</p>'}
                                ${game.para2 ? `<p>${game.para2}</p>` : ''}
                                ${game.para3 ? `<p>${game.para3}</p>` : ''}
                                
                                ${features.length > 0 ? `
                                <div class="game-features">
                                    <h3>Features</h3>
                                    <ul>
                                        ${features.map(feature => `<li>🎮 ${feature}</li>`).join('')}
                                    </ul>
                                </div>
                                ` : `
                                <div class="game-features">
                                    <h3>Features</h3>
                                    <ul>
                                        <li>🎮 Amazing gameplay mechanics</li>
                                        <li>🖥️ Stunning graphics</li>
                                        <li>🎵 Immersive sound design</li>
                                        <li>⚡ Smooth performance</li>
                                    </ul>
                                </div>
                                `}
                                
                                ${requirements.length > 0 ? `
                                <div class="system-requirements">
                                    <h3>System Requirements</h3>
                                    <div class="requirements-grid">
                                        ${requirements.map((req, index) => {
                                            const parts = req.split('|');
                                            if (parts.length === 2) {
                                                return `
                                                    <div class="requirement">
                                                        <strong>${parts[0]}:</strong> ${parts[1]}
                                                    </div>
                                                `;
                                            } else {
                                                return `
                                                    <div class="requirement">
                                                        <strong>Requirement ${index + 1}:</strong> ${req}
                                                    </div>
                                                `;
                                            }
                                        }).join('')}
                                    </div>
                                </div>
                                ` : `
                                <div class="system-requirements">
                                    <h3>System Requirements</h3>
                                    <div class="requirements-grid">
                                        <div class="requirement">
                                            <strong>OS:</strong> Windows 10
                                        </div>
                                        <div class="requirement">
                                            <strong>Processor:</strong> Intel i5 or equivalent
                                        </div>
                                        <div class="requirement">
                                            <strong>Memory:</strong> 8 GB RAM
                                        </div>
                                        <div class="requirement">
                                            <strong>Graphics:</strong> GTX 1060 or equivalent
                                        </div>
                                        <div class="requirement">
                                            <strong>Storage:</strong> 5 GB available space
                                        </div>
                                    </div>
                                </div>
                                `}
                            </div>
                        </div>
                    </div>
                </main>

                <!-- Footer -->
                <footer class="footer">
                    <div class="container">
                        <div class="footer-content">
                            <div class="footer-section">
                                <h3>Steam213</h3>
                                <p>Your ultimate destination for amazing games. Download and play the best titles for free!</p>
                            </div>
                            <div class="footer-section">
                                <h4>Quick Links</h4>
                                <a href="/">Home</a>
                                <a href="/#action">Action Games</a>
                                <a href="/#rpg">RPG Games</a>
                                <a href="/#adventure">Adventure Games</a>
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

                <script>
                    // Theme toggle for game pages
                    const themeToggle = document.getElementById('themeToggle');
                    const savedTheme = localStorage.getItem('theme') || 'light';
                    
                    if (savedTheme === 'dark') {
                        document.body.classList.add('dark-theme');
                        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                    }
                    
                    themeToggle.addEventListener('click', function() {
                        document.body.classList.toggle('dark-theme');
                        if (document.body.classList.contains('dark-theme')) {
                            localStorage.setItem('theme', 'dark');
                            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                        } else {
                            localStorage.setItem('theme', 'light');
                            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                        }
                    });

                    // Download functionality
                    function handleDownload(gameId) {
                        // Increment download count via API
                        fetch('/api/download/' + gameId, { method: 'POST' })
                            .then(response => response.json())
                            .then(data => {
                                alert('Download starting for ${game.title}!\\\\n\\\\nFile size: ${game.file_size || 'Unknown'}\\\\nIn a real application, the download would begin now.');
                            })
                            .catch(err => {
                                console.error('Error:', err);
                                alert('Download starting for ${game.title}!\\\\n\\\\nFile size: ${game.file_size || 'Unknown'}');
                            });
                    }

                    // Handle image errors
                    document.addEventListener('DOMContentLoaded', function() {
                        const images = document.querySelectorAll('.game-hero-image img');
                        images.forEach(img => {
                            img.onerror = function() {
                                this.style.display = 'none';
                                const placeholder = this.nextElementSibling;
                                if (placeholder && placeholder.classList.contains('game-placeholder')) {
                                    placeholder.style.display = 'flex';
                                }
                            };
                        });
                    });
                </script>
            </body>
            </html>
        `);
    });
});

// API Routes for additional functionality
app.post('/api/download/:gameId', (req, res) => {
    const gameId = parseInt(req.params.gameId);
    dbHelper.incrementDownloadCount(gameId, (err) => {
        if (err) {
            console.error('Error updating download count:', err);
            return res.status(500).json({ error: 'Failed to update download count' });
        }
        res.json({ success: true, message: 'Download count updated' });
    });
});

// API to get all games (for potential future use)
app.get('/api/games', (req, res) => {
    dbHelper.getAllGames((err, games) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch games' });
        }
        res.json(games);
    });
});

// API to get games by genre
app.get('/api/games/:genre', (req, res) => {
    const genre = req.params.genre;
    dbHelper.getGamesByGenre(genre, (err, games) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch games' });
        }
        res.json(games);
    });
});

// API to get popular games
app.get('/api/games/popular', (req, res) => {
    dbHelper.getPopularGames((err, games) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch popular games' });
        }
        res.json(games);
    });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📊 Database-driven game platform ready!`);
  console.log(`🎮 Access the site at: http://localhost:${port}`);
});