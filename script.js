        // Hamburger Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
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