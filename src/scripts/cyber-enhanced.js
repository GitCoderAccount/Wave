// Enhanced Cyber Theme JavaScript for Wave on Pulse Radio
// Features advanced animations, glitch effects, and interactive elements

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', function() {
    // Enhanced smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Wait for audio element to be available
    let clickSound = null;
    const audioCheck = setInterval(() => {
        clickSound = document.getElementById('click-sound');
        if (clickSound) {
            clickSound.volume = 0.3;
            clearInterval(audioCheck);
        }
    }, 100);

    // Play click sound on button clicks
    const buttons = document.querySelectorAll('.btn, .play-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Play click sound with slight delay for better UX
            setTimeout(() => {
                if (clickSound && clickSound.readyState === 4) { // Have we data yet?
                    clickSound.currentTime = 0;
                    clickSound.play().catch(error => {
                        console.log('Audio play error:', error.message);
                    });
                }
            }, 50);
        });
    });

    // Enhanced hover effects for navigation
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.addEventListener('mouseover', function(e) {
            if (e.target.classList.contains('nav-link')) {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });

        nav.addEventListener('mouseout', function(e) {
            if (e.target.classList.contains('nav-link')) {
                e.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }

    // Enhanced button hover effects
    const enhancedButtons = document.querySelectorAll('.btn');
    enhancedButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 15px 35px rgba(0, 153, 255, 0.5)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 153, 255, 0.3)';
        });
    });

    // Add typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect with delay
        setTimeout(typeWriter, 500);
    }

    // Add glitch effect to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setInterval(() => {
            if (Math.random() > 0.8) { // 20% chance
                heroContent.style.filter = 'contrast(1.5) brightness(1.2)';
                heroContent.style.transform = 'translateX(-2px)';
                
                setTimeout(() => {
                    heroContent.style.filter = 'none';
                    heroContent.style.transform = 'translateX(0)';
                }, 100);
            }
        }, 3000);
    }

    // Enhanced scroll animations
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

    // Observe feature cards for scroll animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add floating animation to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.style.animation = 'float 6s ease-in-out infinite';
    });

    // Add ripple effect to buttons
    const buttonsWithRipple = document.querySelectorAll('.btn');
    buttonsWithRipple.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);

    // Enhanced form interactions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    });

    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.footer-section a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Enhanced loading animation
    const loadingAnimation = document.createElement('div');
    loadingAnimation.innerHTML = `
        <div class="loading-animation">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
        </div>
    `;
    document.body.appendChild(loadingAnimation);

    // Add loading animation styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-animation {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            display: none;
        }

        .loading-dot {
            width: 10px;
            height: 10px;
            background: #0099ff;
            border-radius: 50%;
            margin: 0 5px;
            animation: loading 1.4s infinite ease-in-out both;
        }

        .loading-dot:nth-child(1) {
            animation-delay: -0.32s;
        }

        .loading-dot:nth-child(2) {
            animation-delay: -0.16s;
        }

        @keyframes loading {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(loadingStyles);

    // Show loading animation on page load
    setTimeout(() => {
        loadingAnimation.style.display = 'block';
        setTimeout(() => {
            loadingAnimation.style.display = 'none';
        }, 1500);
    }, 100);

    console.log('Enhanced cyber theme JavaScript loaded successfully');
});