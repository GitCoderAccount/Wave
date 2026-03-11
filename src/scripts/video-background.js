// Video Background JavaScript
// Handles video playback, fallbacks, and mobile interactions

document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    const videoElement = document.getElementById('hero-video');

    if (!heroVideo || !videoElement) return;

    // Check if video can be played
    videoElement.addEventListener('canplay', function() {
        console.log('Video is ready to play');
        heroVideo.classList.remove('fallback');
    });

    // Handle video errors
    videoElement.addEventListener('error', function() {
        console.warn('Video failed to load, using fallback image');
        heroVideo.classList.add('fallback');
    });

    // Check for video support
    if (!videoElement.canPlayType) {
        console.log('Video not supported, using fallback');
        heroVideo.classList.add('fallback');
    }

    // Auto-play video on page load
    window.addEventListener('load', function() {
        if (videoElement.canPlayType && videoElement.canPlayType('video/mp4').replace(/no/, '')) {
            videoElement.play().catch(error => {
                console.log('Auto-play was prevented:', error.message);
            });
        }
    });

    // Pause video when not visible
    let isVisible = true;
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isVisible && videoElement.paused) {
                    videoElement.play().catch(error => {
                        console.log('Video play error:', error.message);
                    });
                }
                isVisible = true;
            } else {
                if (!videoElement.paused) {
                    videoElement.pause();
                }
                isVisible = false;
            }
        });
    }, { threshold: 0.1 });

    observer.observe(heroVideo);

    // Add mobile-friendly video controls
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        heroVideo.addEventListener('click', function() {
            if (videoElement.paused) {
                videoElement.play().catch(error => {
                    console.log('Mobile video play error:', error.message);
                });
            } else {
                videoElement.pause();
            }
        });
    }

    // Add CSS animations for video background
    const videoAnimations = document.createElement('style');
    videoAnimations.textContent = `
        @keyframes heroVideoFade {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .hero-video {
            animation: heroVideoFade 1s ease-in-out;
        }
        
        .hero-video.fallback {
            animation: none;
        }
        
        /* Enhanced video controls for mobile devices */
        @media (hover: none) and (pointer: coarse) {
            .hero-video {
                cursor: pointer;
            }
            
            .hero-video::after {
                content: '▼';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 3rem;
                color: rgba(255, 255, 255, 0.8);
                z-index: 2;
                animation: mobilePlayPrompt 2s ease-in-out infinite;
            }
        }
        
        @keyframes mobilePlayPrompt {
            0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
        }
    `;
    document.head.appendChild(videoAnimations);

    console.log('Video background script loaded successfully');
});