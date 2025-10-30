// hamburger menu and overlay functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    // Function to open menu
    function openMenu() {
        hamburger.classList.add('active');
        nav.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
    }

    // Function to close menu
    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Toggle menu on hamburger click
    if(hamburger) {
        hamburger.addEventListener('click', function() {
            if(hamburger.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu when overlay is clicked
    if(overlay) {
        overlay.addEventListener('click', function() {
            closeMenu();
        });
    }

    // Close menu when a navigation link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close menu when pressing escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            closeMenu();
        }
    });

    // Basic function to scroll to sections
    function scrollToSection(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Carousel controls
        (function initCarousel() {
            const carousel = document.getElementById('mainCarousel');
            if (!carousel) return;
            const track = carousel.querySelector('.carousel-track');
            const slides = Array.from(track.children);
            const prevBtn = carousel.querySelector('.prev');
            const nextBtn = carousel.querySelector('.next');
            let index = 0;

            function update() {
                track.style.transform = `translateX(-${index * 100}%)`;
            }

            prevBtn.addEventListener('click', () => {
                index = (index - 1 + slides.length) % slides.length;
                update();
            });

            nextBtn.addEventListener('click', () => {
                index = (index + 1) % slides.length;
                update();
            });
        })();

        // Tickets accordion toggles (slide + scroll)
        (function initTicketsAccordion(){
            const toggles = document.querySelectorAll('.tickets-toggle');
            const panels = document.querySelectorAll('.tickets-panel');
            if (!toggles.length) return;

            function closeAll(){
                panels.forEach(p => p.classList.remove('open'));
                toggles.forEach(b => {
                    b.classList.remove('open');
                    const icon = b.querySelector('.tickets-toggle-icon');
                    if (icon) icon.textContent = '+';
                });
            }

            toggles.forEach(btn => {
                const targetSel = btn.getAttribute('data-target');
                const target = document.querySelector(targetSel);
                if (!target) return;

                btn.addEventListener('click', () => {
                    const isOpen = target.classList.contains('open');
                    closeAll();
                    if (!isOpen) {
                        target.classList.add('open');
                        btn.classList.add('open');
                        const icon = btn.querySelector('.tickets-toggle-icon');
                        if (icon) icon.textContent = '-';
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        })();