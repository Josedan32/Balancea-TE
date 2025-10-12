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

const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("navbar");

toggle.addEventListener("click", () => {
nav.classList.toggle("show");
toggle.textContent = nav.classList.contains("show") ? "✕" : "☰";
});
