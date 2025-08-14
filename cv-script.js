// Professional AI CV JavaScript - Basit ve Etkili
document.addEventListener('DOMContentLoaded', function() {
    // Skill Bars Animation
    initSkillBars();
    
    // Counter Animation
    initCounters();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Intersection Observer for Animations
    initIntersectionObserver();
    
    // Generate QR Code
    generateQRCode();
});

// Generate QR Code
function generateQRCode() {
    const qrPlaceholder = document.querySelector('.qr-placeholder');
    if (qrPlaceholder) {
        // Get current page URL
        const currentUrl = window.location.href;
        
        // Create QR code using qrcode.js library
        const qrContainer = document.createElement('div');
        qrContainer.id = 'qrcode';
        qrContainer.style.width = '120px';
        qrContainer.style.height = '120px';
        
        // Replace placeholder with QR code container
        qrPlaceholder.innerHTML = '';
        qrPlaceholder.appendChild(qrContainer);
        
        // Generate QR code
        generateQRCodeImage(currentUrl, qrContainer);
    }
}

// Generate QR Code Image
function generateQRCodeImage(text, container) {
    // Use qrcode.js library to generate real QR code
    if (typeof QRCode !== 'undefined') {
        QRCode.toCanvas(container, text, {
            width: 120,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, function (error, canvas) {
            if (error) {
                console.error('QR Code generation error:', error);
                // Fallback to simple pattern
                generateSimpleQRCode(container);
            } else {
                // Add download functionality
                canvas.addEventListener('click', function() {
                    downloadQRCode(canvas, 'cv-qrcode.png');
                });
                
                // Add hover effect
                container.style.cursor = 'pointer';
                container.title = 'QR kodu indirmek için tıklayın';
            }
        });
    } else {
        // Fallback if qrcode.js is not loaded
        generateSimpleQRCode(container);
    }
}

// Fallback QR Code Generation
function generateSimpleQRCode(container) {
    const canvas = document.createElement('canvas');
    const size = 120;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    // Simple QR code pattern (placeholder)
    ctx.fillStyle = '#000000';
    const blockSize = 8;
    const blocks = Math.floor(size / blockSize);
    
    // Create a simple pattern
    for (let i = 0; i < blocks; i++) {
        for (let j = 0; j < blocks; j++) {
            if ((i + j) % 2 === 0) {
                ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
            }
        }
    }
    
    // Add text below
    ctx.fillStyle = '#666666';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CV QR', size / 2, size - 5);
    
    // Display in container
    container.innerHTML = '';
    container.appendChild(canvas);
    
    // Add download functionality
    canvas.addEventListener('click', function() {
        downloadQRCode(canvas, 'cv-qrcode.png');
    });
    
    // Add hover effect
    container.style.cursor = 'pointer';
    container.title = 'QR kodu indirmek için tıklayın';
}

// Download QR Code
function downloadQRCode(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
}

// Skill Bars Animation
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillFill = item.querySelector('.skill-fill');
        const skillLevel = item.getAttribute('data-level');
        
        if (skillFill) {
            // Set initial width to 0
            skillFill.style.width = '0%';
            
            // Animate on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            skillFill.style.width = skillLevel + '%';
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(item);
        }
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.getAttribute('data-count').includes('%') ? '%' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.getAttribute('data-count');
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Add smooth scrolling to all internal links
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

// Intersection Observer for Animations
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .experience-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add hover effect to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effect to contact buttons
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects
}, 16)); // 60fps
