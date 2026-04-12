// ========== DARK MODE TOGGLE ==========
const darkToggle = document.getElementById('darkToggle');
const toggleIcon = darkToggle?.querySelector('.toggle-icon');
const toggleText = darkToggle?.querySelector('.toggle-text');

function updateDarkModeUI(isDark) {
    if (isDark) {
        if (toggleIcon) toggleIcon.textContent = '☀️';
        if (toggleText) toggleText.textContent = 'Light';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        if (toggleIcon) toggleIcon.textContent = '🌙';
        if (toggleText) toggleText.textContent = 'Dark';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check for saved preference on load
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    updateDarkModeUI(true);
} else {
    updateDarkModeUI(false);
}

// Toggle dark mode on button click
darkToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    updateDarkModeUI(document.body.classList.contains('dark'));
});

// ========== MOBILE MENU TOGGLE ==========
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
    });
});

// ========== ANIMATED COUNTERS ==========
// Function to animate counters when they come into view
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 80; // 80 steps for smooth animation
        const duration = 2000; // 2 seconds animation
        const stepTime = duration / 80;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer to trigger counters when stats card is visible
const statsCard = document.querySelector('.stats-card');
let countersAnimated = false;

const observerOptions = {
    threshold: 0.3, // Trigger when 30% of the element is visible
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (statsCard) {
    observer.observe(statsCard);
}

// ========== PAGE LOAD ANIMATION ==========
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        mainContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ========== SMOOTH SCROLL FOR ANY ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#' && targetId !== '#/') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== ADD ACTIVE CLASS TO CURRENT PAGE NAV LINK ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// ========== CONSOLE WELCOME MESSAGE ==========
console.log('%c🚀 Welcome to Makanaka\'s Portfolio!', 'color: #38bdf8; font-size: 16px; font-weight: bold;');
console.log('%cThanks for visiting! Check out my work and feel free to connect.', 'color: #a855f7; font-size: 12px;');
// ========== CONTACT FORM VALIDATION ==========
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// Validation functions
function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
        nameError.textContent = 'Please enter your full name';
        nameError.classList.add('show');
        nameInput.classList.add('error');
        return false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameError.classList.add('show');
        nameInput.classList.add('error');
        return false;
    } else {
        nameError.classList.remove('show');
        nameInput.classList.remove('error');
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        emailError.textContent = 'Please enter your email address';
        emailError.classList.add('show');
        emailInput.classList.add('error');
        return false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address (e.g., name@example.com)';
        emailError.classList.add('show');
        emailInput.classList.add('error');
        return false;
    } else {
        emailError.classList.remove('show');
        emailInput.classList.remove('error');
        return true;
    }
}

function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
        messageError.textContent = 'Please enter your message';
        messageError.classList.add('show');
        messageInput.classList.add('error');
        return false;
    } else if (message.length < 10) {
        messageError.textContent = 'Message must be at least 3 characters';
        messageError.classList.add('show');
        messageInput.classList.add('error');
        return false;
    } else {
        messageError.classList.remove('show');
        messageInput.classList.remove('error');
        return true;
    }
}

// Real-time validation
if (nameInput) {
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
}

// Form submission

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (!(isNameValid && isEmailValid && isMessageValid)) {
            e.preventDefault();

            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // ✅ If valid → form submits normally to Formspree
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});