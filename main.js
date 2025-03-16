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
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Construct email body with Name and Phone at the top
    const emailBody = `Name: ${name}\nPhone: ${phone}\n\n${message}`;

    // Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=osumbaevans21@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open Gmail compose in a new tab
    window.open(gmailUrl, '_blank');

    // Show success message and reset form
    setTimeout(() => {
        alert('Email prepared! Please click "Send" in Gmail.');
        contactForm.reset();
    }, 500); // Delay to ensure Gmail opens first
});


// Function to type and erase text letter by letter (for highlight text)
function typeEraseHighlight() {
    const highlight = document.getElementById("highlight");
    const text = "Evans Osumba | Software Developer";
    let index = 0;
    let isErasing = false;

    function type() {
        if (index < text.length && !isErasing) {
            highlight.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Typing speed
        } else if (index === text.length && !isErasing) {
            isErasing = true;
            setTimeout(erase, 5000); // Wait 5 seconds before erasing
        }
    }

    function erase() {
        if (index > 1) { // Stop erasing at the first letter
            highlight.textContent = text.substring(0, index - 1);
            index--;
            setTimeout(erase, 50); // Erasing speed
        } else {
            isErasing = false;
            setTimeout(type, 100); // Wait 1 second before retyping
        }
    }

    type();
}



function cycleSubtitles() {
    const subtitle = document.getElementById("subtitle1"); // Only one subtitle
    const text = "Building Transformations for the future";

    function typeEraseSubtitle() {
        let index = 0;
        let isErasing = false;

        function type() {
            if (index < text.length && !isErasing) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100); // Typing speed
            } else if (index === text.length && !isErasing) {
                isErasing = true;
                setTimeout(erase, 5000); // Wait 5 seconds before erasing
            }
        }

        function erase() {
            if (index > 1) { // Stop erasing at the first letter
                subtitle.textContent = text.substring(0, index - 1);
                index--;
                setTimeout(erase, 50); // Erasing speed
            } else {
                isErasing = false;
                setTimeout(type, 100); // Wait 1 second before retyping
            }
        }

        type();
    }

    // Start the animation
    typeEraseSubtitle();
}

// Initialize functions
typeEraseHighlight();
cycleSubtitles();



//experience//
document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active");
                }
            });
        },
        { threshold: 0.5 }
    );

    timelineItems.forEach((item) => {
        observer.observe(item);
    });
});
