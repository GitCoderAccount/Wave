// Video Background JavaScript
// Handles video playback, fallbacks, and mobile interactions
// Also handles audio synchronization for the hero video

document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    const videoElement = document.getElementById('hero-video'); videoElement.preload = 'metadata'; videoElement.loop = true;
    let heroAudio = null;

    if (!heroVideo || !videoElement) return;

// Add audio element for the extracted audio
    heroAudio = new Audio('public/hero_audio.aac'); heroAudio.muted = false;
    heroAudio.loop = true;

    // Add click sound effect for buttons
    const clickSound = document.getElementById('click-sound');
    if (clickSound) {
        clickSound.volume = 0.3;
    }

    // Check if video can be played
    videoElement.addEventListener('canplay', function() {
        console.log('Video is ready to play');
        heroVideo.classList.remove('fallback');
        // Start audio when video can play (but wait for user interaction if needed)
        // We'll start both on user interaction to avoid autoplay blocks
    });

    // Handle video errors
    videoElement.addEventListener('error', function() {
        console.warn('Video failed to load, using fallback image');
        heroVideo.classList.add('fallback');
        // Pause audio if video fails
        if (heroAudio) {
            heroAudio.pause();
        }
    });

    // Check for video support
    if (!videoElement.canPlayType) {
        console.log('Video not supported, using fallback');
        heroVideo.classList.add('fallback');
        if (heroAudio) {
            heroAudio.pause();
        }
    }

    // Function to play video and audio
    function playVideoAndAudio() {
        if (videoElement.canPlayType && videoElement.canPlayType('video/mp4').replace(/no/, '')) {
            videoElement.play().catch(error => {
                console.log('Auto-play was prevented:', error.message);
            });
            if (heroAudio) {
                heroAudio.play().catch(error => {
                    console.log('Audio play error:', error.message);
                });
            }
        }
    }

    // Auto-play video on page load (with user interaction fallback)
    window.addEventListener('load', function() {
        // Try to play, but be prepared for autoplay blocking
        playVideoAndAudio();
    });

    // Try to play on first user interaction as fallback for autoplay blocking
    document.addEventListener('click', function() {
        playVideoAndAudio();
    }, { once: true });
    document.addEventListener('touchstart', function() {
        playVideoAndAudio();
    }, { once: true });

    // Pause video and audio when not visible
    let isVisible = true;
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isVisible && !videoElement.paused) {
                    videoElement.play().catch(error => {
                        console.log('Video play error:', error.message);
                    });
                    if (heroAudio) {
                        heroAudio.play().catch(error => {
                            console.log('Audio play error:', error.message);
                        });
                    }
                }
                isVisible = true;
            } else {
                if (!videoElement.paused) {
                    videoElement.pause();
                }
                if (heroAudio && !heroAudio.paused) {
                    heroAudio.pause();
                }
                isVisible = false;
            }
        });
    }, { threshold: 0.1 });

    observer.observe(heroVideo);

    // Sync audio with video
    videoElement.addEventListener('play', function() {
        if (heroAudio) {
            heroAudio.currentTime = videoElement.currentTime;
            heroAudio.play().catch(error => {
                console.log('Audio play error:', error.message);
            });
        }
    });

    videoElement.addEventListener('pause', function() {
        if (heroAudio) {
            heroAudio.pause();
        }
    });

    videoElement.addEventListener('seeked', function() {
        if (heroAudio) {
            heroAudio.currentTime = videoElement.currentTime;
        }
    });

    videoElement.addEventListener('ended', function() {
        // Video ended, restart audio to loop
        if (heroAudio) {
            heroAudio.currentTime = 0;
            heroAudio.play().catch(error => {
                console.log('Audio play error:', error.message);
            });
        }
    });

    // Add mobile-friendly video controls
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        heroVideo.addEventListener('click', function() {
            if (videoElement.paused) {
                videoElement.play().catch(error => {
                    console.log('Mobile video play error:', error.message);
                });
                if (heroAudio) {
                    heroAudio.play().catch(error => {
                        console.log('Mobile audio play error:', error.message);
                    });
                }
            } else {
                videoElement.pause();
                if (heroAudio) {
                    heroAudio.pause();
                }
            }
        });
    }

    // Add click sound for hero section buttons
    const heroButtons = document.querySelectorAll('.hero-actions .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Play click sound with slight delay for better UX
            setTimeout(() => {
                if (clickSound.readyState === 4) { // Have we data yet?
                    clickSound.currentTime = 0;
                    clickSound.play().catch(error => {
                        console.log('Audio play error:', error.message);
                    });
                }
            }, 50);
        });
    });

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

