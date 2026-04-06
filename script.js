// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Premium Smooth Scroll with Lenis
const lenis = new Lenis({
    duration: 1.8,        // Slow, heavy feel
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease
    orientation: 'vertical',
    smoothWheel: true,
    lerp: 0.06,           // Low lerp = heavier, more premium scroll
});

// Connect Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Initialize animations once DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Preloader removal
    window.addEventListener("load", () => {
        const preloader = document.getElementById("preloader");
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 800);
        }, 2000); // 2 second display
    });

    // Explicitly play video to bypass restrictions
    const video = document.getElementById("heroVideo");
    if (video) video.play().catch(e => console.log("Video autoplay failed, waiting for user click.", e));

    
    // Navbar effect on scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Hero Section Animation Loop
    const tl = gsap.timeline();

    tl.to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
    })
    .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .to(".hero-actions", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5");

    // Scroll reveal general elements
    const revealElements = document.querySelectorAll(".reveal");

    revealElements.forEach((element) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
                once: true
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Number Counter Animation for Performance Stats
    const statCards = document.querySelectorAll(".stat-card");

    statCards.forEach((card) => {
        const statValue = card.querySelector(".stat-value");
        const targetVal = parseFloat(statValue.getAttribute("data-val"));
        // Check if value has decimals
        const hasDecimals = targetVal % 1 !== 0;

        ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: targetVal,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: () => {
                        statValue.innerText = hasDecimals 
                            ? obj.val.toFixed(1) 
                            : Math.floor(obj.val);
                    }
                });
            },
            once: true // Only animate once
        });
    });

    // Parallax effect on design image
    gsap.to(".design-image", {
        scrollTrigger: {
            trigger: ".design-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: 50,
        scale: 1.1,
        ease: "none"
    });


    // Initialize Particles JS
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#ff0000", "#0066b2", "#ffffff"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }
    // Running Car Animation
    const animateCar = () => {
        gsap.to(".running-car", {
            left: "100%",
            duration: 8,
            ease: "none",
            onComplete: () => {
                gsap.set(".running-car", { left: "-300px" });
                // Schedule next run
                setTimeout(animateCar, Math.random() * 10000 + 5000); 
            }
        });
    };

    // Initial delay for the first run
    setTimeout(animateCar, 3000);

});
