// hamburger menu and overlay functionality
document.addEventListener('DOMContentLoaded', function () {
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
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            if (hamburger.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', function () {
            closeMenu();
        });
    }

    // Close menu when a navigation link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Close menu when pressing escape key
    document.addEventListener('keydown', function (e) {
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


// Hamburger Menu Toggle (guard for pages without navbar)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    function setMenuState(isOpen) {
        hamburger.classList.toggle('active', isOpen);
        navMenu.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        // Accessibility/escape behavior
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    }

    hamburger.addEventListener('click', () => {
        const willOpen = !navMenu.classList.contains('active');
        setMenuState(willOpen);
    });

    // Keyboard support: Enter/Space toggles; Escape closes
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const willOpen = !navMenu.classList.contains('active');
            setMenuState(willOpen);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            setMenuState(false);
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => setMenuState(false));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            setMenuState(false);
        }
    });
}


// Carousel controls with autoplay and seamless loop
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('mainCarousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const originalSlides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-button.prev');
    const nextBtn = carousel.querySelector('.carousel-button.next');

    if (!track || originalSlides.length === 0 || !prevBtn || !nextBtn) return;

    // Clone first and last slides for seamless loop
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
    
    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalSlides[0]);

    const totalSlides = originalSlides.length;
    let index = 1; // Start at 1 because we added a clone at the beginning
    let autoplayInterval;
    const autoplayDelay = 2000;
    let isTransitioning = false;

    // Set initial position without transition
    track.style.transition = 'none';
    track.style.transform = `translateX(-${index * 100}%)`;

    // Force reflow to ensure the initial position is set
    void track.offsetWidth;

    function update(enableTransition = true) {
        if (enableTransition) {
            track.style.transition = 'transform 0.6s ease-in-out';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function goToNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        index++;
        update(true);
    }

    function goToPrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        index--;
        update(true);
    }

    // Handle transition end for seamless loop
    track.addEventListener('transitionend', () => {
       
        if (index === totalSlides + 1) {
            track.style.transition = 'none';
            index = 1;
            track.style.transform = `translateX(-${index * 100}%)`;
        }
        
        
        if (index === 0) {
            track.style.transition = 'none';
            index = totalSlides;
            track.style.transform = `translateX(-${index * 100}%)`;
        }
        
        isTransitioning = false;
    });

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(goToNext, autoplayDelay);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Manual navigation
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        stopAutoplay();
        goToPrev();
        startAutoplay();
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        stopAutoplay();
        goToNext();
        startAutoplay();
    });

    // Pause autoplay on hover, resume on mouse leave
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Start autoplay
    startAutoplay();
});

// TICKETS ACCORDIONS AND CART - All in one DOMContentLoaded block
document.addEventListener('DOMContentLoaded', function () {
    // TICKETS ACCORDIONS
    const toggleButtons = document.querySelectorAll('.tickets-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetPanel = document.querySelector(targetId);
            const icon = this.querySelector('.tickets-toggle-icon');

            // Check if this panel is currently open
            const isOpen = targetPanel.classList.contains('active');

            // Close all panels and reset all icons
            document.querySelectorAll('.tickets-panel').forEach(panel => {
                panel.classList.remove('active');
            });

            document.querySelectorAll('.tickets-toggle-icon').forEach(toggleIcon => {
                toggleIcon.textContent = '+';
            });

            // If the clicked panel was not open, open it
            if (!isOpen) {
                targetPanel.classList.add('active');
                icon.textContent = '−';
            }
        });
    });

    // PAYMENT METHODS ACCORDION
    const paymentToggles = document.querySelectorAll('.payment-toggle');

    paymentToggles.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetPanel = document.querySelector(targetId);
            const icon = this.querySelector('.payment-icon');

            // Check if this panel is currently open
            const isOpen = targetPanel.classList.contains('active');

            // Close all panels and reset all icons
            document.querySelectorAll('.payment-panel').forEach(panel => {
                panel.classList.remove('active');
            });

            document.querySelectorAll('.payment-icon').forEach(toggleIcon => {
                toggleIcon.textContent = '+';
            });

            // If the clicked panel was not open, open it
            if (!isOpen) {
                targetPanel.classList.add('active');
                icon.textContent = '−';
            }
        });
    });

    // CART FUNCTIONALITY
    const cartSection = document.getElementById('cart-section');
    const cartItemName = document.getElementById('cart-item-name');
    const cartItemPrice = document.getElementById('cart-item-price');
    const cartQuantity = document.getElementById('cart-quantity');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartIncrease = document.getElementById('cart-increase');
    const cartDecrease = document.getElementById('cart-decrease');
    const cartContinue = document.getElementById('cart-continue');

    if (cartSection && cartItemName && cartItemPrice && cartQuantity && cartTotalPrice && cartIncrease && cartDecrease) {
        let currentTicketPrice = 0;

        // Handle COMPRAR button clicks
        document.querySelectorAll('.ticket-buy').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const form = this.closest('.ticket-line');
                const ticketName = form.querySelector('.ticket-name').textContent;
                const ticketPriceText = form.querySelector('.ticket-price').textContent;
                const price = parseFloat(form.getAttribute('data-price'));

                // Update cart with selected ticket
                cartItemName.textContent = ticketName;
                cartItemPrice.textContent = ticketPriceText;
                currentTicketPrice = price;
                cartQuantity.value = 1;
                updateCartTotal();

                // Show cart section and scroll to it
                cartSection.style.display = 'block';
                cartSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Hide form and payment sections when new ticket is selected
                const ticketsFormSection = document.querySelector('.tickets-form-section');
                const paymentMethodsSection = document.querySelector('.payment-methods-section');
                if (ticketsFormSection) ticketsFormSection.classList.remove('active');
                if (paymentMethodsSection) paymentMethodsSection.classList.remove('active');
            });
        });

        // Quantity controls
        cartIncrease.addEventListener('click', () => {
            cartQuantity.value = parseInt(cartQuantity.value) + 1;
            updateCartTotal();
        });

        cartDecrease.addEventListener('click', () => {
            if (parseInt(cartQuantity.value) > 1) {
                cartQuantity.value = parseInt(cartQuantity.value) - 1;
                updateCartTotal();
            }
        });

        // Handle CONTINUAR button click
        if (cartContinue) {
            cartContinue.addEventListener('click', () => {
                const ticketsFormSection = document.querySelector('.tickets-form-section');
                const paymentMethodsSection = document.querySelector('.payment-methods-section');

                // Show the form section
                if (ticketsFormSection) {
                    ticketsFormSection.classList.add('active');
                    ticketsFormSection.style.display = 'block';
                }

                // Show the payment methods section
                if (paymentMethodsSection) {
                    paymentMethodsSection.classList.add('active');
                }

                // Scroll to form section
                if (ticketsFormSection) {
                    ticketsFormSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }

        function updateCartTotal() {
            const quantity = parseInt(cartQuantity.value) || 1;
            const total = currentTicketPrice * quantity;
            cartTotalPrice.textContent = total.toFixed(0) + '€';
        }
    }
});

