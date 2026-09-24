// animations.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        const heroTimeline = gsap.timeline();
        heroTimeline.from('.hero-title', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' })
                    .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
                    .from('.hero-buttons', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
                    .from('.hero-image', { scale: 0.9, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.5');

        // Footer Animation
        ScrollTrigger.batch(".footer-col", {
            onEnter: batch => gsap.fromTo(batch, {opacity: 0, y: 30}, {opacity: 1, y: 0, stagger: 0.15, duration: 0.6}),
            start: "top 95%"
        });
        
        ScrollTrigger.batch(".social-icon", {
            onEnter: batch => gsap.fromTo(batch, {opacity: 0, scale: 0.5}, {opacity: 1, scale: 1, stagger: 0.1, duration: 0.4, delay: 0.4}),
            start: "top 95%"
        });
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('.stat-counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
