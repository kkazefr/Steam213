// Sample games data with image support
const games = [
    {
        id: 1,
        title: "GTA V",
        description: "Futuristic RPG with amazing graphics",
        image: "/images/gtaV.jpg", // You can replace this with your own images
        isPopular: true
    },
    {
        id: 2,
        title: "Space Explorers",
        description: "Explore the universe in this epic adventure",
        image: "/images/space-explorers.jpg",
        isPopular: true
    },
    {
        id: 3,
        title: "Dragon Quest",
        description: "Fantasy RPG with dragons and magic",
        image: "/images/dragon-quest.jpg",
        isPopular: false
    },
    {
        id: 4,
        title: "Racing Extreme",
        description: "High-speed racing with super cars",
        image: "/images/racing-extreme.jpg",
        isPopular: true
    },
    {
        id: 5,
        title: "Zombie Survival",
        description: "Survive the zombie apocalypse",
        image: "/images/zombie-survival.jpg",
        isPopular: false
    },
    {
        id: 6,
        title: "Puzzle Masters",
        description: "Challenge your brain with puzzles",
        image: "/images/puzzle-masters.jpg",
        isPopular: true
    },
    {
        id: 7,
        title: "Football Pro",
        description: "Realistic football simulation",
        image: "/images/football-pro.jpg",
        isPopular: false
    },
    {
        id: 8,
        title: "Magic Kingdom",
        description: "Build your magical empire",
        image: "/images/magic-kingdom.jpg",
        isPopular: true
    },
    {
        id: 9,
        title: "Ocean Explorer",
        description: "Discover deep sea mysteries",
        image: "/images/ocean-explorer.jpg",
        isPopular: false
    },
    {
        id: 10,
        title: "Wild West",
        description: "Cowboy adventure in the west",
        image: "/images/wild-west.jpg",
        isPopular: true
    }
];

// Function to create game cards
function createGameCard(game) {
    const popularBadge = game.isPopular ? '<div class="popular-badge">POPULAR NOW!</div>' : '';
    
    return `
        <div class="game-card" data-game-id="${game.id}">
            <div class="game-image">
                ${game.image ? 
                    `<img src="${game.image}" alt="${game.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                     <div class="placeholder-icon" style="display: none;">
                         <i class="fas fa-gamepad"></i>
                     </div>` :
                    `<div class="placeholder-icon">
                         <i class="fas fa-gamepad"></i>
                     </div>`
                }
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                ${popularBadge}
            </div>
        </div>
    `;
}

// Function to load games
function loadGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = games.map(game => createGameCard(game)).join('');
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