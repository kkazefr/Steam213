// Sample games data with genres
const games = [
    // Action Games (12)
    { id: 1, title: "Grand Theft Auto V", genre: "action", image: "/images/gtaV.jpg" },
    { id: 2, title: "Grand Thet Auto: Sand Anderas", genre: "action", image: "/images/sanandreas.jpeg" },
    { id: 3, title: "Red Dead Redemption 2", genre: "action", image: "/images/reddead2.jpg" },
    { id: 4, title: "Cyberpunk2077", genre: "action", image: "/images/cyberpunk2077.jpg" },
    { id: 5, title: "Forza Horizon 5", genre: "action", image: "/images/forza5.jpg" },
    { id: 6, title: "Ghost of Tsushima", genre: "action", image: "/images/ghostoftsushima.jpg" },
    { id: 7, title: "Resident evil 4", genre: "action", image: "/images/residentevil4.jpg" },
    { id: 8, title: "Cyber Strike", genre: "action", image: "/images/cyber-strike.jpg" },
    { id: 9, title: "Space Marines", genre: "action", image: "/images/space-marines.jpg" },
    { id: 10, title: "Dragon Slayer", genre: "action", image: "/images/dragon-slayer.jpg" },
    { id: 11, title: "Racing Pro", genre: "action", image: "/images/racing-pro.jpg" },
    { id: 12, title: "Zombie Outbreak", genre: "action", image: "/images/zombie-outbreak.jpg" },
    
    // RPG Games (12)
    { id: 13, title: "Magic Kingdom", genre: "rpg", image: "/images/magic-kingdom.jpg" },
    { id: 14, title: "Fantasy World", genre: "rpg", image: "/images/fantasy-world.jpg" },
    { id: 15, title: "Ancient Empire", genre: "rpg", image: "/images/ancient-empire.jpg" },
    { id: 16, title: "Dragon Age", genre: "rpg", image: "/images/dragon-age.jpg" },
    { id: 17, title: "Wizard Academy", genre: "rpg", image: "/images/wizard-academy.jpg" },
    { id: 18, title: "Kingdom Hearts", genre: "rpg", image: "/images/kingdom-hearts.jpg" },
    { id: 19, title: "Mythic Quest", genre: "rpg", image: "/images/mythic-quest.jpg" },
    { id: 20, title: "Epic Journey", genre: "rpg", image: "/images/epic-journey.jpg" },
    { id: 21, title: "Magic Realms", genre: "rpg", image: "/images/magic-realms.jpg" },
    { id: 22, title: "Fantasy Quest", genre: "rpg", image: "/images/fantasy-quest.jpg" },
    { id: 23, title: "Ancient Magic", genre: "rpg", image: "/images/ancient-magic.jpg" },
    { id: 24, title: "Dragon Lore", genre: "rpg", image: "/images/dragon-lore.jpg" },
    
    // Adventure Games (12)
    { id: 25, title: "Ocean Explorer", genre: "adventure", image: "/images/ocean-explorer.jpg" },
    { id: 26, title: "Wild West", genre: "adventure", image: "/images/wild-west.jpg" },
    { id: 27, title: "Jungle Trek", genre: "adventure", image: "/images/jungle-trek.jpg" },
    { id: 28, title: "Mountain Quest", genre: "adventure", image: "/images/mountain-quest.jpg" },
    { id: 29, title: "Desert Mystery", genre: "adventure", image: "/images/desert-mystery.jpg" },
    { id: 30, title: "Island Survival", genre: "adventure", image: "/images/island-survival.jpg" },
    { id: 31, title: "Arctic Expedition", genre: "adventure", image: "/images/arctic-expedition.jpg" },
    { id: 32, title: "Deep Sea Dive", genre: "adventure", image: "/images/deep-sea-dive.jpg" },
    { id: 33, title: "Forest Adventure", genre: "adventure", image: "/images/forest-adventure.jpg" },
    { id: 34, title: "Cave Explorer", genre: "adventure", image: "/images/cave-explorer.jpg" },
    { id: 35, title: "Sky Journey", genre: "adventure", image: "/images/sky-journey.jpg" },
    { id: 36, title: "Time Traveler", genre: "adventure", image: "/images/time-traveler.jpg" }
];

