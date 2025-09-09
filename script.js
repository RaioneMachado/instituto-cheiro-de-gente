// Ano dinâmico no footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Adiciona o botão de fechar (X) no menu mobile
    addCloseButtonToMenu();
});

// Função para adicionar o botão de fechar (X) no menu mobile
function addCloseButtonToMenu() {
    const menu = document.getElementById('menu');
    if (!menu) return;
    
    // Verifica se já existe um botão de fechar
    if (!document.querySelector('.menu-close-btn')) {
        const closeButton = document.createElement('button');
        closeButton.className = 'menu-close-btn';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Fechar menu');
        
        closeButton.addEventListener('click', function() {
            closeMenu();
        });
        
        menu.appendChild(closeButton);
    }
}

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

// Função para abrir o menu
function openMenu() {
    if (menu && navToggle) {
        menu.classList.add('show');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Função para fechar o menu
function closeMenu() {
    if (menu && navToggle) {
        menu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (navToggle && menu) {
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (menu.classList.contains('show')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

// Reveal on scroll (animações suaves)
let observer;
const revealElements = document.querySelectorAll('[data-reveal]');

if (revealElements.length > 0) {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Para melhor performance, para de observar após revelar
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.18,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// Carrossel de parceiros (loop suave)
const track = document.getElementById('partnersTrack');
if (track) {
    // duplica itens para efeito de loop
    track.innerHTML += track.innerHTML;
    let offset = 0;
    let animationFrameId;
    
    function tick() {
        offset -= 0.4; // velocidade
        track.style.transform = `translateX(${offset}px)`;
        if (Math.abs(offset) > track.scrollWidth / 2) offset = 0;
        animationFrameId = requestAnimationFrame(tick);
    }
    
    // Inicia a animação
    tick();
    
    // Pausa animação quando não visível para melhor performance
    const trackObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationFrameId) tick();
            } else {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        });
    }, { threshold: 0.1 });
    
    trackObserver.observe(track);
}

// Botão "voltar ao topo"
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 600) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fecha menu ao clicar num link (mobile)
const menuLinks = document.querySelectorAll('#menu a');
if (menuLinks.length > 0 && menu && navToggle) {
    menuLinks.forEach(a => {
        a.addEventListener('click', function() {
            closeMenu();
        });
    });
}

// Fecha menu ao clicar fora dele
document.addEventListener('click', function(e) {
    if (menu && menu.classList.contains('show') && 
        !menu.contains(e.target) && 
        e.target !== navToggle && 
        !navToggle.contains(e.target) &&
        !e.target.classList.contains('menu-close-btn')) {
        closeMenu();
    }
});

// Fecha menu ao redimensionar para desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && menu && menu.classList.contains('show')) {
        closeMenu();
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Não aplica smooth scroll para links vazios
        if (href === '#' || href === '') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fecha o menu se estiver aberto (mobile)
            if (window.innerWidth <= 768 && menu && menu.classList.contains('show')) {
                closeMenu();
            }
        }
    });
});

// Fecha menu com a tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('show')) {
        closeMenu();
    }
});