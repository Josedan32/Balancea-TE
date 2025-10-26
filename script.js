function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix');
    const duration = 2000; // duración en milisegundos
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    // Determinar si es el número con K+
    const isThousands = suffix === 'K+';

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Formatear según el tipo de número
        let displayValue;
        if (isThousands) {
            displayValue = Math.floor(current / 1000);
        } else if (suffix === '★') {
            displayValue = current.toFixed(1);
        } else {
            displayValue = Math.floor(current);
        }

        element.textContent = displayValue + suffix;
    }, duration / steps);
}

// Observador para detectar cuando los elementos son visibles
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observar todos los números
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Agregar este script al final del body o en un archivo JS separado
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(event) {
    if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
});

  // Scroll suave mejorado para los links del navbar
  document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los links del navbar que tienen href con #
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Si es solo "#", no hacer nada
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Cerrar menú móvil si está abierto
          const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
          const navMenu = document.querySelector('.nav-menu');
          const body = document.body;
          
          if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
          }
          
          // Calcular la posición considerando el header fixed
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight - 20; // 20px extra de padding
          
          // Scroll suave con animación personalizada
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Agregar clase temporal para efecto visual (opcional)
          targetSection.style.transition = 'all 0.3s ease';
          targetSection.style.transform = 'scale(1.01)';
          
          setTimeout(() => {
            targetSection.style.transform = 'scale(1)';
          }, 300);
        }
      });
    });
    
    // Highlight del link activo según la sección visible
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          // Remover active de todos los links
          navLinks.forEach(link => {
            link.classList.remove('active');
          });
          
          // Agregar active al link correspondiente
          const activeLink = document.querySelector(`nav a[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);
    
    // Observar todas las secciones
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
    });
  });



document.addEventListener('DOMContentLoaded', () => {
    // Objeto para almacenar las instancias de audio
    const audioPlayers = {};
    let currentlyPlaying = null;

    // Seleccionar todos los botones de reproducción
    const playButtons = document.querySelectorAll('.episode-play-btn');

    playButtons.forEach(button => {
        const audioSrc = button.dataset.audio;
        
        // Crear instancia de audio para cada episodio
        if (!audioPlayers[audioSrc]) {
            audioPlayers[audioSrc] = new Audio(audioSrc);
        }

        button.addEventListener('click', function() {
            const audio = audioPlayers[audioSrc];
            const playText = this.querySelector('.play-text');
            const playIcon = this.querySelector('.play-icon img');

            // Si hay otro audio reproduciéndose, pausarlo
            if (currentlyPlaying && currentlyPlaying !== audio) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
                
                // Resetear el botón del audio que estaba sonando
                playButtons.forEach(btn => {
                    if (btn.dataset.audio !== audioSrc) {
                        btn.classList.remove('playing');
                        btn.querySelector('.play-text').textContent = 'Escuchar episodio';
                        btn.querySelector('.play-icon img').src = './icons/play.svg';
                    }
                });
            }

            // Toggle play/pause del audio actual
            if (audio.paused) {
                audio.play();
                this.classList.add('playing');
                playText.textContent = 'Pausar episodio';
                playIcon.src = './icons/pause.svg';
                currentlyPlaying = audio;
                console.log(`Reproduciendo: ${audioSrc}`);
            } else {
                audio.pause();
                this.classList.remove('playing');
                playText.textContent = 'Escuchar episodio';
                playIcon.src = './icons/play.svg';
                currentlyPlaying = null;
                console.log(`Pausado: ${audioSrc}`);
            }
        });

        // Evento cuando el audio termina
        audioPlayers[audioSrc].addEventListener('ended', () => {
            button.classList.remove('playing');
            button.querySelector('.play-text').textContent = 'Escuchar episodio';
            button.querySelector('.play-icon img').src = './icons/play.svg';
            currentlyPlaying = null;
            console.log(`Episodio finalizado: ${audioSrc}`);
        });
    });
});