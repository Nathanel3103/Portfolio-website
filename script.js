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
            if (!toggleBtn || !mobileNav) {
                console.error('Mobile navigation elements not found');
                return;
            }
            
            const lines = [
                document.getElementById('line1'),
                document.getElementById('line2'), 
                document.getElementById('line3')
            ].filter(line => line !== null); // Filter out any null elements
            
            let menuOpen = false;

            function toggleMenu() {
                menuOpen = !menuOpen;
                const state = menuOpen ? 'open' : 'closed';
                
                if (lines.length >= 3) {
                    lines[0].style.transform = state === 'open' 
                        ? 'rotate(45deg) translate(5px, 5px)' 
                        : '';
                    lines[1].style.opacity = state === 'open' ? '0' : '1';
                    lines[2].style.transform = state === 'open' 
                        ? 'rotate(-45deg) translate(5px, -5px)' 
                        : '';
                }
                
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

            function handleResponsive() {
                if (window.innerWidth >= 768 && menuOpen) {
                    toggleMenu();
                }
            }

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(handleResponsive, 250);
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menuOpen) {
                    toggleMenu();
                }
            });
        }
        document.addEventListener('DOMContentLoaded', function() {
            handleMobileNavigation();
            console.log('Mobile navigation initialized');
        });

// Typed.js Initialization
function initializeTyped() {
    if (document.getElementById('typed')) {
        new Typed('#typed', {
            strings: ['Software Engineering Student', 'Aspiring Intern', 'Problem Solver'],
            typeSpeed: 70,
            backSpeed: 55,
            loop: true
        });
    }
}

// Helper for GSAP animations
function animateWithGSAP(selector, gsapOptions, scrollOptions) {
    const elements = gsap.utils.toArray(selector);
    if (elements.length === 0) return;
    
    elements.forEach((el, index) => {
        let options = { ...gsapOptions };
        if (scrollOptions) {
            options.scrollTrigger = {
                trigger: el,
                ...scrollOptions
            };
        }
        // Allow stagger via delay
        if (typeof options.delay === 'function') {
            options.delay = options.delay(index);
        }
        gsap.from(el, options);
    });
}

// Generic notification/message function
function showMessage({ message, type = 'notification', duration = 3000, target = null }) {
    if (type === 'notification') {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.innerText = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, duration);
    } else if (type === 'error' && target) {
        const formGroup = target.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.remove('hidden');
            }
            target.classList.add('border-red-500');
        }
    }
}

// Scroll to Top Button functionality
function initScrollToTop() {
    const scrollButton = document.getElementById("scroll-to-top");
    if (!scrollButton) return;
    
    function toggleScrollButton() {
        scrollButton.classList.toggle('opacity-0', window.scrollY <= 200);
        scrollButton.classList.toggle('pointer-events-none', window.scrollY <= 200);
    }
    
    window.addEventListener("scroll", toggleScrollButton);
    scrollButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    
    // Initial check
    toggleScrollButton();
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileNav = document.getElementById("mobileNav");
                if (mobileNav && mobileNav.style.right === "0px") {
                    mobileNav.style.right = "-100%";
                    document.body.style.overflow = '';
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}

// Current Year in Footer
function updateFooterYear() {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Contact Form Logic
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const messageTextarea = document.getElementById('message');
    const charCount = document.querySelector('.char-count');
    const maxChars = 500;
    const formSpreeUrl = contactForm.action;
    
    // Character count for message
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;
            charCount.classList.toggle('text-red-500', currentLength > maxChars);
        });
    }
    
    // Form validation and submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.add('hidden');
            }
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
            if (field && !validate(field.value)) {
                showMessage({ message: error, type: 'error', target: field });
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<div class="spinner"></div>';
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
                if (charCount) charCount.textContent = '0';
                
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    // Animate success message
                    gsap.fromTo(successMessage, 
                        {opacity: 0, y: 20}, 
                        {opacity: 1, y: 0, duration: 0.5}
                    );
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 5000);
                }
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showMessage({ 
                message: 'Failed to send message. Please try again.', 
                type: 'error', 
                target: document.getElementById('message') 
            });
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Simple animation for progress bars when they come into view
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    if (progressBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    handleDarkMode();
    handleMobileNavigation();
    initializeTyped();
    initScrollToTop();
    initSmoothScrolling();
    updateFooterYear();
    initContactForm();
    initProgressBars();

    // Animation Setup
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800,
            offset: 100
        });
    }
    
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Profile image animation
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            gsap.from(profileImg, {
                duration: 1.2,
                scale: 0.8,
                opacity: 0,
                ease: "back.out(1.2)"
            });
        }
        
        // Section animations
        animateWithGSAP('section h2', { opacity: 0, y: 30, duration: 1 }, { start: "top center" });
        animateWithGSAP('.project-card', { opacity: 0, y: 50, duration: 1, delay: i => i * 0.15 }, { start: "top center+=100" });
        animateWithGSAP('.bg-gray-100', { opacity: 0, y: 40, duration: 0.8, stagger: 0.2 }, { start: "top 80%", toggleActions: "play none none none" });
    }
});