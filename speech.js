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
        texts.appendChild(div);
        div.appendChild(p);
    } catch (error) {
        console.error("Error fetching joke:", error);
        speechOutput.textContent = "Oops! Couldn't load a joke.";
    }
}


        const API_KEY = "AIzaSyAWpTTxYLv56fEHa0eBw_z8veeXAB6yb4U";
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        document.getElementById("generateTrip").addEventListener("click", async function () {
          const destination = document.getElementById("Destination").value.trim();
          const startDate = document.getElementById("Start-Date").value;
          const endDate = document.getElementById("End-Date").value;
      
          if (!destination || !startDate || !endDate) {
              alert("Please fill all fields!");
              return;
          }
      
          const loading = document.getElementById("loading");
          const itineraryBox = document.getElementById("itinerary");
      
          // Show the loading indicator
          loading.style.display = "block";
          itineraryBox.style.display = "none";
      
          const prompt = `Create a detailed day-by-day trip itinerary for a vacation to ${destination} from ${startDate} to ${endDate}. Format the output in HTML tags with headings for each day, lists for recommendations, and include vibrant inline styling for colors.`;
      
          try {
              const result = await model.generateContent(prompt);
              
          } catch (error) {
              console.error("Error generating itinerary:", error);
              loading.style.display = "none";
              alert("Failed to generate itinerary. Please try again.");
          }
      });
      

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
function respondToCommand(command) {
    console.log(command);
 
    
    if (command.includes('hello')) {
        speechOutput.textContent = 'Hello! How can I assist you today?';
        const div = document.createElement('div');
    div.className="text-div";
    const p = document.createElement('p');
    p.className="text-p";
    p.innerText = " ";

    texts.appendChild(div);
    div.appendChild(p);
    } else if (command.includes('open google')) {
        window.open('https://www.google.com', '_blank');
        const div = document.createElement('div');
        div.className="text-div";
        const p = document.createElement('p');
        p.className="text-p";
        p.innerText = " ";
    
        texts.appendChild(div);

    } else if (command.includes('open youtube')) {
        window.open('https://www.youtube.com', '_blank');
        const div = document.createElement('div');
        div.className="text-div";
        const p = document.createElement('p');
        p.className="text-p";
        p.innerText = " ";
    
        texts.appendChild(div);
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
