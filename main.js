// ================================================
// ===== NAVBAR TOGGLE (Mobile) =====
// ================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// ================================================
// ===== NAVBAR HIDE ON SCROLL =====
// ================================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (currentScroll > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// ================================================
// ===== BACK TO TOP =====
// ================================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ================================================
// ===== FAQ DROPDOWN =====
// ================================================
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer').forEach(el => {
        if (el !== answer) {
            el.classList.remove('open');
            el.previousElementSibling.classList.remove('active');
        }
    });

    if (isOpen) {
        answer.classList.remove('open');
        button.classList.remove('active');
    } else {
        answer.classList.add('open');
        button.classList.add('active');
    }
}

// ================================================
// ===== SCROLL ANIMATIONS =====
// ================================================
(function() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => {
        if (el) observer.observe(el);
    });

    setTimeout(() => {
        elements.forEach(el => {
            if (el) {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if (rect.top < windowHeight * 0.85) {
                    el.classList.add('is-visible');
                }
            }
        });
    }, 100);
})();

// ================================================
// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
// ================================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================================
// ===== CLOSE MOBILE NAV ON LINK CLICK =====
// ================================================
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            const icon = navToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});
