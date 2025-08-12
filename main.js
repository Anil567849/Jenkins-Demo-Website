// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close nav menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.borderBottomColor = '#e5e5e5';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottomColor = 'rgba(229, 229, 229, 0.5)';
    }
});

// Counter Animation for Hero Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format large numbers
        let displayValue = Math.floor(current);
        if (target >= 1000000) {
            displayValue = (displayValue / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
            displayValue = (displayValue / 1000).toFixed(0) + 'K';
        }
        
        element.textContent = displayValue;
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate hero stats
            if (entry.target.classList.contains('hero-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    animateCounter(stat, target);
                });
                observer.unobserve(entry.target);
            }
            
            // Animate feature cards
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
            
            // Animate metric bars
            if (entry.target.classList.contains('metric-fill')) {
                const width = entry.target.dataset.width;
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
                observer.unobserve(entry.target);
            }
            
            // Animate community cards
            if (entry.target.classList.contains('community-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe hero stats
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe metric bars
    document.querySelectorAll('.metric-fill').forEach(bar => {
        observer.observe(bar);
    });
    
    // Observe community cards
    document.querySelectorAll('.community-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// Pipeline Animation
function animatePipeline() {
    const steps = document.querySelectorAll('.pipeline-step');
    steps.forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-8px) scale(1.05)';
            step.style.boxShadow = '0 10px 25px rgba(51, 94, 173, 0.3)';
        });
        
        step.addEventListener('mouseleave', () => {
            step.style.transform = '';
            step.style.boxShadow = '';
        });
    });
}

// Form Interactions (if any forms are added)
function handleFormSubmissions() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    });
}

// Parallax Effect for Hero Section
function handleParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
}

// Copy to Clipboard for Code Snippets
function handleCodeCopy() {
    document.querySelectorAll('.download-command').forEach(codeBlock => {
        codeBlock.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                // Show temporary success message
                const originalText = codeBlock.textContent;
                codeBlock.textContent = 'Copied!';
                codeBlock.style.backgroundColor = '#10b981';
                codeBlock.style.color = 'white';
                
                setTimeout(() => {
                    codeBlock.textContent = originalText;
                    codeBlock.style.backgroundColor = '';
                    codeBlock.style.color = '';
                }, 2000);
            });
        });
        
        // Add cursor pointer and title
        codeBlock.style.cursor = 'pointer';
        codeBlock.title = 'Click to copy';
    });
}

// Keyboard Navigation
function handleKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
}

// Performance Monitoring
function monitorPerformance() {
    // Track page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // You could send this data to analytics
        // gtag('event', 'page_load_time', {
        //     value: Math.round(loadTime)
        // });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    animatePipeline();
    handleFormSubmissions();
    handleParallax();
    handleCodeCopy();
    handleKeyboardNavigation();
    monitorPerformance();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Dark mode toggle (optional feature)
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', 
                document.body.classList.contains('dark-mode')
            );
        });
        
        // Load saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Initialize dark mode if toggle exists
document.addEventListener('DOMContentLoaded', initDarkMode);