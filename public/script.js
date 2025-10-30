// Translations object
const translations = {
    en: {
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
        formSuccess: "Thank you for your message! (Note: Connect this to your backend or email service)"
    },
    es: {
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
        formSuccess: "¡Gracias por tu mensaje! (Nota: Conecta esto con tu backend o servicio de email)"
    }
};

// Current language
let currentLang = 'en';

// Change language function
function changeLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
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
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert(translations[currentLang].formSuccess);
            // Add your form submission logic here
            // Example: send data to backend, use EmailJS, etc.
        });
    }
}

// Smooth scroll for anchor links
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
    initLanguageToggle();
    initContactForm();
    initSmoothScroll();
});