document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    };

    burger.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                toggleMenu();
            }
        });
    });

    // --- Active Link Observer ---
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        threshold: 0.6,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --- Smooth Scroll Fallback ---
    navItems.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple Validation
            if (!name || !email || !message) {
                showFeedback('Please fill in all fields.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showFeedback('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate API Call
            const submitBtn = contactForm.querySelector('button');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                showFeedback(`Thank you, ${sanitize(name)}! Your message has been sent.`, 'success');
                contactForm.reset();
            }, 1500);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function sanitize(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    function showFeedback(msg, type) {
        formFeedback.textContent = msg;
        formFeedback.className = `form-feedback ${type}`;
        
        if (type === 'success') {
            setTimeout(() => {
                formFeedback.className = 'form-feedback';
            }, 5000);
        }
    }
});