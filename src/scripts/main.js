// Main JavaScript for Wave on Pulse Radio with Cyber Theme

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
            createScanEffect();
        } else {
            audio.pause();
            this.textContent = '▶'; // Play symbol
            stopScanEffect();
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
        stopScanEffect();
    });

    // Scan line effect for live section
    let scanInterval;
    function createScanEffect() {
        const liveSection = document.querySelector('.live-section');
        if (!liveSection) return;
        
        scanInterval = setInterval(() => {
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(0, 153, 255, 0.8), transparent);
                animation: scanMove 2s linear infinite;
                pointer-events: none;
                z-index: 1;
            `;
            liveSection.appendChild(scanLine);
            
            setTimeout(() => scanLine.remove(), 2000);
        }, 1000);
    }

    function stopScanEffect() {
        if (scanInterval) {
            clearInterval(scanInterval);
            scanInterval = null;
        }
    }

    // Auto-hide navigation on scroll
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 153, 255, 0.2)';
            header.style.boxShadow = '0 10px 30px rgba(0, 153, 255, 0.3)';
        } else {
            header.style.background = 'rgba(0, 153, 255, 0.1)';
            header.style.boxShadow = '0 10px 30px rgba(0, 153, 255, 0.2)';
        }
        
        lastScroll = currentScroll;
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .podcast-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 153, 255, 0.4), 0 0 30px rgba(0, 153, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 153, 255, 0.3), 0 0 20px rgba(0, 153, 255, 0.2)';
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
                
                // Add glitch effect on entry
                if (entry.target.classList.contains('feature-card') || entry.target.classList.contains('podcast-card')) {
                    entry.target.style.animation = 'glitchEffect 0.3s ease-in-out';
                    setTimeout(() => {
                        entry.target.style.animation = '';
                    }, 300);
                }
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

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Space to play/pause
        if (e.code === 'Space' && !e.target.closest('input, textarea, select')) {
            e.preventDefault();
            playBtn.click();
        }
        
        // M to mute/unmute (placeholder)
        if (e.code === 'KeyM') {
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
        border: 1px solid rgba(0, 153, 255, 0.5);
        box-shadow: 0 5px 20px rgba(0, 153, 255, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notifications and animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
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
    
    @keyframes scanMove {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    @keyframes glitchEffect {
        0%, 100% { transform: translate(0); }
        25% { transform: translate(-2px, 2px); }
        50% { transform: translate(-2px, -2px); }
        75% { transform: translate(2px, 2px); }
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
    
    /* Add pulse effect to play button */
    .play-btn {
        animation: pulseGlow 2s ease-in-out infinite;
    }
    
    @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 10px 25px rgba(0, 153, 255, 0.3); }
        50% { box-shadow: 0 15px 35px rgba(0, 153, 255, 0.5); }
    }
`;

document.head.appendChild(styleSheet);

// Export for potential future use
window.WaveOnPulse = {
    play: () => {
        document.querySelector('.play-btn').click();
    },
    pause: () => {
        const playBtn = document.querySelector('.play-btn');
        if (playBtn.textContent === '❚❚') playBtn.click();
    },
    showNotification: showNotification
};