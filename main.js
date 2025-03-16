// Toggle Mobile Menu
function toggleMobileMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}

// Close Mobile Menu
function closeMobileMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.remove('active');
}

// Close Mobile Menu on Outside Click
document.addEventListener('click', (e) => {
    const navList = document.querySelector('.nav-list');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navList.contains(e.target) && !mobileMenuToggle.contains(e.target) && navList.classList.contains('active')) {
        navList.classList.remove('active');
    }
});

// Auto-Swipe Projects
let currentProjectIndex = 0;
const projectsWrapper = document.querySelector('.projects-wrapper');
const projectCards = document.querySelectorAll('.project-card');
const totalProjects = projectCards.length;
let autoSwipeInterval = null;
let isSwiping = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function updateProjects() {
    const cardWidth = projectCards[0].offsetWidth + 20; // Including gap
    projectsWrapper.style.transform = `translateX(-${currentProjectIndex * cardWidth}px)`;
}

function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
    updateProjects();
}

function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
    updateProjects();
}

function startAutoSwipe() {
    if (!autoSwipeInterval) {
        autoSwipeInterval = setInterval(nextProject, 5000);
    }
}

function stopAutoSwipe() {
    clearInterval(autoSwipeInterval);
    autoSwipeInterval = null;
    // Restart auto-swipe after 2 minutes (120000 ms)
    setTimeout(startAutoSwipe, 120000);
}

// Swipe functionality
projectsWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    stopAutoSwipe();
    prevTranslate = currentTranslate;
    projectsWrapper.style.transition = 'none';
});

projectsWrapper.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    currentTranslate = prevTranslate + diffX;
    projectsWrapper.style.transform = `translateX(${currentTranslate}px)`;
});

projectsWrapper.addEventListener('touchend', (e) => {
    isSwiping = false;
    projectsWrapper.style.transition = 'transform 0.6s ease-in-out';
    const cardWidth = projectCards[0].offsetWidth + 20;
    const threshold = cardWidth / 3; // Swipe threshold

    if (Math.abs(currentTranslate - prevTranslate) > threshold) {
        if (currentTranslate < prevTranslate) {
            nextProject();
        } else {
            prevProject();
        }
    } else {
        updateProjects(); // Snap back if swipe not far enough
    }
    currentTranslate = -currentProjectIndex * cardWidth;
});

// Mouse drag for desktop (optional)
projectsWrapper.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isSwiping = true;
    stopAutoSwipe();
    prevTranslate = currentTranslate;
    projectsWrapper.style.transition = 'none';
});

projectsWrapper.addEventListener('mousemove', (e) => {
    if (!isSwiping) return;
    const currentX = e.clientX;
    const diffX = currentX - startX;
    currentTranslate = prevTranslate + diffX;
    projectsWrapper.style.transform = `translateX(${currentTranslate}px)`;
});

projectsWrapper.addEventListener('mouseup', (e) => {
    isSwiping = false;
    projectsWrapper.style.transition = 'transform 0.6s ease-in-out';
    const cardWidth = projectCards[0].offsetWidth + 20;
    const threshold = cardWidth / 3;

    if (Math.abs(currentTranslate - prevTranslate) > threshold) {
        if (currentTranslate < prevTranslate) {
            nextProject();
        } else {
            prevProject();
        }
    } else {
        updateProjects();
    }
    currentTranslate = -currentProjectIndex * cardWidth;
});

projectsWrapper.addEventListener('mouseleave', () => {
    if (isSwiping) {
        isSwiping = false;
        projectsWrapper.style.transition = 'transform 0.6s ease-in-out';
        updateProjects();
    }
});

// Initial setup
updateProjects();
startAutoSwipe();

// Update on window resize
window.addEventListener('resize', updateProjects);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Message sent successfully!');
    contactForm.reset();
});



// Function to type and erase text letter by letter
function typeEraseText(element, text, delay = 100, eraseDelay = 3000) {
    let index = 0;
    let isErasing = false;

    function type() {
        if (index < text.length && !isErasing) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, delay);
        } else if (index === text.length && !isErasing) {
            isErasing = true;
            setTimeout(type, eraseDelay);
        } else if (isErasing && index > 0) {
            element.textContent = text.substring(0, index - 1);
            index--;
            setTimeout(type, delay / 2);
        } else {
            isErasing = false;
            setTimeout(type, delay);
        }
    }

    type();
}

// Function to cycle through subtitles
    function cycleSubtitles() {
        const subtitles = [
            document.getElementById("subtitle1"),
            document.getElementById("subtitle2"),
            document.getElementById("subtitle3"),
        ];

        let currentIndex = 0;

        function showNextSubtitle() {
            subtitles.forEach((subtitle, i) => {
                subtitle.style.opacity = i === currentIndex ? 1 : 0;
                subtitle.textContent = ""; // Clear text before typing
                if (i === currentIndex) {
                    typeEraseText(subtitle, subtitles[currentIndex].dataset.text);
                }
            });

            currentIndex = (currentIndex + 1) % subtitles.length;
            setTimeout(showNextSubtitle, 10000); // 10 seconds per subtitle (7s typing + 3s pause)
        }

        // Set initial text data for subtitles
        subtitles[0].dataset.text = "Get to feel the taste of technology";
        subtitles[2].dataset.text = "Building Transformations for the future";

        showNextSubtitle();
    }

// Function to type the "Software Developer" text
function typeHighlight() {
    const highlight = document.getElementById("highlight");
    const text = "Evans Osumba | Software Developer";
    let index = 0;

    function type() {
        if (index < text.length) {
            highlight.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Typing speed
        } else {
            setTimeout(erase, 7000); // Wait 7 seconds before erasing
        }
    }

    function erase() {
        if (index > 0) {
            highlight.textContent = text.substring(0, index - 1);
            index--;
            setTimeout(erase, 50); // Erasing speed
        } else {
            setTimeout(type, 1000); // Wait 1 second before retyping
        }
    }

    type();
}

// Initialize animations on page load
window.onload = function () {
    typeHighlight();
    cycleSubtitles();
};
