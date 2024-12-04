// JavaScript to toggle the menu on mobile
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const hamburgerMenu = document.querySelector('.fa-bars');
const cross = document.querySelector('.fa-xmark');
const userName = document.getElementById('user-name');
const greeting = document.getElementById('greeting');
const message = document.getElementById('message');

const meditationAffirmations = [
    "Keep it up.",
    "You can do it.",
    "You are awesome.",
    "Breathe deeply, stay calm.",
    "Trust the process.",
    "Focus on the present moment.",
    "You are strong and capable.",
    "Inner peace is within you.",
    "You are enough.",
    "Stay grounded and centered.",
    "Let go of all worries.",
    "Believe in yourself.",
    "Take it one step at a time.",
    "You have what it takes.",
    "Embrace the now.",
    "Release tension, invite peace.",
    "You are resilient.",
    "Choose positivity.",
    "Inner strength guides you.",
    "This too shall pass.",
    "Gratitude fills your heart.",
    "Stay kind to yourself.",
    "Find joy in small moments.",
    "Patience is your strength.",
    "You are worthy of happiness.",
    "Every breath brings clarity.",
    "You are calm and relaxed.",
    "You are surrounded by peace.",
    "Happiness flows within you.",
    "Life is a beautiful journey.",
    "Accept yourself fully.",
    "Your mind is at ease.",
    "You are in control of your thoughts.",
    "Peace begins with you.",
    "You are open to positive change.",
    "Release and let go.",
    "You deserve love and respect.",
    "Embrace your unique journey.",
    "Every moment is an opportunity.",
    "You are aligned with the universe.",
    "Abundance flows into your life.",
    "Choose love over fear.",
    "You are safe and secure.",
    "Your mind is clear and focused.",
    "Compassion guides your actions.",
    "Success is within your reach.",
    "You radiate positivity.",
    "Challenges make you stronger.",
    "You are filled with gratitude.",
    "Balance and harmony surround you.",
    "You trust yourself completely.",
    "Your energy is limitless.",
    "Happiness is your natural state.",
    "Stay present and connected.",
    "You are at peace with yourself.",
    "Your potential is infinite.",
    "Kindness comes naturally to you.",
    "Every breath brings renewal.",
    "You create your own reality.",
    "You are proud of yourself.",
    "The universe supports you.",
    "You are free from negativity.",
    "Your heart is open to joy.",
    "You shine your light brightly.",
    "Peace flows through every cell.",
    "You are calm, strong, and balanced.",
    "Joy is your birthright.",
    "You attract positivity.",
    "Your mind is your sanctuary.",
    "Every day brings new opportunities.",
    "You trust the journey of life.",
    "You are connected to the universe.",
    "Love and light surround you.",
    "You are the creator of your destiny.",
    "Inner calm is your superpower.",
    "You are grateful for this moment.",
    "Your soul is at peace.",
    "You are fearless and brave.",
    "Your dreams are valid.",
    "Peace is your natural state.",
    "You are confident and capable.",
    "You are open to new beginnings.",
    "You are free to be yourself.",
    "Clarity guides your decisions.",
    "You are a beacon of hope.",
    "You inspire others by being you.",
    "You are open to infinite possibilities.",
    "You radiate love and compassion.",
    "You are a magnet for positivity.",
    "Your inner strength is unshakable.",
    "Peace begins with a deep breath.",
    "You are aligned with your purpose.",
    "Your thoughts are powerful and creative.",
    "You have the power to create change.",
    "You are relaxed and at peace.",
    "Your body and mind are in harmony.",
    "This moment is yours to embrace."
];

setInterval(()=>{
    const affirmation = meditationAffirmations[Math.floor(Math.random() * meditationAffirmations.length)];
    message.innerHTML = affirmation;
},10000)



userName.addEventListener('click', () => {
    // Prompt the user for their name
    let name = prompt('Enter your name:');
    
    // Validate the input and store it
    if (name && name.trim() !== "") {
        localStorage.setItem('userName', name.trim()); // Store the trimmed name
        userName.innerHTML = name.trim(); // Update the UI with the new name
    } else {
        // If input is invalid or canceled, reset the text
        userName.innerHTML = "Enter Name";
        localStorage.removeItem('userName'); // Optionally clear the stored value
    }
});

// Display greeting based on the current time

function displayGreeting() {
    const currentTime = new Date().getHours();
    let greetingMessage;

    if (currentTime >= 6 && currentTime < 12) {
        greetingMessage = "Good Morning";
    } else if (currentTime >= 12 && currentTime < 16) {
        greetingMessage = "Good Afternoon";
    } else if (currentTime>=16 && currentTime<20){
        greetingMessage = "Good Evening";
    }else{
        greetingMessage = "Good Night";
    }

    greeting.innerHTML = `${greetingMessage} , `;
}
document.addEventListener('DOMContentLoaded', displayGreeting);

// Load the name from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedName = localStorage.getItem('userName');
    userName.innerHTML = storedName ? storedName : "User Name";
});

hamburger.addEventListener('click', () => {
    // Toggle the display of the hamburger and cross icon
    // menu.style.right = 0;
    setTimeout(() => {
        hamburgerMenu.style.display = (hamburgerMenu.style.display === 'none') ? 'block' : 'none';
        cross.style.display = (cross.style.display === 'block') ? 'none' : 'block';
        
        // Toggle the menu visibility
        hamburger.classList.toggle('active'); 
        menu.classList.toggle('active');
    },300)
   
});
