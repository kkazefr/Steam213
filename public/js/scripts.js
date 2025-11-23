// Sample games data
const games = [
    {
        id: 1,
        title: "Cyber Adventure",
        description: "Futuristic RPG with amazing graphics",
        icon: "fas fa-robot"
    },
    {
        id: 2,
        title: "Space Explorers",
        description: "Explore the universe in this epic adventure",
        icon: "fas fa-rocket"
    },
    {
        id: 3,
        title: "Dragon Quest",
        description: "Fantasy RPG with dragons and magic",
        icon: "fas fa-dragon"
    },
    {
        id: 4,
        title: "Racing Extreme",
        description: "High-speed racing with super cars",
        icon: "fas fa-car"
    },
    {
        id: 5,
        title: "Zombie Survival",
        description: "Survive the zombie apocalypse",
        icon: "fas fa-biohazard"
    },
    {
        id: 6,
        title: "Puzzle Masters",
        description: "Challenge your brain with puzzles",
        icon: "fas fa-puzzle-piece"
    },
    {
        id: 7,
        title: "Football Pro",
        description: "Realistic football simulation",
        icon: "fas fa-futbol"
    },
    {
        id: 8,
        title: "Magic Kingdom",
        description: "Build your magical empire",
        icon: "fas fa-crown"
    },
    {
        id: 9,
        title: "Ocean Explorer",
        description: "Discover deep sea mysteries",
        icon: "fas fa-water"
    },
    {
        id: 10,
        title: "Wild West",
        description: "Cowboy adventure in the west",
        icon: "fas fa-hat-cowboy"
    }
];

// Function to create game cards
function createGameCard(game) {
    return `
        <div class="game-card" data-game-id="${game.id}">
            <div class="game-image">
                <i class="${game.icon}"></i>
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <button class="download-btn" onclick="downloadGame(${game.id})">
                    <i class="fas fa-download"></i> Download Now
                </button>
            </div>
        </div>
    `;
}

// Function to load games
function loadGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = games.map(game => createGameCard(game)).join('');
}

// Download game function
function downloadGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        alert(`Starting download: ${game.title}\n\nThis is a demo. In a real website, the download would begin now!`);
        // In a real application, you would redirect to actual download link
        // window.location.href = `/download/${gameId}`;
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredGames = games.filter(game => 
            game.title.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm)
        );
        
        const gamesGrid = document.getElementById('gamesGrid');
        gamesGrid.innerHTML = filteredGames.map(game => createGameCard(game)).join('');
    }
    
    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadGames();
    setupSearch();
    
    // Add some interactive effects
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});