const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'games.db');
const db = new sqlite3.Database(dbPath);

// Create games table with all necessary fields
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        genre TEXT NOT NULL,
        image TEXT NOT NULL,
        para1 TEXT,
        para2 TEXT, 
        para3 TEXT,
        features TEXT,
        requirements TEXT,
        file_size TEXT,
        version TEXT,
        release_date TEXT,
        download_count INTEGER DEFAULT 0,
        rating REAL DEFAULT 4.5,
        is_popular BOOLEAN DEFAULT 0
    )`);

    // Clear existing data to avoid duplicates
    db.run("DELETE FROM games");

    const stmt = db.prepare(`INSERT INTO games VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    
    // Action Games (complete all 12)
stmt.run(1, "Grand Theft Auto V", "action", "/images/gtaV.jpg",
        "Grand Theft Auto V is an epic adventure set in the sprawling city of Los Santos.",
        "With stunning graphics and an immersive open world, GTA V offers unprecedented freedom.",
        "From high-speed car chases to intense shootouts and heists, every moment is packed with action.",
        "Open World|Multiplayer|Story Mode|Vehicle Customization|Heists",
        "Windows 10/11|Intel i5-8400|8GB RAM|GTX 1060|50GB SSD",
        "116 GB", "1.0.4", "2013", 12500, 4.8, 1
    );
    
    stmt.run(2, "Grand Thet Auto: Sand Anderas", "action", "/images/sanandreas.jpeg",
        "Grand Theft Auto: San Andreas takes you back to the early 90s.",
        "This classic game revolutionized open-world gaming with its massive map.",
        "With an incredible soundtrack and endless activities, San Andreas remains beloved.",
        "Open World|Character Customization|Gang Wars|Multiple Cities",
        "Windows 10|Intel i3|4GB RAM|GTX 750|5GB HDD",
        "4.7 GB", "1.0.2", "2022", 8900, 4.7, 1
    );

    stmt.run(3, "Red Dead Redemption 2", "action", "/images/reddead2.jpg",
        "Red Dead Redemption 2 is an epic tale of life in America's heartland.",
        "As Arthur Morgan, survive in a brutal world where lawmen pursue you.",
        "From hunting to intense gunfights, every choice shapes your journey.",
        "Open World|Story Rich|Western|Hunting|Horse Riding",
        "Windows 10|Intel i7-4770K|12GB RAM|GTX 1060|150GB SSD",
        "120 GB", "1.0.3", "2023", 9800, 4.9, 1
    );

    stmt.run(4, "Cyberpunk2077", "action", "/images/cyberpunk2077.jpg",
        "Cyberpunk 2077 is set in Night City, obsessed with power and body modification.",
        "You play as V, a mercenary outlaw going after a one-of-a-kind implant.",
        "Explore the vast city where choices shape the story and world around you.",
        "Open World|RPG Elements|Cyberpunk|First-Person",
        "Windows 10|Intel i7-4790|12GB RAM|GTX 1060|70GB SSD",
        "68 GB", "2.1", "2023", 11500, 4.6, 1
    );

    stmt.run(5, "Sekiro: Shadows Die Twice", "action", "/images/sekiro.jpg",
        "Sekiro: Shadows Die Twice is a masterpiece of action and precision combat.",
        "As the 'one-armed wolf', embark on a quest to rescue your kidnapped lord.",
        "Master the art of the katana and shinobi prosthetic tools in feudal Japan.",
        "Action RPG|Souls-like|Precision Combat|Feudal Japan",
        "Windows 10|Intel i5-2500K|8GB RAM|GTX 970|25GB SSD",
        "23 GB", "1.0.6", "2019", 8700, 4.8, 1
    );

    stmt.run(6, "Ghost of Tsushima", "action", "/images/ghostoftsushima.jpg",
        "Ghost of Tsushima is set in 1274 on the island of Tsushima.",
        "As Jin Sakai, protect your people from the Mongol invasion.",
        "Master the way of the samurai or become the Ghost using stealth.",
        "Open World|Samurai|Stealth|Story Rich|Historical",
        "Windows 10|Intel i5-8600|8GB RAM|GTX 1060|50GB SSD",
        "48 GB", "1.0.1", "2024", 5600, 4.7, 0
    );

    stmt.run(7, "Resident evil 4", "action", "/images/residentevil4.jpg",
        "Resident Evil 4 revolutionized the survival horror genre.",
        "Special agent Leon S. Kennedy rescues the President's daughter.",
        "Fight through infected villagers and uncover a dark conspiracy.",
        "Survival Horror|Third-Person|Action|Story Rich",
        "Windows 10|Intel i5-7500|8GB RAM|GTX 1050 Ti|30GB SSD",
        "28 GB", "1.0.2", "2023", 7200, 4.6, 0
    );

    stmt.run(8, "Elden Ring Deluxe Edition", "action", "/images/eldenring.jpg",
        "Elden Ring is a masterpiece of open-world fantasy and challenging combat.",
        "Journey through the Lands Between, a vast world filled with mystery and danger.",
        "Create your character and explore dungeons, castles, and breathtaking landscapes.",
        "Open World|Souls-like|RPG|Fantasy|Character Customization",
        "Windows 10|Intel i5-8400|12GB RAM|GTX 1060|60GB SSD",
        "55 GB", "1.1.0", "2022", 13400, 4.9, 1
    );

    stmt.run(9, "Call of Duty: Black Ops 6", "action", "/images/bo6.png",
        "Call of Duty: Black Ops 6 continues the iconic Black Ops series.",
        "Experience intense military combat across global conflict zones.",
        "Engage in thrilling multiplayer battles and a gripping campaign story.",
        "FPS|Multiplayer|Campaign|Zombies|Tactical Combat",
        "Windows 10|Intel i7-9700K|16GB RAM|RTX 2070|175GB SSD",
        "170 GB", "1.0.0", "2024", 9800, 4.5, 1
    );

    stmt.run(10, "Call of Duty: Black Ops Cold War", "action", "/images/coldwar.jpg",
        "Call of Duty: Black Ops Cold War takes you to the 1980s Cold War era.",
        "Hunt a shadowy figure in a gripping single-player campaign.",
        "Experience iconic 80s locations and weapons in multiplayer modes.",
        "FPS|Cold War Era|Multiplayer|Campaign|Zombies",
        "Windows 10|Intel i5-2500K|8GB RAM|GTX 960|82GB SSD",
        "80 GB", "1.3.4", "2020", 7600, 4.4, 0
    );

    stmt.run(11, "Call of Duty: Modern Warfare III", "action", "/images/mw3.png",
        "Modern Warfare III continues the epic story of Task Force 141.",
        "Face ultimate threats in a globe-trotting campaign against new enemies.",
        "Experience refined multiplayer with classic maps and new game modes.",
        "FPS|Modern Warfare|Multiplayer|Campaign|Spec Ops",
        "Windows 10|Intel i5-6600K|8GB RAM|GTX 960|79GB SSD",
        "78 GB", "1.2.1", "2023", 8900, 4.3, 0
    );

    stmt.run(12, "HITMAN 3", "action", "/images/hitman3.png",
        "HITMAN 3 is the dramatic conclusion to the World of Assassination trilogy.",
        "Travel to exotic locations and eliminate targets with creative freedom.",
        "Master the art of assassination in the most immersive Hitman experience.",
        "Stealth|Assassination|Sandbox|Puzzle|Story Rich",
        "Windows 10|Intel i5-2500K|8GB RAM|GTX 1050|60GB SSD",
        "58 GB", "1.5.0", "2021", 5400, 4.7, 0
    );

    // RPG Games (add a few more)
    stmt.run(13, "Magic Kingdom", "rpg", "/images/magic-kingdom.jpg",
        "Magic Kingdom is an enchanting RPG where you build your realm.",
        "Create spells, train wizards, and defend from dark forces.",
        "Explore ancient ruins and form alliances with mythical creatures.",
        "Fantasy|Kingdom Building|Magic System|Exploration",
        "Windows 10|Intel i5-6400|8GB RAM|GTX 1050|25GB HDD",
        "22 GB", "1.0.1", "2023", 3400, 4.3, 1
    );

    stmt.run(14, "Fantasy World", "rpg", "/images/fantasy-world.jpg",
        "Fantasy World immerses you in a vast, living universe.",
        "Travel across continents with unique cultures and challenges.",
        "Dynamic world changes based on your decisions and actions.",
        "Open World|Character Development|Magic System|Quests",
        "Windows 10|Intel i5-6600|8GB RAM|GTX 1060|45GB SSD",
        "40 GB", "1.2.0", "2023", 4100, 4.4, 1
    );

    // Adventure Games (add a few more)
    stmt.run(25, "Ocean Explorer", "adventure", "/images/ocean-explorer.jpg",
        "Ocean Explorer takes you on an underwater adventure.",
        "Discover mysteries of the deep sea and document new species.",
        "Explore coral reefs, shipwrecks, and encounter marine life.",
        "Exploration|Underwater|Puzzle Solving|Marine Biology",
        "Windows 10|Intel i5-4590|8GB RAM|GTX 960|20GB HDD",
        "18 GB", "1.0.3", "2023", 2900, 4.2, 1
    );

    stmt.run(26, "Wild West", "adventure", "/images/wild-west.jpg",
        "Wild West transports you to the American frontier.",
        "Live as a cowboy, bounty hunter, or prospector.",
        "Ride across vast landscapes and build your reputation.",
        "Western|Open World|Hunting|Horse Riding|Story Rich",
        "Windows 10|Intel i5-7400|8GB RAM|GTX 1050|35GB SSD",
        "32 GB", "1.1.0", "2023", 3800, 4.5, 1
    );

    stmt.finalize();
    
    console.log('✅ Database initialized with game data!');
});

// Database helper functions
const dbHelper = {
    // Get all games
    getAllGames: (callback) => {
        db.all("SELECT * FROM games ORDER BY id", callback);
    },
    
    // Get popular games
    getPopularGames: (callback) => {
        db.all("SELECT * FROM games WHERE is_popular = 1 ORDER BY download_count DESC", callback);
    },
    
    // Get game by ID
    getGameById: (id, callback) => {
        db.get("SELECT * FROM games WHERE id = ?", [id], callback);
    },
    
    // Get games by genre
    getGamesByGenre: (genre, callback) => {
        db.all("SELECT * FROM games WHERE genre = ? ORDER BY title", [genre], callback);
    },
    
    // Update download count
    incrementDownloadCount: (gameId, callback) => {
        db.run("UPDATE games SET download_count = download_count + 1 WHERE id = ?", [gameId], callback);
    }
};

module.exports = { db, dbHelper };