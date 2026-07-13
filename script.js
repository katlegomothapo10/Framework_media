const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof gsap !== 'undefined';
if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

// ===== Flip cards =====
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// ===== Kinetic hero title =====
const kineticTitle = document.getElementById('kineticTitle');
if (kineticTitle) {
  kineticTitle.querySelectorAll('.kline').forEach(line => {
    const words = line.textContent.split(' ');
    line.innerHTML = words.map(w =>
      `<span style="display:inline-block;white-space:nowrap;">${w.split('').map(c => `<span class="kchar">${c}</span>`).join('')}</span> `
    ).join('');
  });

  const chars = kineticTitle.querySelectorAll('.kchar');
  if (hasGSAP && !reduceMotion) {
    gsap.to(chars, {
      y: 0, rotate: 0, duration: 0.9, ease: 'power4.out',
      stagger: 0.018, delay: 0.2
    });
  } else {
    chars.forEach(c => { c.style.transform = 'translateY(0) rotate(0)'; });
  }
}

// ===== Hero subtext / actions fade in =====
if (hasGSAP && !reduceMotion) {
  gsap.to('.hero-sub, .hero-actions', {
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.9
  });
} else {
  document.querySelectorAll('.hero-sub, .hero-actions').forEach(el => {
    el.style.opacity = 1; el.style.transform = 'none';
  });
}

// ===== Scroll reveal (services, flip cards, proof, contact) =====
const revealEls = document.querySelectorAll('.service-card, .flip-card, .proof-quote, .contact');
revealEls.forEach(el => el.classList.add('fade-up'));

if (hasGSAP && !reduceMotion) {
  revealEls.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 36, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// ===== Pinned scroll storytelling: Process section =====
const processList = document.getElementById('processList');
if (hasGSAP && processList && !reduceMotion && window.innerWidth > 780) {
  const steps = processList.querySelectorAll('.process-step');
  gsap.set(steps, { opacity: 0.25 });

  steps.forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => gsap.to(step, { opacity: 1, duration: 0.4 }),
      onLeave: () => gsap.to(step, { opacity: 0.25, duration: 0.4 }),
      onEnterBack: () => gsap.to(step, { opacity: 1, duration: 0.4 }),
      onLeaveBack: () => gsap.to(step, { opacity: 0.25, duration: 0.4 }),
    });
  });
}

// ===== Hero background parallax on scroll =====
if (hasGSAP && !reduceMotion) {
  gsap.to('.hero-bg', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
  });
}

// ===== Custom cursor =====
const cursorDot = document.getElementById('cursorDot');
const cursorLabel = document.getElementById('cursorLabel');
if (cursorDot && window.matchMedia('(hover: hover)').matches) {
  let mx = 0, my = 0, cx = 0, cy = 0;
  window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

  function loop() {
    cx += (mx - cx) * 0.25;
    cy += (my - cy) * 0.25;
    cursorDot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('[data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('expand');
      cursorLabel.textContent = el.getAttribute('data-cursor');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('expand');
      cursorLabel.textContent = '';
    });
  });

  document.querySelectorAll('a, button').forEach(el => {
    if (el.hasAttribute('data-cursor')) return;
    el.addEventListener('mouseenter', () => cursorDot.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('expand'));
  });
}

// ===== FAQ accordion =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});

// ===== Extra reveal: proof items, diff rows, offer items, why rows =====
const extraReveal = document.querySelectorAll('.proof-item, .diff-row:not(.diff-head), .offer-item, .offer-tier, .why-row, .story-line');
if (hasGSAP && !reduceMotion) {
  extraReveal.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%' } }
    );
  });
}

// ===== Nav background on scroll =====
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40 ? 'rgba(8,7,15,0.9)' : 'rgba(8,7,15,0.65)';
});
