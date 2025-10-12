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