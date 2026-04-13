// ========== DARK MODE TOGGLE ==========
function updateDarkModeUI(isDark) {
    const toggleIcon = document.querySelector('.toggle-icon');
    const toggleText = document.querySelector('.toggle-text');

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

// Apply saved theme IMMEDIATELY (before DOM fully loads, prevents flicker)
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
}

// ========== EVERYTHING ELSE AFTER DOM IS READY ==========
document.addEventListener('DOMContentLoaded', () => {

    // Update toggle UI to match current theme
    updateDarkModeUI(document.body.classList.contains('dark'));

    // Dark mode button
    const darkToggle = document.getElementById('darkToggle');
    darkToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        updateDarkModeUI(document.body.classList.contains('dark'));
    });

    // ========== MOBILE MENU TOGGLE ==========
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
        });
    });

    // ========== ANIMATED COUNTERS ==========
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 80;
            const duration = 2000;
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

    const statsCard = document.querySelector('.stats-card');
    let countersAnimated = false;

    if (statsCard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    animateCounters();
                    countersAnimated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" });

        observer.observe(statsCard);
    }

    // ========== PAGE LOAD ANIMATION ==========
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

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#/') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ========== ACTIVE NAV LINK ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ========== CONTACT FORM VALIDATION ==========
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    function validateName() {
        if (!nameInput) return true;
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
        if (!emailInput) return true;
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
        if (!messageInput) return true;
        const message = messageInput.value.trim();
        if (message === '') {
            messageError.textContent = 'Please enter your message';
            messageError.classList.add('show');
            messageInput.classList.add('error');
            return false;
        } else if (message.length < 2) {
            messageError.textContent = 'Message must be at least 2 characters';
            messageError.classList.add('show');
            messageInput.classList.add('error');
            return false;
        } else {
            messageError.classList.remove('show');
            messageInput.classList.remove('error');
            return true;
        }
    }

    if (nameInput) {
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
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
        });
    }

    // ========== CONSOLE WELCOME MESSAGE ==========
    console.log('%c🚀 Welcome to Makanaka\'s Portfolio!', 'color: #38bdf8; font-size: 16px; font-weight: bold;');
    console.log('%cThanks for visiting! Check out my work and feel free to connect.', 'color: #a855f7; font-size: 12px;');
});
