// Ano dinâmico no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('show');
  });
}

// Reveal on scroll (animações suaves)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.18 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// Carrossel de parceiros (loop suave)
const track = document.getElementById('partnersTrack');
if (track) {
  // duplica itens para efeito de loop
  track.innerHTML += track.innerHTML;
  let offset = 0;
  function tick() {
    offset -= 0.4; // velocidade
    track.style.transform = `translateX(${offset}px)`;
    if (Math.abs(offset) > track.scrollWidth / 2) offset = 0;
    requestAnimationFrame(tick);
  }
  tick();
}

// Botão "voltar ao topo"
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Fecha menu ao clicar num link (mobile)
document.querySelectorAll('#menu a').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('show');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});
