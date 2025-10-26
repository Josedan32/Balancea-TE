const state = {
    necessary: true,
    analytics: false,
    marketing: false
};

function toggleCookie(num) {
    if (num === 1) return; // Necesarias siempre activas

    const toggle = document.getElementById(`toggle${num}`);
    toggle.classList.toggle('active');

    if (num === 2) state.analytics = !state.analytics;
    if (num === 3) state.marketing = !state.marketing;
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function acceptAll() {
    document.getElementById('toggle2').classList.add('active');
    document.getElementById('toggle3').classList.add('active');
    state.analytics = true;
    state.marketing = true;
    showNotification('✅ Todas las cookies aceptadas. ¡Gracias!');
}

function acceptSelected() {
    showNotification('💾 Tus preferencias han sido guardadas');
    console.log('Cookies configuradas:', state);
}

function rejectAll() {
    document.getElementById('toggle2').classList.remove('active');
    document.getElementById('toggle3').classList.remove('active');
    state.analytics = false;
    state.marketing = false;
    showNotification('❌ Solo cookies necesarias activas');
}

// Agregar partículas de fondo
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(232, 220, 196, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
    particle.style.zIndex = '1';
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 7000);
}

setInterval(createParticle, 500);