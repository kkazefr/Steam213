// Sample games data with image support
const games = [
    {
        id: 1,
        title: "Cyber Adventure",
        description: "Futuristic RPG with amazing graphics",
        image: "/images/cyber-adventure.jpg",
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
        isPopular: true
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
        isPopular: false
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
        isPopular: false
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
        isPopular: false
    },
    {
        id: 11,
        title: "Cyber Punk City",
        description: "Neon-lit urban adventure",
        image: "/images/cyber-punk.jpg",
        isPopular: false
    },
    {
        id: 12,
        title: "Ancient Empire",
        description: "Build your ancient civilization",
        image: "/images/ancient-empire.jpg",
        isPopular: false
    }
];

// Carousel functionality
let currentSlide = 0;

function createCarouselItem(game) {
    return `
        <div class="carousel-item">
            <div class="carousel-game" data-game-id="${game.id}">
                <div class="carousel-game-image">
                    ${game.image ? 
                        `<img src="${game.image}" alt="${game.title}" onerror="this.style.display='none';" />` :
                        `<div class="placeholder-icon"><i class="fas fa-gamepad"></i></div>`
                    }
                    <div class="carousel-game-title">${game.title}</div>
                </div>
            </div>
        </div>
    `;
}

function createGameCard(game) {
    return `
        <div class="game-card" data-game-id="${game.id}">
            <div class="game-image">
                ${game.image ? 
                    `<img src="${game.image}" alt="${game.title}" onerror="this.style.display='none';" />` :
                    `<div class="placeholder-icon"><i class="fas fa-gamepad"></i></div>`
                }
                <div class="game-title-overlay">${game.title}</div>
            </div>
        </div>
    `;
}

function loadCarousel() {
    const popularGames = games.filter(game => game.isPopular);
    const carouselTrack = document.getElementById('carouselTrack');
    
    // Duplicate items for infinite loop
    const carouselItems = [...popularGames, ...popularGames, ...popularGames]
        .map(game => createCarouselItem(game)).join('');
    
    carouselTrack.innerHTML = carouselItems;
    updateCarousel();
}

function updateCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const itemWidth = 25; // 25% per item (4 items visible)
    const translateX = -currentSlide * itemWidth;
    carouselTrack.style.transform = `translateX(${translateX}%)`;
}

function nextSlide() {
    const popularGames = games.filter(game => game.isPopular).length;
    currentSlide = (currentSlide + 1) % popularGames;
    updateCarousel();
}

function prevSlide() {
    const popularGames = games.filter(game => game.isPopular).length;
    currentSlide = (currentSlide - 1 + popularGames) % popularGames;
    updateCarousel();
}

// Function to load games grid
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
            game.title.toLowerCase().includes(searchTerm)
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
    loadCarousel();
    loadGames();
    setupSearch();
    
    // Carousel controls
    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);
    
    // Auto-advance carousel
    setInterval(nextSlide, 5000);
    
    // Add click handlers for games
    document.addEventListener('click', function(e) {
        const gameCard = e.target.closest('.game-card, .carousel-game');
        if (gameCard) {
            const gameId = gameCard.dataset.gameId;
            const game = games.find(g => g.id == gameId);
            if (game) {
                alert(`Selected: ${game.title}\n\nThis would navigate to the game page in a real application.`);
            }
        }
    });
});