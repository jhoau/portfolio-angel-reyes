function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeToggleMobile = document.querySelector('.theme-toggle-mobile');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    html.setAttribute('data-theme', initialTheme);
    
    const toggleTheme = (button) => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (button) {
            button.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                button.style.transform = 'rotate(0deg)';
            }, 300);
        }
    };
    
    // Desktop toggle
    themeToggle?.addEventListener('click', () => toggleTheme(themeToggle));
    
    // Mobile toggle
    themeToggleMobile?.addEventListener('click', () => toggleTheme(themeToggleMobile));
}
// Mobile Menu Toggle


function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-btn');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const menuLinks = document.querySelectorAll('.mobile-menu-nav a');
    
    if (!hamburger || !overlay) return;
    
    // Abrir menú
    hamburger.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });
    
    // Cerrar menú
    const closeMenu = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; 
    };
    
    closeBtn?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeMenu(); 
    });
    
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function initTypingAnimation(){
    const typingText = document.querySelector('.typing-text');

    const texts = {
        en: ['Software Developer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'],
        es: ['Desarrollador de Software', 'Desarrollador Web', 'Solucionador de Problemas', 'Entusiasta de la Tecnología']
    };

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentLangtyping = 'en';

    function type() {
        const currentTexts = texts[currentLangtyping];
        const currentText = currentTexts[textIndex];

        if (isDeleting) {
            //Borrando
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            //escribiendo
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30: 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % currentTexts.length;
        typeSpeed = 3000;
    }
    setTimeout(type, typeSpeed);
    }

    type();

    window.updateTypingLang = function(lang) {
        currentLangtyping = lang;
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
    }
}

function initStickyNavbar() {
    const navbar = document.querySelector('.navbar-sticky');
    const heroSection = document.querySelector('header');
    
    if (!navbar || !heroSection) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        
        if (currentScroll > heroHeight - 500) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        
        lastScroll = currentScroll;
    });
}

// Translations object
const translations = {
    en: {
        greeting: "Hi, I'm",
        name: "Angel Reyes",
        titleStatic: "I'm a ",
        title: "Software Developer",
        name: "Angel Reyes",
        title: " Software Developer",
        aboutTitle: "About Me",
        aboutText: "I'm a passionate junior software developer dedicated to creating elegant and efficient solutions. I love learning new technologies and tackling challenges that help me grow professionally. Currently focused on web development and always seeking opportunities to contribute to innovative projects.",
        skillsTitle: "Skills",
        projectsTitle: "Projects",
        project1Title: "TechMate",
        project1Desc: "Smart service marketplace connecting clients with trusted local technicians.",
        project2Title: "HR Management System",
        project2Desc: "HR system built with Node.js, TypeScript, and SQL Server. Manages employees, attendance, payroll, and role-based access.",
        project3Title: "Enterprise Inventory & Automation System",
        project3Desc: "Business automation system built with Power Apps, Power Automate, and SQL Server. Streamlines inventory tracking, shipping, and production workflows through automated flows and integrated data management.",
        viewProject: "View Project →",
        contactTitle: "Contact",
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        sendButton: "Send Message",
        footer: "© 2025 Angel Reyes. All rights reserved.",
        formSending: "Sending...",
        formError: "Something went wrong. Please try again.",
        formInvalidFields: "Please complete all fields correctly.",
        formInvalidEmail: "Please enter a valid email.",
       formSuccess: "Thank you! Your message has been sent."
    },
    es: {
        greeting: "Hola, soy",
        name: "Angel Reyes",
        titleStatic: "Soy ",
        title: "Desarrollador de Software",
        name: "Angel Reyes",
        title: "Desarrollador de Software",
        aboutTitle: "Sobre Mí",
        aboutText: "Soy un desarrollador de software junior apasionado por crear soluciones elegantes y eficientes. Me encanta aprender nuevas tecnologías y enfrentar desafíos que me permitan crecer profesionalmente. Actualmente enfocado en desarrollo web y siempre buscando oportunidades para contribuir a proyectos innovadores.",
        skillsTitle: "Habilidades",
        projectsTitle: "Proyectos",
        project1Title: "TechMate",
        project1Desc: "Plataforma web que conecta clientes con técnicos verificados para solicitar servicios de reparación y mantenimiento.",
        project2Title: "HR Management System",
        project2Desc: "Sistema de RRHH desarrollado con Node.js, TypeScript y SQL Server. Gestiona empleados, asistencia, nómina y acceso por roles.",
        project3Title: "Sistema Empresarial de Inventario y Automatización",
        project3Desc: "Sistema de automatización empresarial desarrollado con Power Apps, Power Automate y SQL Server.Optimiza el seguimiento de inventario, envíos y procesos de producción mediante flujos automáticos e integración de datos",
        viewProject: "Ver Proyecto →",
        contactTitle: "Contacto",
        nameLabel: "Nombre",
        emailLabel: "Correo",
        messageLabel: "Mensaje",
        sendButton: "Enviar Mensaje",
        footer: "© 2025 Angel Reyes. Todos los derechos reservados.",
        formSending: "Enviando...",
        formError: "Ocurrió un error. Por favor, inténtalo de nuevo.",
        formInvalidFields: "Completa todos los campos correctamente.",
        formInvalidEmail: "Introduce un correo válido.",
        formSuccess: "¡Gracias! Tu mensaje ha sido enviado."
    }
};

// Current language
let currentLang = 'en';

function changeLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    if (window.updateTypingLang) {
        window.updateTypingLang(lang);
    }
}

// Initialize language buttons
function initLanguageToggle() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}

// Form submission handler
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const statusEl = document.getElementById('contact-status');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nombre = form.querySelector('#nombre').value.trim();
        const email = form.querySelector('#email').value.trim();
        const mensaje = form.querySelector('#mensaje').value.trim();

        if (!nombre || !email || !mensaje) {
            alert(translations[currentLang].formInvalidFields || 'Please fill in all fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(translations[currentLang].formInvalidEmail || 'Please enter a valid email.');
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = translations[currentLang].formSending || 'Sending...';
        if (statusEl) {
            statusEl.textContent = '';
        }

        const payload = {
            access_key: '6e788d9f-fd2b-41ad-996e-79b95129c762',
            from_name: 'Portfolio Contact Form',
            subject: `New message from ${nombre}`,
            name: nombre,
            email: email,
            message: mensaje
        };

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Success
                if (statusEl) {
                    statusEl.textContent = translations[currentLang].formSuccess || 'Thank you! Your message has been sent.';
                    statusEl.style.color = '#4ade80'; 
                }
                form.reset();
                //Error
            } else {
                console.error('Web3Forms error:', data);
                if (statusEl) {
                    statusEl.textContent = translations[currentLang].formError || 'Error sending message. Please try again.';
                    statusEl.style.color = '#f87171'; 
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
            if (statusEl) {
                statusEl.textContent = translations[currentLang].formError || 'Server error. Please try again.';
                statusEl.style.color = '#f87171';
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
     initThemeToggle();
    initLanguageToggle();
    initContactForm();
    initSmoothScroll();
    initTypingAnimation();
    initStickyNavbar();
    initMobileMenu();
});