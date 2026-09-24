// navbar.js

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass', 'shadow-sm');
            navbar.classList.remove('bg-transparent', 'py-6');
            navbar.classList.add('py-4');
        } else {
            navbar.classList.remove('glass', 'shadow-sm', 'py-4');
            navbar.classList.add('bg-transparent', 'py-6');
        }
    });

    // Mobile menu toggle
    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if(!mobileMenu.classList.contains('hidden')) {
                document.body.classList.add('overflow-hidden');
                document.documentElement.classList.add('overflow-hidden');
                gsap.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
            } else {
                document.body.classList.remove('overflow-hidden');
                document.documentElement.classList.remove('overflow-hidden');
            }
        });
    }

    // Active page indicator
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '') currentPath = 'index.html';
    
    // Desktop menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active', 'text-blue-600');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active', 'text-blue-600');
        }
    });

    // Mobile menu
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu .space-y-1 > a');
    mobileMenuLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'bg-blue-50');
        link.classList.add('text-slate-700');
        if (link.getAttribute('href') === currentPath) {
            link.classList.remove('text-slate-700');
            link.classList.add('text-blue-600', 'bg-blue-50');
        }
    });
});
