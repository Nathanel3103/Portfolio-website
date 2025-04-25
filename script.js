// Dark Mode Detection
// Enhanced dark mode toggle with animation
function enhanceDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.innerHTML = `
        <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    `;
    
    document.body.appendChild(darkModeToggle);
    
    const isDarkMode = document.documentElement.classList.contains('dark');
    darkModeToggle.classList.toggle('dark', isDarkMode);
    
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        darkModeToggle.classList.toggle('dark');
        
        // Save preference to localStorage
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    });
    
    // Apply user preference if available
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference) {
        if (savedPreference === 'true') {
            document.documentElement.classList.add('dark');
            darkModeToggle.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            darkModeToggle.classList.remove('dark');
        }
    }
}

document.addEventListener('DOMContentLoaded', enhanceDarkModeToggle);


// Mobile Navigation Toggle
const toggleBtn = document.getElementById('toggleBtn');
const mobileNav = document.getElementById('mobileNav');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
let menuOpen = false;

toggleBtn.addEventListener('click', () => {
    if (!menuOpen) {
        mobileNav.style.right = '0';
        line1.style.transform = 'rotate(45deg) translate(5px, 5px)';
        line2.style.opacity = '0';
        line3.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        menuOpen = true;
    } else {
        mobileNav.style.right = '-100%';
        line1.style.transform = 'rotate(0)';
        line2.style.opacity = '1';
        line3.style.transform = 'rotate(0)';
        menuOpen = false;
    }
});

document.getElementById('toggleBtn').addEventListener('click', function() {
    document.getElementById('mobileNav').classList.toggle('active');
});

// Initialize Typed.js
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed('#typed', {
        strings: ['Software Engineering Student', 'Aspiring Intern', 'AI Enthusiast'],
        typeSpeed: 70,
        backSpeed: 55,
        loop: true
    });
});

// Scroll to Top Button
window.addEventListener("scroll", toggleScrollButton);

function toggleScrollButton() {
    const scrollButton = document.getElementById("scroll-to-top");
    if (!scrollButton) return;

    if (window.scrollY > 200) {
        scrollButton.style.opacity = "1";
        scrollButton.style.pointerEvents = "auto";
    } else {
        scrollButton.style.opacity = "0";
        scrollButton.style.pointerEvents = "none";
    }
}

document.getElementById("scroll-to-top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Close mobile menu if open
            if (menuOpen) {
                mobileNav.style.right = '-100%';
                line1.style.transform = 'rotate(0)';
                line2.style.opacity = '1';
                line3.style.transform = 'rotate(0)';
                menuOpen = false;
            }
            
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Add animation to elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe section headings and content
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Current Year in Footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Notification Function
function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("fade-out");
        notification.addEventListener("transitionend", () => notification.remove());
    }, 3000);
}

// Add a scroll progress indicator
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight * 100;
    
    const progressBar = document.getElementById('scroll-progress') || createProgressBar();
    progressBar.style.width = scrollPercent + '%';
});

function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.width = '0%';
    progressBar.style.backgroundColor = 'var(--accent-color, #4a89dc)';
    progressBar.style.zIndex = '1000';
    progressBar.style.transition = 'width 0.2s ease-out';
    document.body.appendChild(progressBar);
    return progressBar;
}
// Animate skill bars when they come into view
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentValue = entry.target.getAttribute('data-percent');
                entry.target.querySelector('.skill-progress').style.width = percentValue + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

document.addEventListener('DOMContentLoaded', () => {
    initSkillBars();
    setupProjectFilters();
});

// Project filtering functionality
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 10);
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 10);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

}

// Add parallax scrolling effect to hero section
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

document.addEventListener('DOMContentLoaded', initParallax);
// Animated counters for statistics
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = Math.ceil(target / (duration / 16)); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current > target) current = target;
                    entry.target.textContent = current;
                    
                    if (current < target) {
                        requestAnimationFrame(updateCounter);
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', initCounters);

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.querySelector('.char-count');
    const maxChars = 500;
    const formSpreeUrl = contactForm.action; // Get URL from form action

    // Character count for message
    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCount.textContent = currentLength;
        charCount.classList.toggle('text-red-500', currentLength > maxChars);
    });

    // Form validation and submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        let isValid = true;

        // Reset previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            group.querySelector('.error-message').textContent = '';
        });

        // Validate fields
        const fields = [
            { id: 'name', validate: val => val.trim() !== '', error: 'Name is required' },
            { id: 'email', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), error: 'Please enter a valid email address' },
            { id: 'subject', validate: val => val.trim() !== '', error: 'Subject is required' },
            { id: 'message', validate: val => val.trim() !== '' && val.length <= maxChars, error: `Message must be less than ${maxChars} characters` }
        ];

        fields.forEach(({ id, validate, error }) => {
            const field = document.getElementById(id);
            if (!validate(field.value)) {
                showError(field, error);
                isValid = false;
            }
        });

        if (!isValid) return;

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        submitButton.disabled = true;

        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch(formSpreeUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Reset form and show success
                contactForm.reset();
                charCount.textContent = '0';
                showSuccess();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showError(document.getElementById('message'), 'Failed to send message. Please try again.');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        input.classList.add('border-red-500');
    }

    function showSuccess() {
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }
});