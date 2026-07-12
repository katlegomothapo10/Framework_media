// ===== Flip cards =====
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('[data-reveal], .service-card, .process-step, .flip-card');
revealEls.forEach(el => el.classList.add('fade-up'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

// ===== Cursor glow (desktop only) =====
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

// ===== Nav background on scroll (subtle intensify) =====
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(8,7,15,0.9)';
  } else {
    nav.style.background = 'rgba(8,7,15,0.65)';
  }
});
