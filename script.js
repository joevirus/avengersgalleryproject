document.addEventListener('DOMContentLoaded', function() {
    // Add hero names to gallery items for mini bio hover effect
    setupGallery();
    
    // Create and add mode toggle button
    createModeToggle();
    
    // Add back button to hero pages
    addBackButton();
    
    // Setup power stat animations
    setupPowerStats();
    
    // Apply hero-specific styling
    applyHeroStyling();
});

// Setup gallery items with hero names
function setupGallery() {
    const heroNames = {
        'avenger-1.html': 'Thor: God of Thunder',
        'avenger-2.html': 'Iron Man: Genius Billionaire',
        'avenger-3.html': 'Hulk: Strongest Avenger',
        'avenger-4.html': 'Hawkeye: Master Marksman',
        'avenger-5.html': 'Captain America: First Avenger',
        'avenger-6.html': 'Black Widow: Master Spy'
    };
    
    // Add hero names as data attributes for hover effect
    const galleryLinks = document.querySelectorAll('.Gallery a');
    galleryLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.setAttribute('data-hero', heroNames[href] || 'Avenger');
        
        // Add class for individual styling
        link.classList.add(href.replace('.html', ''));
    });
}

// Create mode toggle button (light/dark)
function createModeToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mode-toggle';
    toggleBtn.innerHTML = '🌓';
    toggleBtn.setAttribute('aria-label', 'Toggle light/dark mode');
    
    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        // Save preference to localStorage
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('lightMode', isLightMode);
    });
    
    document.body.appendChild(toggleBtn);
    
    // Check for saved preference
    if (localStorage.getItem('lightMode') === 'true') {
        document.body.classList.add('light-mode');
    }
}

// Add back button to hero pages
function addBackButton() {
    // Only add back button if not on index page
    if (!window.location.pathname.includes('index') && !window.location.pathname.endsWith('/')) {
        const backBtn = document.createElement('button');
        backBtn.className = 'back-button';
        backBtn.innerHTML = '←';
        backBtn.setAttribute('aria-label', 'Back to gallery');
        
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        
        document.body.appendChild(backBtn);
    }
}

// Setup power stat animations
function setupPowerStats() {
    // Check if we're on a hero page with power stats
    const statsSection = document.querySelector('.stats-section');
    
    if (statsSection) {
        // Get the hero color from CSS variables
        let heroColor = '#cc0000'; // default
        const heroClass = document.body.className.split(' ')
            .find(cls => cls.startsWith('avenger-'));
            
        if (heroClass) {
            const root = document.documentElement;
            heroColor = getComputedStyle(root)
                .getPropertyValue(`--${heroClass}-color`).trim() || heroColor;
        }
        
        // Convert percentage text to animated bars
        const statElements = statsSection.querySelectorAll('p');
        statElements.forEach(stat => {
            const text = stat.innerHTML;
            const parts = text.split(':');
            
            if (parts.length >= 2) {
                const label = parts[0].replace(/<\/?b>/g, '');
                const value = parts[1].trim().replace('%', '').trim();
                
                // Create new stat display
                const newStat = document.createElement('div');
                newStat.className = 'stat-container';
                newStat.innerHTML = `
                    <div class="stat-label">${label}</div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="--stat-value: ${value}%"></div>
                    </div>
                    <div class="stat-value">${value}%</div>
                `;
                
                // Replace the original element
                stat.parentNode.replaceChild(newStat, stat);
            }
        });
        
        // Trigger animations after a slight delay
        setTimeout(() => {
            document.querySelectorAll('.stat-fill').forEach(fill => {
                fill.style.width = fill.style.getPropertyValue('--stat-value');
            });
        }, 300);
    }
}

// Add hero specific styling when viewing individual pages
function applyHeroStyling() {
    const path = window.location.pathname;
    const heroPage = path.split('/').pop().replace('.html', '');
    
    if (heroPage.startsWith('avenger-')) {
        document.body.classList.add(heroPage);
        document.documentElement.style.setProperty('--hero-color', 
            getHeroColor(heroPage));
    }
}

// Get hero color based on page
function getHeroColor(heroPage) {
    const colors = {
        'avenger-1': '#cc0000', // Thor - Red
        'avenger-2': '#ff6600', // Iron Man - Orange
        'avenger-3': '#00aa00', // Hulk - Green
        'avenger-4': '#800080', // Hawkeye - Purple
        'avenger-5': '#0055cc', // Captain America - Blue
        'avenger-6': '#cc0000'  // Black Widow - Red
    };
    
    return colors[heroPage] || '#cc0000';
}