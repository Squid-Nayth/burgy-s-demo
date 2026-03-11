// =============================================
// Side Menu Accordion (global, used via onclick)
// =============================================
function toggleSmenuAccordion(trigger) {
    const accordion = trigger.closest('.smenu-accordion');
    const submenu = accordion.querySelector('.smenu-submenu');
    const isOpen = submenu.classList.contains('open');

    // Close all others in same nav-section
    const section = accordion.closest('.smenu-nav-section');
    if (section) {
        section.querySelectorAll('.smenu-submenu.open').forEach(s => {
            s.classList.remove('open');
            s.closest('.smenu-accordion').querySelector('.smenu-nav-item').classList.remove('open');
        });
    }

    if (!isOpen) {
        submenu.classList.add('open');
        trigger.classList.add('open');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Transparent Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 1b. Side Menu Control
    const menuBtn = document.querySelector('.menu-btn');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuBtn && sideMenu) {
        menuBtn.addEventListener('click', () => {
            sideMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeSideMenu = () => {
            sideMenu.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeMenu) closeMenu.addEventListener('click', closeSideMenu);
        if (menuOverlay) menuOverlay.addEventListener('click', closeSideMenu);
        
        // Close menu when any link (old or new) inside side menu is clicked
        document.querySelectorAll('.side-nav-links a, .smenu-account-row, .smenu-order-item, .smenu-nav-item:not([onclick]), .smenu-submenu a').forEach(link => {
            link.addEventListener('click', closeSideMenu);
        });
    }

    // 2. Snappy GSAP Animations
    
    // Hero Animations (Immediate & Fast)
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl.from(".hero-content h1", {
        y: 40,
        opacity: 0,
        duration: 0.5
    })
    .from(".hero-content p", {
        y: 20,
        opacity: 0,
        duration: 0.4
    }, "-=0.25")
    .fromTo(".hero-content .btn-primary", 
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, clearProps: "all" },
        "-=0.2"
    );

    // Scroll Reveal Animations (Snappier)
    const revealSections = document.querySelectorAll('section, .promo-card, .category-item, .restaurant-card, .burger-item, .review-card');
    revealSections.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none" // Play once when entering
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "all" // Important: removes inline styles after animation to avoid issues
        });
    });

    // Instagram Grid Animation (Snappier)
    gsap.from(".social-item", {
        scrollTrigger: {
            trigger: ".social-grid",
            start: "top 85%"
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "all"
    });

    // Special Product Card Hover (Snappy)
    document.querySelectorAll('.promo-card, .category-item').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });

    // 3. Play on Hover (for social grid)
    const socialItems = document.querySelectorAll('.social-item');
    socialItems.forEach(item => {
        const video = item.querySelector('.social-video');
        item.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
        });
        item.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    // 4. Burger Builder Logic (Existing)
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

                if (extra) {
                    opt.classList.toggle('active');
                    extrasTotal = 0;
                    document.querySelectorAll('[data-extra].active').forEach(ex => extrasTotal += 500);
                } else {
                    opt.parentElement.querySelectorAll('.opt-item').forEach(i => i.classList.remove('active'));
                    opt.classList.add('active');
                }

                if (layer) {
                    const targetImg = document.getElementById(`layer-${layer}`);
                    if (targetImg) {
                        gsap.to(targetImg, { scale: 1.2, opacity: 0.5, duration: 0.2, onComplete: () => {
                            targetImg.src = imgPath;
                            gsap.to(targetImg, { scale: 1, opacity: 1, duration: 0.3 });
                        }});
                        
                        if (layer === 'meat') {
                            basePrice = opt.innerText.includes('POULET') ? 4500 : 5000;
                        }
                    }
                }

                if (builderPriceVal) builderPriceVal.innerText = `${basePrice + extrasTotal} CFA`;
            });
        });
    }

    // 5. Autoplay Hero videos
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.play().catch(() => {});
            else entry.target.pause();
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.hero-bg').forEach(video => videoObserver.observe(video));

    // 6. Instagram Carousel Logic
    const instaCarousel = document.getElementById('instaCarousel');
    const dots = document.querySelectorAll('.instagram-promo-section .dot');
    let currentIndex = 0;

    if (instaCarousel && dots.length > 0) {
        function updateCarousel(index) {
            gsap.to(instaCarousel, { xPercent: -index * 100, duration: 0.8, ease: "power2.inOut" });
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            const videos = instaCarousel.querySelectorAll('video');
            videos.forEach((v, i) => {
                if (i === index) v.play().catch(() => {});
                else v.pause();
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateCarousel(currentIndex);
            });
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % dots.length;
            updateCarousel(currentIndex);
        }, 5000);
    }
});
