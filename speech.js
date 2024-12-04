import { GoogleGenerativeAI } from "@google/generative-ai";

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
const voiceSelect = document.getElementById('voiceSelect');

// Populate the dropdown with available voices
function populateVoiceList() {
    const voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Ensure voices are loaded (some browsers load asynchronously)
speechSynthesis.onvoiceschanged = populateVoiceList;

// Use the selected voice for speech synthesis
function speakResponse(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Default language
    utterance.rate = 1; // Speed of speech
    utterance.pitch = 1; // Pitch of the voice

    // Set the selected voice
    const selectedVoiceName = voiceSelect.value;
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    // Speak the text
    speechSynthesis.speak(utterance);
}




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
        const div = document.createElement('div');
        div.className="text-div";
        const p = document.createElement('p');
        p.className="text-p";
        p.innerText = `${data[0].joke} 😂😂`;
        div.style.justifyContent= "flex-start";
        texts.appendChild(div);
        div.appendChild(p);
       speakResponse(data[0].joke)

    } catch (error) {
        console.error("Error fetching joke:", error);
        speechOutput.textContent = "Oops! Couldn't load a joke.";
    }
}


        const API_KEY = "AIzaSyAWpTTxYLv56fEHa0eBw_z8veeXAB6yb4U";
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        
      

// Initialize speech recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = false;

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
    const div = document.createElement('div');
    div.className="text-div";
    const p = document.createElement('p');
    p.className="text-p";
    p.innerText = text;

    texts.appendChild(div);
    div.appendChild(p);
    

    
    // Respond to specific speech commands
    respondToCommand(text.toLowerCase());
});

// Function to respond to specific commands
// Function to respond to specific commands
function respondToCommand(command) {
    let responseText = "";

    if (command.includes('hello')) {
        responseText = 'Hello! How can I assist you today?';
    } else if (command.includes('open google')) {
        responseText = 'Opening Google.';
        window.open('https://www.google.com', '_blank');
    } else if (command.includes('open youtube')) {
        responseText = 'Opening YouTube.';
        window.open('https://www.youtube.com', '_blank');
    } else if (command.includes('open twitter')) {
        responseText = 'Opening Twitter.';
        window.open('https://www.twitter.com', '_blank');
    } else if (command.includes('open facebook')) {
        responseText = 'Opening Facebook.';
        window.open('https://www.facebook.com', '_blank');
    } else if (command.includes('open instagram')) {
        responseText = 'Opening Instagram.';
        window.open('https://www.instagram.com', '_blank');
    } else if (command.includes('open github')) {
        responseText = 'Opening GitHub.';
        window.open('https://www.github.com', '_blank');
    } else if (command.includes('open w3schools')) {
        responseText = 'Opening W3Schools.';
        window.open('https://www.w3schools.com', '_blank');
    } else if (command.includes('open stackoverflow')) {
        responseText = 'Opening StackOverflow.';
        window.open('https://www.stackoverflow.com', '_blank');
    } else if (command.includes('open spotify')) {
        responseText = 'Opening Spotify.';
        window.open('https://www.spotify.com', '_blank');
    } else if (command.includes('open wikipedia')) {
        responseText = 'Opening Wikipedia.';
        window.open('https://www.wikipedia.org', '_blank');
    } else if (command.includes('tell me a joke')) {
        getJoke(); // Fetch a joke dynamically
        return; // Exit since the joke function handles the response
    } else if (command.includes('what is the time')) {
        const currentTime = new Date().toLocaleTimeString();
        responseText = `The current time is ${currentTime}.`;
    } else if (command.trim().length > 0) {
        ai(command);
        return; // Exit as the AI handles the response
    } else {
        responseText = 'Sorry, I didn’t understand that. Can you try again?';
    }

    // Display the response text
    speechOutput.textContent = responseText;

    // Add response to the chat display
    const div = document.createElement('div');
    div.className = "text-div";
    const p = document.createElement('p');
    p.className = "text-p";
    p.innerText = responseText;
    div.style.justifyContent= "flex-start";

    texts.appendChild(div);
    div.appendChild(p);

    // Speak the response text
    speakResponse(responseText);
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
async function ai(command) {
    const prompt = `${command}`;
    try {
        const result = await model.generateContent(prompt);
        const aiResponse = result.response.text();
        
        console.log(aiResponse);

        // Add AI response to the chat display
        const div = document.createElement('div');
        div.className = "text-div";
        const p = document.createElement('p');
        p.className = "text-p";
        p.innerText = aiResponse;
        div.style.justifyContent= "flex-start";

        texts.appendChild(div);
        div.appendChild(p);

        // Speak the AI response
        speakResponse(aiResponse);
    } catch (error) {
        console.error("Error:", error);
        const errorMessage = "Failed to generate a response. Please try again.";
        speechOutput.textContent = errorMessage;
        speakResponse(errorMessage);
    }
}


