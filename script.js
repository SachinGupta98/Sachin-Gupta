// ====== Custom Cursor ======
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    // Only update cursor position if it exists on screen
    if(cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

document.querySelectorAll('a, button, input, textarea, .glass-card').forEach(link => {
    link.addEventListener('mouseenter', () => {
        if(cursor) cursor.classList.add('hovered');
    });
    link.addEventListener('mouseleave', () => {
        if(cursor) cursor.classList.remove('hovered');
    });
});

// ====== Navbar Scroll Effect ======
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ====== Mobile Menu Toggle ======
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.innerHTML = navLinks.classList.contains('nav-active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ====== Typing Effect ======
const texts = ["Software Developer", "Cybersecurity Enthusiast", "AI/Data Science Learner", "Problem Solver"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;
let typeSpeed = 100;

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];

    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }

    const typingElement = document.querySelector('.typing-text');
    if (typingElement) typingElement.textContent = letter;

    if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 2000; // Wait before deleting
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 100; // Type fast
    } else if (isDeleting) {
        typeSpeed = 50; // Delete fast
    }

    setTimeout(type, typeSpeed);
}());

// ====== Scroll Reveal Animation ======
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active'); // repeat animation on scroll up
        }
    });
};

const revealOptions = {
    threshold: 0.15,
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ====== EmailJS Form Handling ======
// REPLACE THESE CONSTANTS WITH YOUR ACTUAL EMAILJS KEYS
const PUBLIC_KEY = "lmCnEFeQ--yAp7N4m"; // e.g. "user_xxxxxxxxxxxxxxx"
const SERVICE_ID = "service_pv6f41p"; // e.g. "service_xxxxxxx"
const TEMPLATE_ID = "template_p973h61"; // e.g. "template_xxxxxxx"

// Initialize EmailJS (only if keys are set in script.js)
if (PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(PUBLIC_KEY);
}

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const msgElement = document.getElementById('form-msg');
        msgElement.textContent = "Sending...";
        msgElement.className = "form-message";

        if (PUBLIC_KEY === "YOUR_PUBLIC_KEY" || !PUBLIC_KEY) {
            msgElement.textContent = "EmailJS keys are not configured. Please add them in script.js!";
            msgElement.className = "form-message form-error";
            return;
        }

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
            .then(function() {
                msgElement.textContent = "Message sent successfully! I'll get back to you soon.";
                msgElement.className = "form-message form-success";
                contactForm.reset();
            }, function(error) {
                msgElement.textContent = "Failed to send the message. Please try again.";
                msgElement.className = "form-message form-error";
                console.error(error);
            });
    });
}

// ====== Theme Toggle ======
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

// Check for saved theme in localStorage
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.classList.add(currentTheme);
    if (currentTheme === 'light-theme' && themeIcon) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-theme');
        let theme = 'dark-theme';

        if (document.documentElement.classList.contains('light-theme')) {
            theme = 'light-theme';
            if (themeIcon) {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        } else {
            if (themeIcon) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        }
        
        localStorage.setItem('theme', theme);
    });
}
