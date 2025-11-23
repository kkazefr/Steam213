// Use the data passed from the server instead of hardcoded arrays
const games = window.ALL_GAMES || [];
const popularGames = window.POPULAR_GAME_IDS || [];

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
    ).filter(game => game); // Filter out undefined games
    
    const carouselTrack = document.getElementById('carouselTrack');
    
    if (popularGameObjects.length === 0) {
        carouselTrack.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--medium-gray); width: 100%;">
                <i class="fas fa-gamepad" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>No popular games found</p>
            </div>
        `;
        return;
    }
    
    // Duplicate items for infinite loop
    const carouselItems = [...popularGameObjects, ...popularGameObjects, ...popularGameObjects]
        .map(game => createCarouselItem(game)).join('');
    
    carouselTrack.innerHTML = carouselItems;
    updateCarousel();
}

function updateCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const itemWidth = 25; 
    const translateX = -currentSlide * itemWidth;
    carouselTrack.style.transform = `translateX(${translateX}%)`;
}

function nextSlide() {
    const totalSlides = popularGames.length;
    if (totalSlides === 0) return;
    
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    const totalSlides = popularGames.length;
    if (totalSlides === 0) return;
    
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function startAutoSlide() {
    if (popularGames.length === 0) return;
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
                <button class="nav-btn" onclick="showMainView()" style="margin: 0;">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back to All Games</span>
                </button>
            </div>
            <div class="genre-grid">
                ${filteredGames.map(game => createGameCard(game)).join('')}
            </div>
            ${filteredGames.length === 0 ? `
                <div style="text-align: center; padding: 2rem; color: var(--medium-gray);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No games found matching "${searchTerm}"</p>
                    <button class="show-more-btn" onclick="showMainView()" style="margin-top: 1rem;">
                        View All Games
                    </button>
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
    
    if (genreGames.length === 0) {
        return `
            <div class="genre-section" data-genre="${genre}">
                <div class="genre-header">
                    <h2 class="genre-title">${title}</h2>
                </div>
                <div style="text-align: center; padding: 2rem; color: var(--medium-gray);">
                    <i class="fas fa-gamepad" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No ${title.toLowerCase()} available</p>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="genre-section" data-genre="${genre}">
            <div class="genre-header">
                <h2 class="genre-title">${title}</h2>
                <span class="game-count">${genreGames.length} games</span>
            </div>
            <div class="genre-grid">
                ${visibleGames.map(game => createGameCard(game)).join('')}
            </div>
            ${hiddenGames.length > 0 ? `
                <div class="hidden-games" id="hidden-${genre}">
                    ${hiddenGames.map(game => createGameCard(game)).join('')}
                </div>
                <button class="show-more-btn" onclick="toggleShowMore('${genre}')">
                    Show More (${hiddenGames.length}+)
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
    
    if (!hiddenSection || !button) return;
    
    if (hiddenSection.classList.contains('show')) {
        hiddenSection.classList.remove('show');
        button.textContent = `Show More (${hiddenSection.children.length}+)`;
        // Scroll to the section
        hiddenSection.closest('.genre-section').scrollIntoView({ behavior: 'smooth' });
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
    
    // Add input event for real-time search (optional)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm.length >= 2) {
            searchTimeout = setTimeout(() => {
                const filteredGames = games.filter(game => 
                    game.title.toLowerCase().includes(searchTerm)
                );
                showSearchView(searchTerm, filteredGames);
            }, 300);
        } else if (searchTerm === '') {
            showMainView();
        }
    });
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

// Scroll to top function with animation
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

// Loading state management
function showLoadingState() {
    const genreSections = document.getElementById('genreSections');
    genreSections.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div class="loading-spinner"></div>
            <p>Loading games...</p>
        </div>
    `;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show loading state initially
    showLoadingState();
    
    // Small delay to ensure DOM is ready and data is loaded
    setTimeout(() => {
        if (games.length === 0) {
            console.warn('No games data loaded from server');
            document.getElementById('genreSections').innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--medium-gray);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No games data available</p>
                    <button class="show-more-btn" onclick="location.reload()" style="margin-top: 1rem;">
                        Reload Page
                    </button>
                </div>
            `;
            return;
        }
        
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
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Start auto slide
        startAutoSlide();
        
        console.log(`🎮 Loaded ${games.length} games from database`);
        console.log(`🔥 ${popularGames.length} popular games in carousel`);
    }, 100);
});

// Game selection handling - Navigate to game pages
document.addEventListener('click', function(e) {
    const gameCard = e.target.closest('.game-card, .carousel-game');
    if (gameCard) {
        const gameId = gameCard.dataset.gameId;
        // Navigate to game page
        window.location.href = `/game/${gameId}`;
    }
});

// Utility function to get game by ID
function getGameById(gameId) {
    return games.find(game => game.id === parseInt(gameId));
}

// Utility function to get games by genre
function getGamesByGenre(genre) {
    return games.filter(game => game.genre === genre);
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    stopAutoSlide();
});

// Add CSS for loading spinner (injected dynamically)
const loadingStyles = `
.loading-spinner {
    border: 3px solid var(--mint-cream);
    border-top: 3px solid var(--medium-blue);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.game-count {
    background: var(--light-teal);
    color: var(--deep-purple);
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
}

body.dark-theme .game-count {
    background: var(--medium-blue);
    color: var(--mint-cream);
}
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

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