// Sample games data with image support
const games = [
    {
        id: 1,
        title: "Grand Theft Auto V",
        description: "Grand Theft Auto V is an open-world action-adventure game set in Los Santos.",
        image: "/images/gtaV.jpg",
        isPopular: true
    },
    {
        id: 2,
        title: "Forza Horizon 5 Premium Edition",
        description: "Open-world racing game set in Mexico with extra cars and expansions",
        image: "/images/forza5.jpg",
        isPopular: true
    },
    {
        id: 3,
        title: "Cyberpunk 2077",
        description: "Futuristic open-world RPG in Night City.",
        image: "/images/cyberpunk2077.jpg",
        isPopular: true
    },
    {
        id: 4,
        title: "Red Dead Redemption 2",
        description: "Epic open-world Western adventure.",
        image: "/images/reddead2.jpg",
        isPopular: true
    },
    {
        id: 5,
        title: "Ghost Of Tsushima",
        description: "Open-world samurai adventure in feudal Japan",
        image: "/images/ghostoftsushima.jpg",
        isPopular: false
    },
    {
        id: 6,
        title: "Grand Theft Auto: San Andreas",
        description: "Open-world crime adventure in San Andreas.",
        image: "/images/sanandreas.jpeg",
        isPopular: false
    },
    {
        id: 7,
        title: "God of War Ragnarök",
        description: "Mythical action-adventure with Kratos in Norse realms.",
        image: "/images/godofwar.jpg",
        isPopular: false
    },
    {
        id: 8,
        title: "Grand Theft Auto IV",
        description: "Open-world crime story in Liberty City.",
        image: "/images/gta4.jpeg",
        isPopular: false
    },
    {
        id: 9,
        title: "Call of Duty Black ops 3",
        description: "Futuristic first-person shooter with advanced combat.",
        image: "/images/blackops3.jpg",
        isPopular: false
    },
    {
        id: 10,
        title: "Resident Evil 4 Remake",
        description: "Survival horror adventure to rescue the president daughter",
        image: "/images/residentevil4.jpg",
        isPopular: false
    },
    {
        id: 11,
        title: "HITMAN 3",
        description: "Stealth action game as Agent 47 completing global assassinations.",
        image: "/images/hitman3.png",
        isPopular: false
    },
    {
        id: 12,
        title: "Call of Duty: Black Ops 6",
        description: "FPS with 90s setting, multiplayer, and Zombies mode.",
        image: "/images/blackops6.png",
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