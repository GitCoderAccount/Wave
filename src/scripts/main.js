// Main JavaScript for Wave on Pulse Radio

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Play/Pause button functionality
    const playBtn = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time');

    let isPlaying = false;
    let audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Example audio

    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            audio.play();
            this.textContent = '❚❚'; // Pause symbol
            animateProgressBar();
        } else {
            audio.pause();
            this.textContent = '▶'; // Play symbol
        }
    });

    // Progress bar animation
    function animateProgressBar() {
        if (!isPlaying) return;
        
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        const progressWidth = (currentTime / duration) * 100;
        
        progress.style.width = progressWidth + '%';
        
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (currentTime < duration) {
            requestAnimationFrame(animateProgressBar);
        }
    }

    // Audio event listeners
    audio.addEventListener('ended', function() {
        isPlaying = false;
        playBtn.textContent = '▶';
        progress.style.width = '0%';
        timeDisplay.textContent = '0:00';
    });

    // Auto-hide navigation on scroll
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        }
        
        lastScroll = currentScroll;
    });

    // Form submission (if any forms are added later)
    function handleFormSubmit(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        // Send data to server (placeholder)
        console.log('Form data:', data);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thank you for your submission!';
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #fff;
            padding: 2rem;
            border-radius: 10px;
            z-index: 10000;
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }

    // Add form submit event listeners (if forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .podcast-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .podcast-card, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Theme toggle (if needed in future)
    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        document.documentElement.classList.toggle('light');
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Space to play/pause
        if (e.code === 'Space' && !e.target.closest('input, textarea, select')) {
            e.preventDefault();
            playBtn.click();
        }
        
        // M to mute/unmute (placeholder)
        if (e.code === 'KeyM') {
            // Add mute functionality here
            console.log('Mute toggled');
        }
    });

    console.log('Wave on Pulse Radio - JavaScript loaded successfully');
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-success {
        background: linear-gradient(45deg, #28a745, #20c997) !important;
    }
    
    .notification-error {
        background: linear-gradient(45deg, #dc3545, #ffc107) !important;
    }
    
    .notification-warning {
        background: linear-gradient(45deg, #ffc107, #fd7e14) !important;
    }
`;

// Add notification styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Export for potential future use
window.WaveOnPulse = {
    play: () => {
        playBtn.click();
    },
    pause: () => {
        if (isPlaying) playBtn.click();
    },
    showNotification: showNotification
};