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

// Filtragem de cursos
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cursoCards = document.querySelectorAll('.curso-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona classe active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            cursoCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('cursoModal');
    const closeModal = document.querySelector('.modal-close');
    const cursoButtons = document.querySelectorAll('.curso-btn');
    
    cursoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course');
            // Aqui você pode adicionar lógica para preencher o modal com os dados do curso
            modal.classList.add('active');
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Fecha modal ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            lightboxImage.src = img.src;
            lightboxCaption.textContent = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(11, 11, 14, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(11, 11, 14, 0.95)';
        }
    });
});

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-main, .thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img') || this;
            lightboxImage.src = img.src;
            lightboxCaption.textContent = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(11, 11, 14, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(11, 11, 14, 0.95)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});

// Filtragem de palestras
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const palestraCards = document.querySelectorAll('.palestra-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona classe active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            palestraCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('palestraModal');
    const closeModal = document.querySelector('.modal-close');
    const palestraButtons = document.querySelectorAll('.palestra-btn');
    
    // Dados das palestras
    const palestrasData = {
        'cultura-indigena': {
            title: 'VALORIZAÇÃO DA CULTURA INDÍGENA',
            duration: '5 horas',
            audience: '50+ pessoas',
            description: 'Palestra com objetivo de promover a importância e a riqueza das tradições, costumes, línguas e conhecimentos dos povos indígenas. Busca-se conscientizar o público sobre a necessidade de preservar e respeitar essas culturas milenares, reconhecendo sua contribuição para a diversidade cultural do país.',
            objectives: [
                'Combater estereótipos e preconceitos',
                'Promover a valorização da identidade indígena',
                'Fomentar o diálogo intercultural',
                'Preservar saberes ancestrais',
                'Construir sociedade mais justa e inclusiva'
            ],
            images: [
                'imagens/palestras/cultura-indigena-1.jpg',
                'imagens/palestras/cultura-indigena-2.jpg',
                'imagens/palestras/cultura-indigena-3.jpg'
            ]
        },
        'saude-bucal-infantil': {
            title: 'SAÚDE BUCAL INFANTIL',
            duration: '2 horas',
            audience: '15 crianças (4-6 anos)',
            description: 'Palestra com objetivo de promover a conscientização sobre a importância da higiene bucal e ensinar práticas saudáveis de cuidado com os dentes de forma lúdica e educativa para crianças.',
            objectives: [
                'Ensino lúdico sobre higiene bucal',
                'Conscientização infantil',
                'Prevenção de problemas dentários',
                'Criação de hábitos saudáveis',
                'Educação através de brincadeiras'
            ],
            images: [
                'imagens/palestras/saude-bucal-infantil-1.jpg',
                'imagens/palestras/saude-bucal-infantil-2.jpg',
                'imagens/palestras/saude-bucal-infantil-3.jpg',
                'imagens/palestras/saude-bucal-infantil-4.jpg'
            ]
        },
        'saude-bucal-jovens': {
            title: 'SAÚDE BUCAL PARA JOVENS',
            duration: '3 horas',
            audience: '25+ jovens (12-17 anos)',
            description: 'Palestra com objetivo de promover a conscientização sobre a importância dos cuidados com a saúde bucal e incentivar práticas saudáveis de higiene oral para adolescentes e jovens.',
            objectives: [
                'Conscientização juvenil',
                'Incentivo a práticas saudáveis',
                'Prevenção de problemas bucais',
                'Educação para autonomia',
                'Promoção de saúde preventiva'
            ],
            images: [
                'imagens/palestras/saude-bucal-jovens-1.jpg',
                'imagens/palestras/saude-bucal-jovens-2.jpg',
                'imagens/palestras/saude-bucal-jovens-3.jpg',
                'imagens/palestras/saude-bucal-jovens-4.jpg'
            ]
        }
    };
    
    palestraButtons.forEach(button => {
        button.addEventListener('click', function() {
            const palestraId = this.getAttribute('data-palestra');
            const data = palestrasData[palestraId];
            
            if (data) {
                // Preencher modal com dados
                document.querySelector('.modal-title').textContent = data.title;
                document.querySelector('.modal-duration').textContent = data.duration;
                document.querySelector('.modal-audience').textContent = data.audience;
                document.querySelector('.modal-description').textContent = data.description;
                document.querySelector('.modal-image').src = data.images[0];
                document.querySelector('.modal-badge').textContent = this.closest('.palestra-card').querySelector('.palestra-badge span').textContent;
                
                // Preencher objetivos
                const objectivesList = document.querySelector('.objectives-list');
                objectivesList.innerHTML = '';
                data.objectives.forEach(obj => {
                    const li = document.createElement('li');
                    li.textContent = obj;
                    objectivesList.appendChild(li);
                });
                
                // Preencher galeria
                const galleryGrid = document.querySelector('.gallery-grid');
                galleryGrid.innerHTML = '';
                data.images.forEach((imgSrc, index) => {
                    if (index > 0) { // Pular a primeira imagem (já usada como principal)
                        const img = document.createElement('img');
                        img.src = imgSrc;
                        img.alt = `Imagem ${index} da palestra`;
                        img.addEventListener('click', () => {
                            document.querySelector('.modal-image').src = imgSrc;
                        });
                        galleryGrid.appendChild(img);
                    }
                });
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });
});

// Atualizar ano atual no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animação de contadores na seção de doações
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Observar quando a seção de doações estiver visível
const donateSection = document.querySelector('.donate-section');
if (donateSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(donateSection);
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Simulação de sucesso
        this.innerHTML = '<p class="success-message">🎉 Obrigado por se inscrever!</p>';
        
        // Aqui você adicionaria a lógica real de envio
        console.log('Email cadastrado:', email);
    });
}

// Revelar elementos ao scroll
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', initRevealAnimations);

// Script para controle do carrossel de imagens
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  let currentSlide = 0;
  
  // Função para avançar para o próximo slide
  function nextSlide() {
    // Remover classe active do slide atual
    slides[currentSlide].classList.remove('active');
    
    // Avançar para o próximo slide
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Adicionar classe active ao novo slide
    slides[currentSlide].classList.add('active');
  }
  
  // Iniciar o carrossel (mudar a cada 5 segundos)
  setInterval(nextSlide, 5000);
  
  // Pré-carregar imagens para evitar trocas com delay
  const imageUrls = [
    'imagens/capa1.jpg',
    'imagens/capa2.jpg',
    'imagens/capa3.jpg',
    'imagens/capa4.jpg'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
});