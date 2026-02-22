// ===== TYPING ANIMATION =====
const typingPhrases = [
    'Autonomous AI Agents',
    'RAG-Based Systems',
    'Multi-Agent Architectures',
    'Intelligent Workflows'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
        typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

// Start typing after small delay
setTimeout(typeEffect, 800);

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

function handleNavScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close mobile menu on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the reveal for sibling elements
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let delay = 0;
            siblings.forEach((sibling, i) => {
                if (sibling === entry.target) {
                    delay = i * 100;
                }
            });

            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, Math.min(delay, 400));

            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== ANIMATED COUNTERS =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 40;
    const duration = 1500;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetEl = document.querySelector(this.getAttribute('href'));
        if (targetEl) {
            const offset = 80;
            const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== SERVICE CARD GLOW FOLLOW =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const glow = card.querySelector('.service-card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.06), transparent 50%)`;
            glow.style.opacity = '1';
        }
    });

    card.addEventListener('mouseleave', () => {
        const glow = card.querySelector('.service-card-glow');
        if (glow) {
            glow.style.opacity = '0';
        }
    });
});
