// Enhanced Cyber Theme JavaScript for Wave on Pulse Radio
// Features advanced animations, glitch effects, and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Add entrance animation when navigating
            if (targetSection) {
                targetSection.style.opacity = '0';
                targetSection.style.transform = 'translateY(30px)';
                targetSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    targetSection.style.opacity = '1';
                    targetSection.style.transform = 'translateY(0)';
                }, 100);
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add glitch effect on navigation
                this.style.animation = 'glitchEffect 0.3s ease-in-out';
                
                // Update active navigation state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Enhanced Play/Pause button functionality
    const playBtn = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time');

    let isPlaying = false;
    let audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Example audio

    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            // Add visual feedback for play
            playBtn.style.animation = 'playButtonActive 0.3s ease-in-out';
            audio.play();
            this.textContent = '■■'; // Pause symbol
            animateProgressBar();
            createEnhancedScanEffect();
        } else {
            audio.pause();
            this.textContent = '▶'; // Play symbol
            stopScanEffect();
        }
    });

    // Enhanced Progress bar animation
    function animateProgressBar() {
        if (!isPlaying) return;
        
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        const progressWidth = (currentTime / duration) * 100;
        
        // Add progress bar visual effects
        progress.style.width = progressWidth + '%';
        
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (currentTime < duration) {
            requestAnimationFrame(animateProgressBar);
        }
    }

    // Enhanced Scan line effect for live section
    let scanInterval;
    function createEnhancedScanEffect() {
        const liveSection = document.querySelector('.live-section');
        if (!liveSection) return;

        // Add multiple scan lines
        for (let i = 0; i < 3; i++) {
            createSingleScanLine(liveSection, i * 0.5);
        }
    }

    function createSingleScanLine(section, delay) {
        setTimeout(() => {
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100}%;
                left: -100%;
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(0, 153, 255, 0.8), transparent, rgba(0, 204, 255, 0.6), transparent);
                animation: scanMove 3s linear infinite;
                pointer-events: none;
                z-index: 1;
                filter: blur(1px);
            `;
            section.appendChild(scanLine);
            
            setTimeout(() => scanLine.remove(), 3000);
        }, delay * 1000);
    }

    function stopScanEffect() {
        if (scanInterval) {
            clearInterval(scanInterval);
            scanInterval = null;
            // Reset visual effects
            resetVisualEffects();
        }
    }

    // Enhanced cyber-themed visual effects
    function createVisualEffects() {
        // Create floating particles
        createParticles();
        // Add glitch effects on scroll
        addScrollGlitch();
    }

    function resetVisualEffects() {
        // Remove particle effects
        // Reset glitch effects
    }

    function createParticles() {
        // Create floating particles with cyber theme
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: linear-gradient(45deg, #00ffff, #6f00ff, #ff00ff);
                box-shadow: 0 0 6px rgba(0, 255, 255, 0.8);
                border-radius: 50%;
                animation: float ${3 + Math.random() * 3}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particleContainer.appendChild(particle);
        }
    }

    function addScrollGlitch() {
        // Add subtle glitch effects when scrolling
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (Math.abs(scrollTop - lastScrollTop) > 50) {
                // Trigger glitch effect
                document.body.style.animation = 'glitchEffect 0.2s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 200);
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Enhanced Auto-hide navigation on scroll
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add scroll-based visual effects
        if (currentScroll > lastScroll) {
            // Scrolling down
            document.body.style.background = 'linear-gradient(45deg, #0a0a0a 25%, rgba(0, 153, 255, 0.1) 75%)';
        } else {
            // Scrolling up
            document.body.style.background = 'linear-gradient(45deg, #0a0a0a 75%, rgba(0, 153, 255, 0.1) 25%)';
        }

        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 153, 255, 0.2)';
            header.style.boxShadow = '0 10px 30px rgba(0, 153, 255, 0.3)';
            // Add header scan effect on scroll
            header.style.animation = 'headerScan 5s linear infinite';
        } else {
            header.style.background = 'rgba(0, 153, 255, 0.1)';
            header.style.boxShadow = '0 10px 30px rgba(0, 153, 255, 0.2)';
            header.style.animation = '';
        }
        
        lastScroll = currentScroll;
    });

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.feature-card, .podcast-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add enhanced hover effect
            this.style.animation = 'cardHover 0.3s ease-in-out';
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 153, 255, 0.4), 0 0 30px rgba(0, 153, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 153, 255, 0.3), 0 0 20px rgba(0, 153, 255, 0.2)';
            // Reset hover animation
            this.style.animation = '';
        });
    });

    // Enhanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Add cyber-themed intersection observer
    const cyberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'cardEnter 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe elements for enhanced animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                // Add glitch effect on entry
                if (entry.target.classList.contains('feature-card') || entry.target.classList.contains('podcast-card') || entry.target.classList.contains('stat')) {
                    entry.target.style.animation = 'cardEnter 0.6s ease-out forwards';
                    setTimeout(() => {
                        entry.target.style.animation = '';
                    }, 600);
                }
            }
        });
    }, observerOptions);

    // Start cyber-themed visual effects
    createVisualEffects();

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .podcast-card, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
        // Also observe with cyber observer
        cyberObserver.observe(el);
    });

    // Enhanced loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        // Add cyber-themed loading animation
        document.body.style.animation = 'cyberLoad 1s ease-out forwards';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.animation = '';
        }, 100);
    });

    // Enhanced keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Space to play/pause
        if (e.code === 'Space' && !e.target.closest('input, textarea, select')) {
            e.preventDefault();
            playBtn.click();
            showNotification('Audio controls activated via keyboard', 'info');
        }
        
        // M to mute/unmute (placeholder)
        if (e.code === 'KeyM') {
            console.log('Mute toggled');
        }
    });

    console.log('Wave on Pulse - Enhanced Cyber Theme JavaScript loaded successfully');
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add cyber-themed notification animations
    notification.style.animation = 'notificationSlide 0.3s ease';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        border: 1px solid rgba(0, 153, 255, 0.5);
        box-shadow: 0 5px 20px rgba(0, 153, 255, 0.3);
        animation: notificationSlide 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export for potential future use
window.WaveOnPulse = {
    play: () => {
        document.querySelector('.play-btn').click();
    },
    pause: () => {
        const playBtn = document.querySelector('.play-btn');
        if (playBtn.textContent === '░░') playBtn.click();
    },
    showNotification: showNotification
};

// Add cyber-themed CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes notificationSlide {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes cyberLoad {
        from { 
            opacity: 0; 
            transform: scale(0.8); 
            filter: blur(10px); 
        }
        to { 
            opacity: 1; 
            transform: scale(1); 
            filter: blur(0); 
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    @keyframes cardHover {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-15px) scale(1.05); }
    }
    
    @keyframes playButtonActive {
        0%, 100% { box-shadow: 0 15px 35px rgba(0, 153, 255, 0.5); }
        50% { box-shadow: 0 20px 45px rgba(0, 204, 255, 0.7); }
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
`;

document.head.appendChild(styleSheet);