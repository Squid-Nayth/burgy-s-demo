document.addEventListener('DOMContentLoaded', () => {
    // 1. Transparent Navbar on Scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 1b. Mega-Menu / Dropdown control
    const navDropdown = document.querySelector('.nav-dropdown');
    const megaBackdrop = document.getElementById('mega-backdrop');

    // Show backdrop when hovering dropdown
    if (navDropdown && megaBackdrop) {
        navDropdown.addEventListener('mouseenter', () => {
            megaBackdrop.classList.add('show');
        });
        navDropdown.addEventListener('mouseleave', () => {
            megaBackdrop.classList.remove('show');
        });

        // Close mega-menu when clicking backdrop
        megaBackdrop.addEventListener('click', () => {
            megaBackdrop.classList.remove('show');
            navDropdown.classList.remove('open');
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                megaBackdrop.classList.remove('show');
                navDropdown.classList.remove('open');
            }
        });

        // Close after clicking a product item
        document.querySelectorAll('.mega-product-item').forEach(item => {
            item.addEventListener('click', () => {
                megaBackdrop.classList.remove('show');
                navDropdown.classList.remove('open');
            });
        });
    }


    // 2. Intersection Observer for Fade-in Elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% visible
    };

    const fadeElements = document.querySelectorAll('.fade-in, .restaurant-card, .burger-item');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class based on element type or use a general visible class
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('visible');
                } else {
                    // For cards and burger items, just adding some style directly or via class
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for cards to be animated
    const animatedElements = document.querySelectorAll('.restaurant-card, .burger-item');
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const standardFadeElements = document.querySelectorAll('.fade-in');
    standardFadeElements.forEach(el => {
        observer.observe(el);
    });
    // 3. Play on Hover (for social grid)
    const socialItems = document.querySelectorAll('.social-item');
    socialItems.forEach(item => {
        const video = item.querySelector('.social-video');

        item.addEventListener('mouseenter', () => {
            video.play().catch(error => {
                console.log("Play failed:", error);
            });
        });

        item.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    // 4. Burger Builder - 2D Interactive Implementation
    const builderOptions = document.querySelectorAll('.builder-controls .opt-item');
    const builderPriceVal = document.getElementById('builder-price');
    let basePrice = 4500;
    let extrasTotal = 0;

    if (builderOptions.length > 0) {
        builderOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                const layer = opt.getAttribute('data-layer');
                const imgPath = opt.getAttribute('data-img');
                const extra = opt.getAttribute('data-extra');

                // Toggle active state
                if (extra) {
                    opt.classList.toggle('active');
                    extrasTotal = 0;
                    document.querySelectorAll('[data-extra].active').forEach(ex => {
                        extrasTotal += 500;
                    });
                } else {
                    opt.parentElement.querySelectorAll('.opt-item').forEach(i => i.classList.remove('active'));
                    opt.classList.add('active');
                }

                // Swap image for layers
                if (layer) {
                    const targetImg = document.getElementById(`layer-${layer}`);
                    if (targetImg) {
                        targetImg.style.transform = 'scale(1.1) rotate(5deg)';
                        targetImg.style.opacity = '0.5';
                        setTimeout(() => {
                            targetImg.src = imgPath;
                            targetImg.style.transform = layer === 'top' ? 'translateY(-60px)' : (layer === 'meat' ? 'translateY(20px)' : 'translateY(80px)');
                            targetImg.style.opacity = '1';
                        }, 150);
                    }

                    // Logic for base price change based on meat
                    if (layer === 'meat') {
                        if (opt.innerText.includes('POULET')) basePrice = 4500;
                        else basePrice = 5000; // Smashé more expensive
                    }
                }

                // Update Price Display
                if (builderPriceVal) {
                    builderPriceVal.innerText = `${basePrice + extrasTotal} CFA`;
                }
            });
        });
    }


    // 5. Autoplay Hero videos
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(error => { });
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.hero-bg').forEach(video => {
        videoObserver.observe(video);
    });
});
