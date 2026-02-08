// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send this data to a server
            console.log({
                name: name,
                email: email,
                message: message,
                timestamp: new Date()
            });
        } else {
            showNotification('Please fill out all fields', 'error');
        }
    });
}

// ===== Notification System =====
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Smooth Scroll Enhancement =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ===== Scroll Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe team members and event cards
document.querySelectorAll('.team-member, .event-card, .benefit-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Active Navigation Link =====
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style to nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Event Registration Handler =====
document.querySelectorAll('.btn-sm').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent === 'Register') {
            e.preventDefault();
            showNotification('Registration successful! Check your email for confirmation.', 'success');
        }
    });
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ===== Responsive Menu Handling =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});

// ===== Event Delegation for Dynamic Content =====
document.addEventListener('click', (e) => {
    // Handle any dynamically added buttons
    if (e.target.closest('.btn-primary')) {
        // Add specific tracking or analytics if needed
    }
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ===== Console Message =====
console.log('%c IEEE Student Branch Website', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%c Advancing technology for humanity', 'color: #666; font-size: 14px;');
console.log('%c Built with passion and innovation', 'color: #999; font-size: 12px;');
