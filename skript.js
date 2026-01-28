// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Меняем иконку меню
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Закрытие меню при клике на ссылку
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            // Возвращаем иконку меню
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Плавная прокрутка для всех ссылок с якорями
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем якорь "#", который ведет на ту же страницу
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Закрываем мобильное меню, если оно открыто
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // Плавная прокрутка
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Подсветка текущего раздела в навигации при скролле
    const sections = document.querySelectorAll('section');
    const navLinksArray = document.querySelectorAll('.nav-links a');
    
    function highlightNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами, которые должны появляться при скролле
    const animateElements = document.querySelectorAll('.feature-card, .app-card, .resource-card, .timeline-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Добавляем CSS класс для анимации
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .app-card, .resource-card, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.visible, .app-card.visible, .resource-card.visible, .timeline-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links a.active {
            color: var(--primary-color) !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});

// Обновленная функция для наблюдения за элементами
document.addEventListener('DOMContentLoaded', function() {
    const stepElements = document.querySelectorAll('.step');
    
    const stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Добавляем задержку для каждого шага
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    stepElements.forEach(el => {
        stepObserver.observe(el);
    });
    
    // Анимация для остальных элементов
    const animateElements = document.querySelectorAll(
        '.feature-card, .app-card, .resource-card, .fact, .stat'
    );
    
    const elementObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        elementObserver.observe(el);
    });
});

// Добавляем CSS для новых анимаций
const newAnimationStyles = document.createElement('style');
newAnimationStyles.textContent = `
    .step {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .step.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card, .app-card, .resource-card, .fact, .stat {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animated, .app-card.animated, .resource-card.animated, 
    .fact.animated, .stat.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(newAnimationStyles);