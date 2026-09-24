// main.js - Global initialization

document.addEventListener('DOMContentLoaded', () => {
    // Add page transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    
    // Add logo
    const logo = document.createElement('img');
    logo.src = 'assets/images/logo.webp';
    logo.alt = 'Loading...';
    logo.className = 'loader-logo';
    
    // Add futuristic bar container
    const barContainer = document.createElement('div');
    barContainer.className = 'loader-bar-container';
    
    // Add bar
    const bar = document.createElement('div');
    bar.className = 'loader-bar';
    barContainer.appendChild(bar);
    
    overlay.appendChild(logo);
    overlay.appendChild(barContainer);
    document.body.appendChild(overlay);

    // Remove overlay after exactly 2 seconds
    setTimeout(() => {
        document.body.classList.add('page-loaded');
        // Remove from DOM after fade out
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 500);
    }, 2000);

    // Handle internal page transitions
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
                e.preventDefault();
                document.body.classList.remove('page-loaded');
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slides');
    const dots = document.querySelectorAll('.slider-dots button');
    if (testimonialSlider && dots.length > 0) {
        let currentSlide = 0;
        const totalSlides = dots.length;

        function goToSlide(index) {
            testimonialSlider.style.transform = `translateX(-${index * 25}%)`;
            dots.forEach(dot => {
                dot.classList.remove('bg-blue-600');
                dot.classList.add('bg-blue-200');
            });
            dots[index].classList.remove('bg-blue-200');
            dots[index].classList.add('bg-blue-600');
            currentSlide = index;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
        });

        let slideInterval = setInterval(() => {
            let nextSlide = (currentSlide + 1) % totalSlides;
            goToSlide(nextSlide);
        }, 4000);

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                let nextSlide = (currentSlide + 1) % totalSlides;
                goToSlide(nextSlide);
            }, 4000);
        }
    }

    // Big Data Products Tabs
    const bigDataTabs = document.querySelectorAll('.big-data-tab');
    const bigDataPanels = document.querySelectorAll('.big-data-panel');

    if (bigDataTabs.length > 0 && bigDataPanels.length > 0) {
        bigDataTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 1. Remove active state from all tabs
                bigDataTabs.forEach(t => {
                    t.classList.remove('bg-blue-600', 'text-white', 'shadow-lg');
                    t.classList.add('bg-slate-50', 'text-slate-700');
                });
                
                // 2. Add active state to clicked tab
                tab.classList.remove('bg-slate-50', 'text-slate-700');
                tab.classList.add('bg-blue-600', 'text-white', 'shadow-lg');

                // 3. Hide all panels and show target
                const targetId = tab.getAttribute('data-target');
                bigDataPanels.forEach(panel => {
                    if (panel.id === targetId) {
                        panel.classList.remove('hidden');
                        // Small fade-in animation
                        panel.style.transition = 'opacity 0.3s ease';
                        panel.style.opacity = '0';
                        setTimeout(() => panel.style.opacity = '1', 50);
                    } else {
                        panel.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Blog Auto Slider
    const blogSlider = document.getElementById('blog-slider');
    if (blogSlider) {
        const slideBlog = () => {
            if (!blogSlider.children.length) return;
            const cardWidth = blogSlider.children[0].offsetWidth;
            const gap = 32; // gap-8 (2rem = 32px)
            const maxScrollLeft = blogSlider.scrollWidth - blogSlider.clientWidth;
            
            if (blogSlider.scrollLeft >= maxScrollLeft - 10) {
                blogSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                blogSlider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
            }
        };
        
        let blogInterval = setInterval(slideBlog, 3500);
        
        blogSlider.addEventListener('mouseenter', () => clearInterval(blogInterval));
        blogSlider.addEventListener('mouseleave', () => {
            blogInterval = setInterval(slideBlog, 3500);
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const btn = item.querySelector('.faq-btn');
            const content = item.querySelector('.faq-content');
            const icon = item.querySelector('.faq-icon');
            
            btn.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');
                
                // Close all
                faqItems.forEach(otherItem => {
                    otherItem.querySelector('.faq-content').classList.add('hidden');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    otherIcon.classList.remove('bg-blue-600', 'text-white');
                    otherIcon.classList.add('bg-white', 'text-blue-600');
                    otherIcon.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
                });
                
                // Toggle current
                if (!isOpen) {
                    content.classList.remove('hidden');
                    icon.classList.remove('bg-white', 'text-blue-600');
                    icon.classList.add('bg-blue-600', 'text-white');
                    icon.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
                }
            });
        });
        
        // Open the first one by default
        faqItems[0].querySelector('.faq-btn').click();
    }
});