// Popular games for carousel
const popularGames = [1, 2, 3, 4, 13, 14, 25, 26];

// Carousel functionality
let currentSlide = 0;
let autoSlideInterval;
let isSearching = false;

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

function loadCarousel() {
    const popularGameObjects = popularGames.map(id => 
        games.find(game => game.id === id)
    );
    const carouselTrack = document.getElementById('carouselTrack');
    
    // Duplicate items for infinite loop
    const carouselItems = [...popularGameObjects, ...popularGameObjects, ...popularGameObjects]
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
    const totalSlides = popularGames.length;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    const totalSlides = popularGames.length;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function showMainView() {
    const carouselSection = document.querySelector('.carousel-section');
    const genreSections = document.getElementById('genreSections');
    
    // Show popular games and all genres
    carouselSection.style.display = 'block';
    loadGenreSections();
    isSearching = false;
    
    // Restart carousel if it was stopped
    startAutoSlide();
}

function showSearchView(searchTerm, filteredGames) {
    const carouselSection = document.querySelector('.carousel-section');
    const genreSections = document.getElementById('genreSections');
    
    // Hide popular games during search
    carouselSection.style.display = 'none';
    isSearching = true;
    stopAutoSlide();
    
    // Show search results
    genreSections.innerHTML = `
        <div class="genre-section">
            <div class="genre-header">
                <h2 class="genre-title">Search Results for "${searchTerm}"</h2>
            </div>
            <div class="genre-grid">
                ${filteredGames.map(game => createGameCard(game)).join('')}
            </div>
            ${filteredGames.length === 0 ? `
                <div style="text-align: center; padding: 2rem; color: var(--medium-gray);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No games found matching "${searchTerm}"</p>
                </div>
            ` : ''}
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

function createGenreSection(genre, title) {
    const genreGames = games.filter(game => game.genre === genre);
    const visibleGames = genreGames.slice(0, 12);
    const hiddenGames = genreGames.slice(12);
    
    return `
        <div class="genre-section" data-genre="${genre}">
            <div class="genre-header">
                <h2 class="genre-title">${title}</h2>
            </div>
            <div class="genre-grid">
                ${visibleGames.map(game => createGameCard(game)).join('')}
            </div>
            ${hiddenGames.length > 0 ? `
                <div class="hidden-games" id="hidden-${genre}">
                    ${hiddenGames.map(game => createGameCard(game)).join('')}
                </div>
                <button class="show-more-btn" onclick="toggleShowMore('${genre}')">
                    Show More
                </button>
            ` : ''}
        </div>
    `;
}

function loadGenreSections() {
    const genreSections = document.getElementById('genreSections');
    const genres = [
        { id: 'action', title: 'Action Games' },
        { id: 'rpg', title: 'RPG Games' },
        { id: 'adventure', title: 'Adventure Games' }
    ];
    
    genreSections.innerHTML = genres.map(genre => 
        createGenreSection(genre.id, genre.title)
    ).join('');
}

function toggleShowMore(genre) {
    const hiddenSection = document.getElementById(`hidden-${genre}`);
    const button = document.querySelector(`[data-genre="${genre}"] .show-more-btn`);
    
    if (hiddenSection.classList.contains('show')) {
        hiddenSection.classList.remove('show');
        button.textContent = 'Show More';
    } else {
        hiddenSection.classList.add('show');
        button.textContent = 'Show Less';
    }
}

// Search functionality
function setupSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchInput = searchBar.querySelector('input');
    const searchSubmit = searchBar.querySelector('.search-submit');
    
    // Toggle search bar visibility
    searchToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        searchBar.classList.toggle('show');
        if (searchBar.classList.contains('show')) {
            searchInput.focus();
        }
    });
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            searchBar.classList.remove('show');
        }
    });
    
    // Perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            showMainView();
            return;
        }
        
        const filteredGames = games.filter(game => 
            game.title.toLowerCase().includes(searchTerm)
        );
        
        showSearchView(searchTerm, filteredGames);
        searchBar.classList.remove('show');
        searchInput.value = '';
    }
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchSubmit.addEventListener('click', performSearch);
}

// Theme toggle functionality
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
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
}

// Scroll to top function with animation - UPDATED
function scrollToTop() {
    const mainElement = document.querySelector('.main');
    mainElement.classList.add('smooth-scroll');
    
    // Reset to main view if we're searching
    if (isSearching) {
        showMainView();
    }
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Remove animation class after animation completes
    setTimeout(() => {
        mainElement.classList.remove('smooth-scroll');
    }, 800);
}

// Scroll to genre function
function scrollToGenre(genre) {
    const genreSection = document.querySelector(`[data-genre="${genre}"]`);
    if (genreSection) {
        const offsetTop = genreSection.offsetTop - 80;
        
        genreSection.classList.add('smooth-scroll');
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            genreSection.classList.remove('smooth-scroll');
        }, 800);
        
        // Close dropdown after selection
        const dropdown = document.querySelector('.dropdown-content');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
}

// Enhanced dropdown hover functionality
function setupDropdownHover() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const content = dropdown.querySelector('.dropdown-content');
        let hideTimeout;
        
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
            content.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', function(e) {
            // Check if we're moving to the dropdown content
            const relatedTarget = e.relatedTarget;
            if (relatedTarget && !content.contains(relatedTarget)) {
                hideTimeout = setTimeout(() => {
                    content.style.display = 'none';
                }, 300); // 300ms delay
            }
        });
        
        content.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
        });
        
        content.addEventListener('mouseleave', function(e) {
            // Check if we're moving back to the dropdown button
            const relatedTarget = e.relatedTarget;
            if (relatedTarget && !dropdown.contains(relatedTarget)) {
                hideTimeout = setTimeout(() => {
                    content.style.display = 'none';
                }, 300); // 300ms delay
            }
        });
    });
}

// Close dropdown when clicking outside
function setupDropdownClose() {
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
}

// Handle image loading errors
function setupImageErrorHandling() {
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            const parent = e.target.parentElement;
            if (parent && !parent.querySelector('.placeholder-icon')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'placeholder-icon';
                placeholder.innerHTML = '<i class="fas fa-gamepad"></i>';
                e.target.style.display = 'none';
                parent.appendChild(placeholder);
            }
        }
    }, true);
}

// Handle logo image error
function setupLogoErrorHandling() {
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
        logoImage.onerror = function() {
            this.style.display = 'none';
            const logo = document.querySelector('.logo');
            const fireIcon = document.createElement('i');
            fireIcon.className = 'fas fa-fire';
            logo.insertBefore(fireIcon, logo.querySelector('span'));
        };
    }
}

// Pause carousel on hover
function setupCarouselHover() {
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCarousel();
    loadGenreSections();
    setupSearch();
    initTheme();
    setupDropdownClose();
    setupDropdownHover();
    setupImageErrorHandling();
    setupLogoErrorHandling();
    setupCarouselHover();
    
    // Carousel controls
    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);
    
    // Start auto slide
    startAutoSlide();
    
    // Game selection handling
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

// Utility function to get game by ID (for future use)
function getGameById(gameId) {
    return games.find(game => game.id === parseInt(gameId));
}

// Utility function to get games by genre (for future use)
function getGamesByGenre(genre) {
    return games.filter(game => game.genre === genre);
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    stopAutoSlide();
});

// Export functions for potential module use (if needed later)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        games,
        popularGames,
        getGameById,
        getGamesByGenre,
        createGameCard,
        loadGenreSections,
        nextSlide,
        prevSlide
    };
}