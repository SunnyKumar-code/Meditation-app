// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const hamburgerMenu = document.querySelector('.fa-bars');
const cross = document.querySelector('.fa-xmark');

hamburger.addEventListener("click", () => {
    hamburgerMenu.style.display = hamburgerMenu.style.display === "none" ? "block" : "none";
    cross.style.display = cross.style.display === "block" ? "none" : "block";
    menu.classList.toggle("active");
});

// Elements for speech recognition
const micButton = document.getElementById('micButton');
const speechDisplay = document.getElementById('speechDisplay');
const task = document.getElementById('task');
const texts = document.getElementById('texts');
const speechOutput = document.getElementById('speechOutput');

// Joke Fetching Function
async function getJoke() {
    const header = {
        headers: { 'X-Api-Key': 'VDcV5lUlgPP1X3kCkfSQog==QgeCVnr0Mcu7a5Rp' },
    };
    const url = 'https://api.api-ninjas.com/v1/dadjokes';

    try {
        const res = await fetch(url, header);
        const data = await res.json();
        speechOutput.textContent = `${data[0].joke} 😂😂`;
    } catch (error) {
        console.error("Error fetching joke:", error);
        speechOutput.textContent = "Oops! Couldn't load a joke.";
    }
}

// Initialize speech recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

// Start speech recognition when mic button is clicked
micButton.addEventListener('click', () => {
    if (recognition && recognition.recognizing) {
        recognition.stop(); // Stop if it's already running
        return;
    }

    task.style.display = 'none';
    texts.style.display = 'flex';
    micButton.style.backgroundColor = 'red';
    micButton.style.boxShadow = '0px 4px 10px rgba(255, 0, 0, 0.4)';
    speechDisplay.style.display = 'block';
    speechOutput.textContent = 'Listening...';
    recognition.start();
});

// Listen for speech recognition results
recognition.addEventListener('result', (event) => {
    const text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    speechOutput.textContent = text;

    // Respond to specific speech commands
    respondToCommand(text.toLowerCase());
});

// Function to respond to specific commands
function respondToCommand(command) {
    console.dir(texts);
    
    if (command.includes('hello')) {
        speechOutput.textContent = 'Hello! How can I assist you today?';
    } else if (command.includes('open google')) {
        window.open('https://www.google.com', '_blank');
    } else if (command.includes('open youtube')) {
        window.open('https://www.youtube.com', '_blank');
    } else if (command.includes('tell me a joke')) {
        getJoke(); // Fetch a joke dynamically
    } else if (command.includes('tell me a quote')) {
        speechOutput.textContent = 'The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt';
    } else if (command.includes('what is the time')) {
        const currentTime = new Date().toLocaleTimeString();
        speechOutput.textContent = `The current time is ${currentTime}.`;
    } else {
        speechOutput.textContent = 'Sorry, I didn’t understand that. Can you try again?';
    }
}

// Handle speech recognition end
recognition.addEventListener('end', () => {
    micButton.style.backgroundColor = '#00ff00';
    micButton.style.boxShadow = '0px 4px 10px rgba(0, 255, 0, 0.4)';
    speechOutput.textContent = 'Tap the mic to start again.';
});

// Handle errors
recognition.addEventListener('error', (event) => {
    speechOutput.textContent = 'Sorry, I couldn’t hear you. Please try again.';
});
