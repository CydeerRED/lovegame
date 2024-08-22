const loginContainer = document.getElementById('loginContainer');
const genderContainer = document.getElementById('genderContainer');
const gameContainer = document.getElementById('gameContainer');
const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const bigHeart = document.getElementById('bigHeart');

let messages = [];
let loveLevel = 0;
let aiMessagesToday = 0;
const maxAIMessagesPerDay = 3;
const allowedPassword = "yourPassword123"; // Replace with your own password
let userGender = null;

// Login system
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    if (password === allowedPassword) {
        loginContainer.style.display = 'none';
        genderContainer.style.display = 'block';
    } else {
        alert('كلمة المرور غير صحيحة');
    }
});

// Gender selection
function selectGender(gender) {
    userGender = gender;
    genderContainer.style.display = 'none';
    gameContainer.style.display = 'block';
}

// Function to add a message to the chat
function addMessage(content, sender) {
    const sanitizedContent = sanitizeMessage(content);
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${sanitizedContent}`;
    messageElement.classList.add('message');
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    messages.push({ content: sanitizedContent, sender });

    detectLove();
}

// Function to detect love based on chat frequency
function detectLove() {
    loveLevel += 10;
    updateHeart();
}

// Function to update the big heart's fill based on love level
function updateHeart() {
    if (loveLevel >= 50) {
        bigHeart.classList.add('filled');
    }
}

// AI Response based on chat
function aiResponse() {
    if (aiMessagesToday >= maxAIMessagesPerDay) return;

    const responses = [
        "يبدو أنكما تتفاهمان جيدًا!",
        "هل هذه بداية حب؟",
        "أعتقد أنكما تستمتعان بالمحادثة.",
        "ما أجمل الحب بينكما!"
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addMessage(randomResponse, 'AI');
    aiMessagesToday++;
}

// Sanitize message to detect and blur social media usernames or phone numbers
function sanitizeMessage(message) {
    const socialMediaRegex = /(@[a-zA-Z0-9_]{1,15})|(\d{10,})/g; // Simple regex for @username or phone numbers
    if (socialMediaRegex.test(message)) {
        displayWarning();
        return '[محتوى محظور]';
    }
    return message;
}

// Display a warning message
function displayWarning() {
    const warningElement = document.createElement('div');
    warningElement.textContent = 'تحذير: لا يُسمح بمشاركة معلومات حساسة مثل أرقام الهاتف أو أسماء مستخدمي وسائل التواصل الاجتماعي!';
    warningElement.classList.add('warning');
    chatWindow.appendChild(warningElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
        chatWindow.removeChild(warningElement);
    }, 5000); // Remove the warning after 5 seconds
}

// Handle form submission
chatForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, userGender === 'ذكر' ? 'هو' : 'هي');
        messageInput.value = '';

        // Simulate AI response
        setTimeout(() => aiResponse(), 1000);
    }
});

// Simulate filling the heart when users start to like each other
function simulateLoveDetection() {
    bigHeart.classList.add('filled');
}

setTimeout(simulateLoveDetection, 20000);
