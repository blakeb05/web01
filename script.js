// Homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if quiz has been completed
    checkQuizCompletion();
    
    // Add some interactive heart effects
    addInteractiveHearts();
});

function startQuiz() {
    // Add a beautiful transition effect
    const mainContent = document.querySelector('.main-content');
    mainContent.style.transform = 'scale(0.9)';
    mainContent.style.opacity = '0.7';
    
    setTimeout(() => {
        window.location.href = 'quiz.html';
    }, 300);
}

function checkQuizCompletion() {
    // Check if the quiz has been completed and show gallery access
    const quizCompleted = localStorage.getItem('quizCompleted');
    if (quizCompleted === 'true') {
        showGalleryAccess();
    }
}

function showGalleryAccess() {
    const galleryAccess = document.getElementById('galleryAccess');
    if (galleryAccess) {
        galleryAccess.style.display = 'block';
        
        // Add a beautiful entrance animation
        setTimeout(() => {
            galleryAccess.style.opacity = '0';
            galleryAccess.style.transform = 'translateY(20px)';
            galleryAccess.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                galleryAccess.style.opacity = '1';
                galleryAccess.style.transform = 'translateY(0)';
            }, 100);
        }, 100);
    }
}

function addInteractiveHearts() {
    const container = document.querySelector('.container');
    
    // Add click event to create hearts
    container.addEventListener('click', function(e) {
        createFloatingHeart(e.clientX, e.clientY);
    });
}

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.transition = 'all 2s ease-out';
    
    document.body.appendChild(heart);
    
    // Animate the heart
    setTimeout(() => {
        heart.style.transform = 'translateY(-100px) scale(0)';
        heart.style.opacity = '0';
    }, 100);
    
    // Remove the heart after animation
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 2100);
}

// Add some sparkle effects on page load
window.addEventListener('load', function() {
    createSparkleEffect();
});

function createSparkleEffect() {
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.fontSize = '1.2rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1';
            sparkle.style.animation = 'sparkleAnimation 3s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 3000);
        }, i * 500);
    }
}

// Add CSS for sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
`;
document.head.appendChild(sparkleStyle);