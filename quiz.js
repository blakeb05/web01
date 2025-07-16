// Quiz functionality with romantic questions leading to proposal
const quizData = [
    {
        question: "What was the first thing you noticed about me?",
        answers: [
            "Your beautiful smile 😊",
            "Your kind eyes 👁️",
            "Your amazing laugh 😄",
            "Your wonderful personality ✨"
        ],
        correctAnswer: 0
    },
    {
        question: "Which moment made you realize you had feelings for me?",
        answers: [
            "Our first deep conversation 💭",
            "When you helped me during a difficult time 🤝",
            "Our first date together 💕",
            "When I saw how you care for others 💖"
        ],
        correctAnswer: 2
    },
    {
        question: "What's your favorite memory of us together?",
        answers: [
            "Our romantic dinner under the stars 🌙",
            "When we got caught in the rain and laughed 🌧️",
            "Our spontaneous adventure day 🎡",
            "Just talking for hours about everything 💬"
        ],
        correctAnswer: 0
    },
    {
        question: "What do you love most about our relationship?",
        answers: [
            "How comfortable we are with each other 🏠",
            "The way we support each other's dreams 🌟",
            "Our inside jokes and shared laughter 😂",
            "How we can be completely ourselves 💯"
        ],
        correctAnswer: 1
    },
    {
        question: "If you could describe our love in one word, what would it be?",
        answers: [
            "Magical ✨",
            "Eternal ♾️",
            "Beautiful 🌹",
            "Perfect 💖"
        ],
        correctAnswer: 3
    },
    {
        question: "What do you see in our future together?",
        answers: [
            "Adventures around the world 🌍",
            "A cozy home filled with love 🏡",
            "Growing old together gracefully 👫",
            "Creating beautiful memories every day 📸"
        ],
        correctAnswer: 1
    },
    {
        type: "proposal",
        question: "Will you marry me?",
        answers: [
            "YES! 💍✨",
            "Of course, my love! 💕",
            "I've been waiting for this moment! 🥰",
            "No... just kidding, YES! 😄💖"
        ]
    }
];

let currentQuestion = 0;
let userAnswers = [];

document.addEventListener('DOMContentLoaded', function() {
    showQuestion();
    updateProgressBar();
});

function showQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    const question = quizData[currentQuestion];
    
    if (question.type === 'proposal') {
        showProposalQuestion(question);
    } else {
        showRegularQuestion(question);
    }
    
    updateNavigationButtons();
    updateProgressBar();
}

