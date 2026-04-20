// ANIMAÇÃO DAS BARRAS DE PROGRESSO (quando seção habilidades entra em tela)
const progressBars = document.querySelectorAll('.progress-fill');

function animateProgressBars() {
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        if (percent && bar.style.width !== percent + '%') {
            bar.style.width = percent + '%';
        }
    });
}

// Reset inicial (largura zero)
progressBars.forEach(bar => {
    bar.style.width = '0%';
});

// Observer para iniciar animação quando a seção habilidades ficar visível
const skillsSection = document.getElementById('habilidades');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (skillsSection) observer.observe(skillsSection);

// Animação Fade-up via IntersectionObserver
const fadeElements = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// Formulário com validação real para envio ao Formspree
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const msg = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !msg) {
            e.preventDefault(); // só bloqueia se estiver vazio
            alert('⚠️ Preencha todos os campos antes de enviar.');
        }
    });
}

// Smooth scroll para links internos (header fixo)
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ajuste para evitar barras não animadas se já visível no load
window.addEventListener('load', () => {
    if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
        animateProgressBars();
    }

    // garantir visibilidade fade caso já apareça
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('visible');
        }
    });
});

/* ── Subtle cursor glow (desktop only) ─────────────────── */
if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        width: 320px;
        height: 320px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0,188,212,.055) 0%, transparent 70%);
        transform: translate(-50%,-50%);
        transition: opacity .5s;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}