// COOKIE MODAL FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
    const cookieModal = document.getElementById('cookie-modal');
    const cookieModalClose = document.getElementById('cookie-modal-close');
    const cookieAcceptAll = document.getElementById('cookie-accept-all');
    const cookieSavePreferences = document.getElementById('cookie-save-preferences');
    const cookieAnalytics = document.getElementById('cookie-analytics');
    const cookieMarketing = document.getElementById('cookie-marketing');

    // Check if user has already made a choice
    const cookieConsent = getCookie('cookie-consent');

    if (!cookieConsent) {
        // Show modal if no consent found
        showCookieModal();
    } else {
        // Apply saved preferences
        applySavedPreferences(cookieConsent);
    }

    // Close modal when X is clicked
    if (cookieModalClose) {
        cookieModalClose.addEventListener('click', function () {
            hideCookieModal();
        });
    }

    // Close modal when clicking outside the content
    if (cookieModal) {
        cookieModal.addEventListener('click', function (e) {
            if (e.target === cookieModal) {
                hideCookieModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && cookieModal && cookieModal.classList.contains('active')) {
            hideCookieModal();
        }
    });

    // Accept all cookies
    if (cookieAcceptAll) {
        cookieAcceptAll.addEventListener('click', function () {
            const preferences = {
                essential: true,
                analytics: true,
                marketing: true
            };
            savePreferences(preferences);
            hideCookieModal();
        });
    }

    // Save custom preferences
    if (cookieSavePreferences) {
        cookieSavePreferences.addEventListener('click', function () {
            const preferences = {
                essential: true, // Always true
                analytics: cookieAnalytics ? cookieAnalytics.checked : false,
                marketing: cookieMarketing ? cookieMarketing.checked : false
            };
            savePreferences(preferences);
            hideCookieModal();
        });
    }

    function showCookieModal() {
        if (cookieModal) {
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            cookieModal.classList.add('active');
        }
    }

    function hideCookieModal() {
        if (cookieModal) {
            // Restore body scroll
            document.body.style.overflow = '';
            cookieModal.classList.remove('active');
        }
    }

    function savePreferences(preferences) {
        // Save preferences as JSON in a cookie (expires in 365 days)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 365);
        document.cookie = `cookie-consent=${JSON.stringify(preferences)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

        // Apply the preferences
        applyPreferences(preferences);
    }

    function applySavedPreferences(consentString) {
        try {
            const preferences = JSON.parse(consentString);
            applyPreferences(preferences);
        } catch (e) {
            console.error('Error parsing cookie preferences:', e);
        }
    }

    function applyPreferences(preferences) {
        // Here you would enable/disable actual tracking scripts
        // For example:
        
        if (preferences.analytics) {
            // Enable Google Analytics or other analytics
            console.log('Analytics cookies enabled');
            // Example: loadGoogleAnalytics();
        } else {
            console.log('Analytics cookies disabled');
        }

        if (preferences.marketing) {
            // Enable marketing/advertising cookies
            console.log('Marketing cookies enabled');
            // Example: loadMarketingScripts();
        } else {
            console.log('Marketing cookies disabled');
        }
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    }
});