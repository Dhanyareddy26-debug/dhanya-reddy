document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const YOUTUBE_VIDEO_ID = ''; // 🎵 PASTE YOUTUBE VIDEO ID HERE for "Ishq Hai" to stream from YouTube (e.g., 'd9Jk0_Y3G4k')
    // If kept empty, the code will try to play 'bgmusic.mp3' from the folder.

    let youtubePlayer;

    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const animationContainer = document.getElementById('animationContainer');
    const yearsCounter = document.getElementById('yearsCounter');

    // 0. Splash Screen Logic
    setTimeout(() => {
        const splash = document.getElementById('splashScreen');
        if (splash) {
            splash.classList.add('hidden');
        }
    }, 1500); // Show for 1.5 seconds (1s static + user perception)

    // 1. Dynamic Year Calculation
    const startDate = new Date('2002-02-17');
    const calculateYears = () => {
        const today = new Date();
        let years = today.getFullYear() - startDate.getFullYear();
        const m = today.getMonth() - startDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
            years--;
        }
        return years;
    };
    yearsCounter.innerText = `${calculateYears()}+`;

    // 2. Floating Animations Generator - Hearts Only
    const elements = ['💖', '💕', '💗', '❤️', '💓', '💘'];
    function createFloatingElement() {
        const el = document.createElement('div');
        el.className = 'floating-element';
        el.innerText = elements[Math.floor(Math.random() * elements.length)];

        const left = Math.random() * 100;
        const duration = 5 + Math.random() * 10;
        const size = 15 + Math.random() * 30;

        el.style.left = `${left}%`;
        el.style.setProperty('--duration', `${duration}s`);
        el.style.setProperty('--size', `${size}px`);

        animationContainer.appendChild(el);

        // Remove after animation finishes
        setTimeout(() => {
            el.remove();
        }, duration * 1000);
    }

    // Continuously create floating elements
    setInterval(createFloatingElement, 500);

    // 3. NO Button Runaway Logic
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
        noBtn.style.zIndex = '999';
    });

    // Ensure NO button is never clickable (fallback for mobile/fast clicks)
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        return false;
    });

    // 4. YES Button Action - Page Transition
    yesBtn.addEventListener('click', () => {
        // Play Music (YouTube or Local)
        playBackgroundMusic();

        // Simple fade transition
        page1.classList.remove('active');

        setTimeout(() => {
            page1.style.display = 'none';
            page2.classList.add('active');
            window.scrollTo(0, 0); // Ensure we start at the top

            // Trigger extra celebration heart & sparkle burst
            burstCelebration();
        }, 1000);
    });

    function burstCelebration() {
        // Heart burst
        for (let i = 0; i < 60; i++) {
            setTimeout(createFloatingElement, i * 40);
        }
    }

    // 5. Memory Card Interaction (Mobile Support)
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // 6. Surprise Button & Popup Logic
    const surpriseBtn = document.getElementById('surpriseBtn');
    const popupModal = document.getElementById('popupModal');
    const closeBtn = document.querySelector('.close-btn');

    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            // Show popup
            popupModal.style.display = 'flex';

            // Trigger confetti
            fireConfetti();

            // Trigger intense heart floating
            for (let i = 0; i < 30; i++) {
                setTimeout(createFloatingElement, i * 100);
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popupModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == popupModal) {
            popupModal.style.display = 'none';
        }
    });

    // 7. Confetti Effect
    function fireConfetti() {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 1500
        };

        function fire(particleRatio, opts) {
            // Canvas based confetti implementation or simple CSS dom elements?
            // Since we don't have a library, let's create simple DOM confetti
            createConfettiParticles(count);
        }
        fire(0.25, { spread: 26, startVelocity: 55 });
    }

    function createConfettiParticles(amount) {
        const colors = ['#fce4ec', '#f06292', '#d81b60', '#d4af37', '#fff'];

        for (let i = 0; i < amount; i++) {
            const confetti = document.createElement('div');
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.position = 'fixed';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10vh';
            confetti.style.zIndex = '1500';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            // Random animation properties
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;

            document.body.appendChild(confetti);

            // Animate using Web Animations API for better performance than adding dynamic Keyframes
            const animation = confetti.animate([
                { transform: `translate3d(0,0,0) rotateX(0) rotateY(0)`, opacity: 1 },
                { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

});

// Global YouTube API Ready Function
window.onYouTubeIframeAPIReady = function () {
    // 🎵 CONFIGURATION: PASTE YOUR YOUTUBE VIDEO ID BELOW 🎵
    const VIDEO_ID = ''; // e.g. 'd9Jk0_Y3G4k' for "Ishq Hai"

    if (VIDEO_ID) {
        window.ytPlayer = new YT.Player('youtube-player', {
            height: '0',
            width: '0',
            videoId: VIDEO_ID,
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'loop': 1,
                'playlist': VIDEO_ID
            },
            events: {
                'onReady': (event) => {
                    event.target.setVolume(50);
                }
            }
        });
    }
};

// Start Music Helper Function (Global)
function playBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');

    // 1. Try YouTube Player (if ID is set and player is ready)
    if (window.ytPlayer && typeof window.ytPlayer.playVideo === 'function') {
        window.ytPlayer.playVideo();
        console.log("Playing YouTube Music");
    }
    // 2. Fallback to Local Audio File
    else if (bgMusic) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        console.log("Playing Local Music");
    }
}
