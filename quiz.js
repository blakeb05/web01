// Quiz functionality with romantic questions leading to proposal
const quizData = [
    {
        question: "What was the first thing you noticed about me?",
        answers: [
            "Your beautiful smile 😊",
            "Your kind eyes 👁️",
            "Your amazing laugh 😄",
            "Your wonderful personality ✨"
        ]
    },
    {
        question: "Which moment made you realize you had feelings for me?",
        answers: [
            "Our first deep conversation 💭",
            "When you helped me during a difficult time 🤝",
            "Our first date together 💕",
            "When I saw how you care for others 💖"
        ]
    },
    {
        question: "What's your favorite memory of us together?",
        answers: [
            "Our romantic dinner under the stars 🌙",
            "When we got caught in the rain and laughed 🌧️",
            "Our spontaneous adventure day 🎡",
            "Just talking for hours about everything 💬"
        ]
    },
    {
        question: "What do you love most about our relationship?",
        answers: [
            "How comfortable we are with each other 🏠",
            "The way we support each other's dreams 🌟",
            "Our inside jokes and shared laughter 😂",
            "How we can be completely ourselves 💯"
        ]
    },
    {
        question: "If you could describe our love in one word, what would it be?",
        answers: [
            "Magical ✨",
            "Eternal ♾️",
            "Beautiful 🌹",
            "Perfect 💖"
        ]
    },
    {
        question: "What do you see in our future together?",
        answers: [
            "Adventures around the world 🌍",
            "A cozy home filled with love 🏡",
            "Growing old together gracefully 👫",
            "Creating beautiful memories every day 📸"
        ]
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
    
    // Pre-select previous answer if going back
    if (userAnswers[currentQuestion] !== undefined) {
        const selectedButton = questionContainer.querySelector(`[data-index="${userAnswers[currentQuestion]}"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
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
    userAnswers[currentQuestion] = answerIndex;
    
    // Update button states
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((btn, index) => {
        btn.classList.remove('selected');
        if (index === answerIndex) {
            btn.classList.add('selected');
        }
    });
    
    // Show next button
    document.getElementById('nextBtn').style.display = 'inline-block';
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
`;
document.head.appendChild(particleStyle);