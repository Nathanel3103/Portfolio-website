// Dark Mode Handling
function handleDarkMode() {
    const darkModeToggles = document.querySelectorAll('#darkModeToggle, #darkModeToggleMobile');
    
    // Apply saved preference on load
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference) {
        const isDark = savedPreference === 'true';
        document.documentElement.classList.toggle('dark', isDark);
    }

    // Toggle dark mode for both buttons
    darkModeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', isDark);
        });
    });
}

function handleMobileNavigation() {
    const toggleBtn = document.getElementById('toggleBtn');
    const mobileNav = document.getElementById('mobileNav');
    const lines = [document.getElementById('line1'), document.getElementById('line2'), document.getElementById('line3')];
    let menuOpen = false;

    
    lines.forEach(line => {
        line.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    });
    mobileNav.style.transition = 'right 0.3s ease-in-out';

    function toggleMenu() {
        menuOpen = !menuOpen;
        const state = menuOpen ? 'open' : 'closed';
        
        // Animate hamburger lines
        lines[0].style.transform = state === 'open' 
            ? 'rotate(45deg) translate(4px, 4px)' 
            : '';
        lines[1].style.opacity = state === 'open' ? '0' : '1';
        lines[2].style.transform = state === 'open' 
            ? 'rotate(-45deg) translate(4px, -4px)' 
            : '';
        
        // Toggle menu position
        mobileNav.style.right = state === 'open' ? '0' : '-100%';
        
        // Accessibility updates
        toggleBtn.setAttribute('aria-expanded', menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && !mobileNav.contains(e.target) && !toggleBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Handle responsive behavior
    function handleResponsive() {
        if (window.innerWidth >= 768 && menuOpen) {
            toggleMenu();
        }
    }

    // Optimized resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResponsive, 250);
    });

    // Escape key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            toggleMenu();
        }
    });
}
// Typed.js Initialization
function initializeTyped() {
    new Typed('#typed', {
        strings: ['Software Engineering Student', 'Aspiring Intern', 'AI Enthusiast'],
        typeSpeed: 70,
        backSpeed: 55,
        loop: true
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    handleDarkMode();
    handleMobileNavigation();
    initializeTyped();
});

// // Track menu state
let menuOpen = false;

// Scroll to Top Button
const scrollButton = document.getElementById("scroll-to-top");

function toggleScrollButton() {
    if (!scrollButton) return;
    
    scrollButton.classList.toggle('opacity-0', window.scrollY <= 200);
    scrollButton.classList.toggle('pointer-events-none', window.scrollY <= 200);
}

window.addEventListener("scroll", toggleScrollButton);

document.getElementById("scroll-to-top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll("#mobileNav a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        const mobileNav = document.getElementById("mobileNav");

        if (targetElement) {
            // Close mobile menu
            if (mobileNav.style.right === "0px" || mobileNav.style.right === "") {
                mobileNav.style.right = "-100%";
                menuOpen = false;
            }

            // Smooth scroll after menu closes
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 300); // Match menu transition duration
        }
    });
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
    const formSpreeUrl = contactForm.action; 

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