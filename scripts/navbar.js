// Function to create the standard navbar
function createStandardNavbar() {
    const navbarContainer = document.getElementById('navbar-container');

    navbarContainer.innerHTML = `
        <nav class="glass-navbar">
            <img src="/assets/ST-BANNER-PRZEZ.png" alt="Logo" class="navbar-logo">
            <div class="navbar-menu">
                <ul>
                    <li><a href="/">Strona głowna</a></li>
                    <li><a href="/mps.html">Posłowie</a></li>
                    <li><a href="/votings.html">Głosowania</a></li>
                    <li><a href="/prints.html">Druki</a></li>
                    <li><a href="/clubs.html">Kluby i koła</a></li>
                    <li><a href="/live.html">LIVE</a></li>
                </ul>
            </div>
        </nav>
    `;
}

// Function to create the mobile navbar
function createMobileNavbar() {
    const navbarContainer = document.getElementById('navbar-container');

    navbarContainer.innerHTML = `
        <nav class="glass-navbar">
            <img src="/assets/ST-BANNER-PRZEZ.png" alt="Logo" class="navbar-logo">
            <div class="hamburger" onclick="toggleMobileMenu(this)">
                &#9776; <!-- Hamburger icon -->
            </div>
        </nav>
        <div class="mobile-menu" id="mobile-menu">
            <ul>
                <li><a href="/">Strona głowna</a></li>
                <li><a href="/mps.html">Posłowie</a></li>
                <li><a href="/votings.html">Głosowania</a></li>
                <li><a href="/prints.html">Druki</a></li>
                <li><a href="/clubs.html">Kluby i koła</a></li>
                <li><a href="/live.html">LIVE</a></li>
            </ul>
        </div>
    `;
    const hamburger = document.querySelector('.hamburger');
    hamburger.style.display = 'block';
}

// Function to toggle mobile menu visibility
function toggleMobileMenu(element) {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');

    // Toggle display of the mobile menu
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.style.display = 'block'; // Show menu
        element.innerHTML = '&#10006;'; // Change to X icon
    } else {
        mobileMenu.style.display = 'none'; // Hide menu
        element.innerHTML = '&#9776;'; // Change back to hamburger icon
    }
}

// Function to close the mobile menu
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.remove('active');
    mobileMenu.style.display = 'none'; // Hide the menu
    const hamburger = document.querySelector('.hamburger');
    hamburger.innerHTML = '&#9776;'; // Change back to hamburger icon
}

// Function to update navbar based on screen size
function updateNavbar() {
    if (window.innerWidth <= 1120) {
        createMobileNavbar();
    } else {
        createStandardNavbar();
    }
}

// Event listener for resizing the window
window.addEventListener('resize', updateNavbar);