function showRegularQuestion(question) {
    const questionContainer = document.getElementById('questionContainer');
    
    questionContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="answers">
            ${question.answers.map((answer, index) => `
                <button class="answer-btn" onclick="selectAnswer(${index})" data-index="${index}">
                    ${answer}
                </button>
            `).join('')}
        </div>
    `;
    
    // Hide next button initially - user must answer correctly first
    document.getElementById('nextBtn').style.display = 'none';
    
    // Pre-select previous answer if going back
    if (userAnswers[currentQuestion] !== undefined) {
        const selectedButton = questionContainer.querySelector(`[data-index="${userAnswers[currentQuestion]}"]`);
        if (selectedButton) {
            selectedButton.classList.add('correct');
            selectedButton.disabled = true;
            
            // Show next button if question was already answered correctly
            setTimeout(() => {
                document.getElementById('nextBtn').style.display = 'inline-block';
            }, 100);
            
            // Disable all buttons since question is already answered
            const allButtons = questionContainer.querySelectorAll('.answer-btn');
            allButtons.forEach(btn => btn.disabled = true);
        }
    }
}

function showProposalQuestion(question) {
    const questionContainer = document.getElementById('questionContainer');
    
    questionContainer.innerHTML = `
        <div class="final-question">
            <div class="proposal-text">${question.question}</div>
            <span class="ring-emoji">💍</span>
            <div class="proposal-buttons">
                ${question.answers.map((answer, index) => `
                    <button class="proposal-btn ${index === 3 ? 'no-btn' : ''}" onclick="handleProposalAnswer(${index})">
                        ${answer}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add romantic particles effect
    createRomanticParticles();
}

function selectAnswer(answerIndex) {
    const question = quizData[currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    
    // Clear previous states
    buttons.forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.disabled = false;
    });
    
    // Check if answer is correct
    if (answerIndex === question.correctAnswer) {
        // Correct answer
        buttons[answerIndex].classList.add('correct');
        userAnswers[currentQuestion] = answerIndex;
        
        // Show success message
        showFeedback("Correct! 💖", "success");
        
        // Show next button after short delay
        setTimeout(() => {
            document.getElementById('nextBtn').style.display = 'inline-block';
        }, 1000);
        
        // Disable all buttons
        buttons.forEach(btn => btn.disabled = true);
        
    } else {
        // Wrong answer
        buttons[answerIndex].classList.add('incorrect');
        
        // Show feedback
        showFeedback("Try again, my love! 💕", "error");
        
        // Temporarily disable the wrong button
        buttons[answerIndex].disabled = true;
        
        // Re-enable after 1 second
        setTimeout(() => {
            buttons[answerIndex].disabled = false;
            buttons[answerIndex].classList.remove('incorrect');
        }, 1500);
    }
}

function handleProposalAnswer(answerIndex) {
    if (answerIndex === 3) {
        // The "No... just kidding" option
        showJokingResponse();
    } else {
        showAcceptedProposal();
    }
}

function showJokingResponse() {
    const questionContainer = document.getElementById('questionContainer');
    
    questionContainer.innerHTML = `
        <div class="final-question">
            <div class="proposal-text">You had me worried for a second! 😅</div>
            <div class="proposal-text" style="font-size: 1.8rem; margin-top: 20px;">
                So... is that a YES? 💖
            </div>
            <span class="ring-emoji">💍</span>
            <div class="proposal-buttons">
                <button class="proposal-btn" onclick="showAcceptedProposal()">
                    YES, I will marry you! 💕
                </button>
            </div>
        </div>
    `;
}

function showAcceptedProposal() {
    const questionContainer = document.getElementById('questionContainer');
    
    questionContainer.innerHTML = `
        <div class="final-question">
            <div class="proposal-text">You said YES! 🎉</div>
            <div class="proposal-text" style="font-size: 1.6rem; margin-top: 20px;">
                I love you more than words can express! 💖
            </div>
            <span class="ring-emoji">💍✨</span>
            <div style="margin: 30px 0; font-size: 1.2rem; color: #2c3e50;">
                Our beautiful journey begins now... 🌹
            </div>
            <button class="proposal-btn" onclick="completeQuiz()">
                Start Our New Chapter 💕
            </button>
        </div>
    `;
    
    // Create celebration effect
    createCelebrationEffect();
    
    // Hide navigation buttons
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function showFeedback(message, type) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.feedback-message');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `feedback-message ${type}`;
    feedback.innerHTML = message;
    
    // Insert after the answers
    const answersContainer = document.querySelector('.answers');
    answersContainer.parentNode.insertBefore(feedback, answersContainer.nextSibling);
    
    // Animate in
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after delay for error messages
    if (type === 'error') {
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.style.opacity = '0';
                feedback.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (feedback.parentNode) {
                        feedback.remove();
                    }
                }, 300);
            }
        }, 2000);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Show/hide previous button
    if (currentQuestion > 0) {
        prevBtn.style.display = 'inline-block';
    } else {
        prevBtn.style.display = 'none';
    }
    
    // Handle next button for regular questions
    if (quizData[currentQuestion].type !== 'proposal') {
        if (userAnswers[currentQuestion] !== undefined) {
            nextBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'none';
        }
        
        if (currentQuestion === quizData.length - 1) {
            nextBtn.style.display = 'none';
        }
    } else {
        nextBtn.style.display = 'none';
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progress = (currentQuestion / (quizData.length - 1)) * 100;
    progressFill.style.width = progress + '%';
}

function completeQuiz() {
    // Mark quiz as completed
    localStorage.setItem('quizCompleted', 'true');
    
    // Transition back to homepage
    const container = document.querySelector('.container');
    container.style.transform = 'scale(0.9)';
    container.style.opacity = '0.7';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function createRomanticParticles() {
    const particles = ['💖', '💕', '💗', '💓', '💘', '❤️', '🌹', '✨'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
            particle.style.position = 'fixed';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.fontSize = '1.5rem';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            particle.style.animation = 'romanticFloat 4s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 4000);
        }, i * 200);
    }
}

function createCelebrationEffect() {
    const celebrationEmojis = ['🎉', '🎊', '✨', '🌟', '💫', '🎆', '🎇'];
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.innerHTML = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * window.innerWidth + 'px';
            emoji.style.top = '-50px';
            emoji.style.fontSize = '2rem';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '1000';
            emoji.style.animation = 'celebrationFall 3s ease-out forwards';
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                if (document.body.contains(emoji)) {
                    document.body.removeChild(emoji);
                }
            }, 3000);
        }, i * 100);
    }
}

// Add CSS animations for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes romanticFloat {
        0% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg); 
        }
        50% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg); 
        }
        100% { 
            opacity: 0; 
            transform: scale(0.5) rotate(360deg) translateY(-100px); 
        }
    }
    
    @keyframes celebrationFall {
        0% { 
            opacity: 0; 
            transform: translateY(-50px) rotate(0deg); 
        }
        10% { 
            opacity: 1; 
        }
        100% { 
            opacity: 0; 
            transform: translateY(100vh) rotate(720deg); 
        }
    }
    
    /* Answer button states */
    .answer-btn.correct {
        background: linear-gradient(45deg, #2ecc71, #27ae60) !important;
        color: white !important;
        border-color: #27ae60 !important;
        transform: scale(1.05) !important;
        box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4) !important;
    }
    
    .answer-btn.incorrect {
        background: linear-gradient(45deg, #e74c3c, #c0392b) !important;
        color: white !important;
        border-color: #c0392b !important;
        transform: scale(0.95) !important;
        animation: shake 0.5s ease-in-out !important;
    }
    
    .answer-btn:disabled {
        cursor: not-allowed !important;
        opacity: 0.7 !important;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(0.95); }
        25% { transform: translateX(-5px) scale(0.95); }
        75% { transform: translateX(5px) scale(0.95); }
    }
    
    /* Feedback messages */
    .feedback-message {
        margin-top: 20px;
        padding: 15px 20px;
        border-radius: 15px;
        font-weight: 600;
        font-size: 1.1rem;
        text-align: center;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    }
    
    .feedback-message.success {
        background: linear-gradient(135deg, #d4edda, #c3e6cb);
        color: #155724;
        border: 2px solid #c3e6cb;
    }
    
    .feedback-message.error {
        background: linear-gradient(135deg, #f8d7da, #f5c6cb);
        color: #721c24;
        border: 2px solid #f5c6cb;
    }
`;
document.head.appendChild(particleStyle);