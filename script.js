document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const animationContainer = document.getElementById('animationContainer');
    const yearsCounter = document.getElementById('yearsCounter');

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
});
