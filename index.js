document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollHint = document.getElementById("scroll-hint");

    // Initialize initial contiguous states
    gsap.set(".card-1", { left: "0vw", width: "17.6vw" });
    gsap.set(".card-2", { left: "17.6vw", width: "17.6vw" });
    gsap.set(".card-3", { left: "35.2vw", width: "17.6vw" });
    gsap.set(".card-4", { left: "52.8vw", width: "17.6vw" });
    gsap.set(".card-5", { left: "70.4vw", width: "17.6vw" });
    
    // Ensure detail layers are hidden and banner slices are visible initially
    gsap.set(".details-content", { opacity: 0 });
    gsap.set(".img-banner", { opacity: 1 });
    gsap.set(".face-front", { backgroundColor: "transparent" });
    // Ensure all card inners are un-rotated initially
    gsap.set(".card-inner", { rotationY: 0 });

    // Use GSAP matchMedia to manage responsive ScrollTriggers
    const mm = gsap.matchMedia();

    mm.add({
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)"
    }, (context) => {
        const { isDesktop } = context.conditions;

        // Create the scroll-bound timeline INSIDE the matchMedia callback
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#pinned-trigger",
                start: "top top",
                end: "+=3200", // Smooth scrub scrollable space
                scrub: 2.0, // Buttery smooth inertia scrolling!
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    // Hide scroll hint after scrolling slightly
                    if (progress > 0.05) {
                        gsap.to(scrollHint, { opacity: 0, duration: 0.3 });
                    } else {
                        gsap.to(scrollHint, { opacity: 1, duration: 0.3 });
                    }
                }
            }
        });

        if (isDesktop) {
            // ==========================================
            // DESKTOP DOUBLE Y-FLIP ANIMATION
            // ==========================================
            
            // --- Phase 1: Horizontal split with reduced gaps (0.1 -> 0.3) ---
            tl.to(".card", { width: "16.4vw", ease: "none", duration: 0.2 }, 0.1)
              .to("#card-1", { left: "0vw", ease: "none", duration: 0.2 }, 0.1)
              .to("#card-2", { left: "17.9vw", ease: "none", duration: 0.2 }, 0.1)
              .to("#card-3", { left: "35.8vw", ease: "none", duration: 0.2 }, 0.1)
              .to("#card-4", { left: "53.7vw", ease: "none", duration: 0.2 }, 0.1)
              .to("#card-5", { left: "71.6vw", ease: "none", duration: 0.2 }, 0.1);

            // Animate card corner rounding as it splits
            tl.to([".card-inner", ".card-face"], { borderRadius: "12px", ease: "none", duration: 0.2 }, 0.1);

            // --- Phase 2: First 3D Y-Axis Flip & Initial Fan-Out (0.3 -> 0.45) ---
            tl.to(".card-inner", { rotationY: 180, ease: "none", duration: 0.15 }, 0.3);

            // Start fanning out: rotate Z-axis and apply initial vertical/horizontal shifts to align bottoms along the arc
            tl.to("#card-1", { rotation: -5.5, y: "1.55vh", x: "1.7vw", ease: "none", duration: 0.15 }, 0.3)
              .to("#card-2", { rotation: -2.75, y: "0.39vh", x: "0.8vw", ease: "none", duration: 0.15 }, 0.3)
              .to("#card-3", { rotation: 0, y: "0vh", x: "0vw", ease: "none", duration: 0.15 }, 0.3)
              .to("#card-4", { rotation: 2.75, y: "0.39vh", x: "-0.8vw", ease: "none", duration: 0.15 }, 0.3)
              .to("#card-5", { rotation: 5.5, y: "1.55vh", x: "-1.7vw", ease: "none", duration: 0.15 }, 0.3);

            // --- Content Swap (Exactly at midpoint = 0.375) ---
            tl.set(".face-front", { backgroundColor: "#ffffff" }, 0.375)
              .set(".img-banner", { opacity: 0 }, 0.375)
              .set(".details-content", { opacity: 1 }, 0.375);

            // --- Phase 3: Second 3D Y-Axis Flip & Symmetrical bottom-closed Fan-Out (0.65 -> 0.80) ---
            tl.to(".card-inner", { rotationY: 360, ease: "none", duration: 0.15 }, 0.65);

            // Final fanned state: card bottom-centers align perfectly on a circular arc (radius = 170vw) with 0 gaps
            tl.to("#card-1", { rotation: -11, y: "3.1vh", x: "3.4vw", ease: "none", duration: 0.15 }, 0.65)
              .to("#card-2", { rotation: -5.5, y: "0.78vh", x: "1.6vw", ease: "none", duration: 0.15 }, 0.65)
              .to("#card-3", { rotation: 0, y: "0vh", x: "0vw", ease: "none", duration: 0.15 }, 0.65)
              .to("#card-4", { rotation: 5.5, y: "0.78vh", x: "-1.6vw", ease: "none", duration: 0.15 }, 0.65)
              .to("#card-5", { rotation: 11, y: "3.1vh", x: "-3.4vw", ease: "none", duration: 0.15 }, 0.65);

        } else {
            // ==========================================
            // MOBILE DOUBLE Y-FLIP ANIMATION
            // ==========================================
            
            // --- Phase 1: Vertical split gaps (0.1 -> 0.3) ---
            tl.to("#card-1", { width: "85vw", height: "13vh", left: "7.5vw", top: "5vh", ease: "none", duration: 0.2 }, 0.1)
              .to("#card-2", { width: "85vw", height: "13vh", left: "7.5vw", top: "19.5vh", ease: "none", duration: 0.2 }, 0.1)
              .to("#card-3", { width: "85vw", height: "13vh", left: "7.5vw", top: "34vh", ease: "none", duration: 0.2 }, 0.1)
              .to("#card-4", { width: "85vw", height: "13vh", left: "7.5vw", top: "48.5vh", ease: "none", duration: 0.2 }, 0.1)
              .to("#card-5", { width: "85vw", height: "13vh", left: "7.5vw", top: "63vh", ease: "none", duration: 0.2 }, 0.1);

            // Round the corners on mobile split
            tl.to([".card-inner", ".card-face"], { borderRadius: "12px", ease: "none", duration: 0.2 }, 0.1);

            // --- Phase 2: First Flip (0.3 -> 0.45) ---
            tl.to(".card-inner", { rotationY: 180, ease: "none", duration: 0.15 }, 0.3);

            // Swapping content
            tl.set(".face-front", { backgroundColor: "#ffffff" }, 0.375)
              .set(".img-banner", { opacity: 0 }, 0.375)
              .set(".details-content", { opacity: 1 }, 0.375);

            // --- Phase 3: Second Flip (0.65 -> 0.80) ---
            tl.to(".card-inner", { rotationY: 360, ease: "none", duration: 0.15 }, 0.65);
        }
    });
});
