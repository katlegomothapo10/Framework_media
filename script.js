// =====================================
// GSAP
// =====================================

gsap.registerPlugin(ScrollTrigger);

// =====================================
// LENIS SMOOTH SCROLL
// =====================================

const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Sync GSAP with Lenis

lenis.on("scroll", ScrollTrigger.update);

// =====================================
// HERO INTRO
// =====================================

const tl = gsap.timeline();

tl.from(".navbar",{
    y:-80,
    opacity:0,
    duration:1,
    ease:"power3.out"
})

.from(".eyebrow",{
    y:40,
    opacity:0,
    duration:.8
},"-=.4")

.from(".hero-title",{
    y:80,
    opacity:0,
    duration:1,
    ease:"power3.out"
},"-=.4")

.from(".hero-description",{
    y:30,
    opacity:0,
    duration:.8
},"-=.6")

.from(".hero-buttons",{
    y:30,
    opacity:0,
    duration:.7
},"-=.5")

.from(".hero-stats div",{

    y:60,
    opacity:0,
    duration:.8,
    stagger:.12

},"-=.3");

// =====================================
// SCROLL REVEAL
// =====================================

gsap.utils.toArray("section").forEach(section=>{

    if(section.classList.contains("hero")) return;

    gsap.from(section,{

        opacity:0,
        y:100,

        duration:1,

        ease:"power3.out",

        scrollTrigger:{

            trigger:section,

            start:"top 80%"

        }

    });

});

// =====================================
// NAVBAR SHRINK
// =====================================

ScrollTrigger.create({

    start:50,

    end:99999,

    onUpdate:self=>{

        gsap.to(".navbar .container",{

            padding:self.direction===1
                ?"12px 22px"
                :"18px 26px",

            scale:self.direction===1
                ?.96
                :1,

            duration:.3

        });

    }

});

// =====================================
// FLOATING GRADIENTS
// =====================================

gsap.to(".gradient-one",{

    x:120,
    y:60,

    duration:12,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});

gsap.to(".gradient-two",{

    x:-100,
    y:120,

    duration:15,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});

gsap.to(".gradient-three",{

    x:70,
    y:-80,

    duration:18,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});

// =====================================
// PARALLAX
// =====================================

document.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth-.5);

    const y=(e.clientY/window.innerHeight-.5);

    gsap.to(".gradient-one",{

        xPercent:x*10,

        yPercent:y*10,

        overwrite:"auto"

    });

    gsap.to(".gradient-two",{

        xPercent:-x*12,

        yPercent:-y*12,

        overwrite:"auto"

    });

    gsap.to(".gradient-three",{

        xPercent:x*15,

        yPercent:-y*15,

        overwrite:"auto"

    });

});

// =====================================
// MAGNETIC BUTTONS
// =====================================

document.querySelectorAll(".button,.primary-btn,.secondary-btn")
.forEach(button=>{

button.addEventListener("mousemove",e=>{

const rect=button.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

gsap.to(button,{

x:x*.18,

y:y*.18,

duration:.3

});

});

button.addEventListener("mouseleave",()=>{

gsap.to(button,{

x:0,
y:0,
duration:.45,
ease:"elastic.out(1,.5)"

});

});

});

// =====================================
// HERO TITLE PARALLAX
// =====================================

gsap.to(".hero-title",{

    yPercent:20,

    ease:"none",

    scrollTrigger:{

        trigger:".hero",

        scrub:true

    }

});

// =====================================
// HERO FADE
// =====================================

gsap.to(".hero",{

    opacity:.15,

    scrollTrigger:{

        trigger:".hero",

        start:"bottom center",

        end:"bottom top",

        scrub:true

    }

});

// =====================================
// MARQUEE SPEED
// =====================================

const marquee=document.querySelector(".marquee-track");

marquee.addEventListener("mouseenter",()=>{

gsap.to(marquee,{

timeScale:.25

});

});

marquee.addEventListener("mouseleave",()=>{

gsap.to(marquee,{

timeScale:1

});

});

// =====================================
// CARD HOVER
// =====================================

document.querySelectorAll(".hero-stats div").forEach(card=>{

card.addEventListener("mouseenter",()=>{

gsap.to(card,{

y:-8,

scale:1.03,

duration:.3

});

});

card.addEventListener("mouseleave",()=>{

gsap.to(card,{

y:0,

scale:1,

duration:.3

});

});

});
