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
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Contact Form Submission
document.getElementById("contact-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
        showNotification(`✅ Thank you for your message, ${name}!`);
        this.reset();
    } else {
        showNotification("❌ Please fill out all fields.");
    }
});

// Notification Popup Function
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

// Dynamic Year in Footer
document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Make Header Non-Sticky on Scroll
const header = document.querySelector('header');
if (header) {
    header.style.position = 'relative';
}