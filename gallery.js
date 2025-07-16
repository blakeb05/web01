// Gallery functionality with romantic interactions
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has access to gallery
    checkGalleryAccess();
    
    // Initialize gallery interactions
    initializeGallery();
    
    // Add entrance animation
    addEntranceAnimation();
});

function checkGalleryAccess() {
    const quizCompleted = localStorage.getItem('quizCompleted');
    if (quizCompleted !== 'true') {
        // Redirect to homepage if quiz not completed
        showAccessDenied();
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
        return false;
    }
    return true;
}

function showAccessDenied() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="main-content">
            <h2>🔒 Gallery Locked</h2>
            <p>Complete our love story quiz first to unlock the gallery!</p>
            <a href="index.html" class="back-home-btn">
                🏠 Back to Home
            </a>
        </div>
    `;
}

function initializeGallery() {
    // Add click effects to photo cards
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach((card, index) => {
        // Add click handler for photo interaction
        card.addEventListener('click', function() {
            expandPhoto(card, index);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            createHoverEffect(card);
        });
        
        // Add touch events for mobile
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            createTouchEffect(card);
        });
    });
}

function expandPhoto(card, index) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="closeModal()">×</button>
                <div class="expanded-photo">
                    ${card.querySelector('.photo-placeholder').outerHTML}
                </div>
                <div class="expanded-caption">
                    ${card.querySelector('.photo-caption').innerHTML}
                </div>
                <div class="romantic-message">
                    ${getRomanticMessage(index)}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not already present
    addModalStyles();
    
    // Animate modal entrance
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Create romantic particles
    createModalParticles();
}

function closeModal() {
    const modal = document.querySelector('.photo-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function getRomanticMessage(index) {
    const messages = [
        "The moment our story began... 💕",
        "Every sunrise is more beautiful with you 🌅",
        "Celebrating another year of your wonderful existence 🎂",
        "Lost in the beauty of the night and your company 🌙",
        "Sand between our toes, love in our hearts 🏖️",
        "Good food, great company, perfect love 🍽️",
        "Life's greatest adventures are with you 🎡",
        "In this crazy world, you're my peace 💑"
    ];
    return messages[index] || "A beautiful memory we share 💖";
}

function createHoverEffect(card) {
    // Create floating hearts around the card
    const hearts = ['💕', '💖', '💗', '💓'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.className = 'hover-heart';
            
            const rect = card.getBoundingClientRect();
            heart.style.position = 'fixed';
            heart.style.left = (rect.left + Math.random() * rect.width) + 'px';
            heart.style.top = (rect.top + Math.random() * rect.height) + 'px';
            heart.style.fontSize = '1.2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.animation = 'hoverHeartFloat 2s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, 2000);
        }, i * 150);
    }
}

function createTouchEffect(card) {
    // Create ripple effect for touch devices
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (document.body.contains(ripple)) {
            document.body.removeChild(ripple);
        }
    }, 600);
}

function addEntranceAnimation() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 500);
    });
}

function createModalParticles() {
    const particles = ['✨', '💫', '🌟', '💖', '💕', '🌸'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
            particle.style.position = 'fixed';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.fontSize = '1.5rem';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10001';
            particle.style.animation = 'modalParticleFloat 3s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 3000);
        }, i * 200);
    }
}

function addModalStyles() {
    if (document.querySelector('#modal-styles')) return;
    
    const modalStyles = document.createElement('style');
    modalStyles.id = 'modal-styles';
    modalStyles.textContent = `
        .photo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .photo-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .modal-content {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 25px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            text-align: center;
            position: relative;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .photo-modal.show .modal-content {
            transform: scale(1);
        }
        
        .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 2rem;
            color: #ff6b6b;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .modal-close:hover {
            transform: scale(1.2);
        }
        
        .expanded-photo .photo-placeholder {
            margin-bottom: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .expanded-caption {
            font-size: 1.1rem;
            color: #666;
            font-style: italic;
            margin-bottom: 20px;
        }
        
        .romantic-message {
            font-size: 1.2rem;
            color: #e74c3c;
            font-weight: 600;
            padding: 15px;
            background: linear-gradient(135deg, #ffeaa7, #fab1a0);
            border-radius: 15px;
            margin-top: 15px;
        }
        
        .hover-heart {
            color: #ff6b6b;
        }
        
        .touch-ripple {
            position: fixed;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 107, 107, 0.3) 0%, transparent 70%);
            pointer-events: none;
            z-index: 1000;
            animation: rippleEffect 0.6s ease-out forwards;
        }
        
        @keyframes hoverHeartFloat {
            0% { opacity: 0; transform: scale(0) translateY(0); }
            50% { opacity: 1; transform: scale(1) translateY(-20px); }
            100% { opacity: 0; transform: scale(0.5) translateY(-40px); }
        }
        
        @keyframes rippleEffect {
            0% { transform: scale(0); opacity: 0.8; }
            100% { transform: scale(1); opacity: 0; }
        }
        
        @keyframes modalParticleFloat {
            0% { opacity: 0; transform: scale(0) rotate(0deg) translateY(0); }
            50% { opacity: 1; transform: scale(1) rotate(180deg) translateY(-30px); }
            100% { opacity: 0; transform: scale(0.5) rotate(360deg) translateY(-60px); }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                margin: 10px;
                padding: 20px;
            }
            
            .romantic-message {
                font-size: 1rem;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add some delightful interactions
document.addEventListener('click', function(e) {
    // Create click hearts throughout the gallery
    if (e.target.closest('.gallery-container') && !e.target.closest('.photo-card')) {
        createClickHeart(e.clientX, e.clientY);
    }
});

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '1.2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.color = '#ff6b6b';
    heart.style.animation = 'clickHeartFloat 1.5s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (document.body.contains(heart)) {
            document.body.removeChild(heart);
        }
    }, 1500);
}

// Add click heart animation
const clickHeartStyle = document.createElement('style');
clickHeartStyle.textContent = `
    @keyframes clickHeartFloat {
        0% { opacity: 1; transform: scale(1) translateY(0); }
        100% { opacity: 0; transform: scale(0.5) translateY(-80px); }
    }
`;
document.head.appendChild(clickHeartStyle);