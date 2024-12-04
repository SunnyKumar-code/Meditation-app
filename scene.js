const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const hamburgerMenu = document.querySelector('.fa-bars');
const cross = document.querySelector('.fa-xmark');

hamburger.addEventListener("click", () => {
    hamburgerMenu.style.display = hamburgerMenu.style.display === "none" ? "block" : "none";
    cross.style.display = cross.style.display === "block" ? "none" : "block";
    menu.classList.toggle("active");
});

// Function to reset and play video/audio
function playVideoAndAudio(videoSrc, audioSrc, title) {
    const backgroundVideo = document.querySelector('.background-video');
    const videoElement = backgroundVideo.querySelector('source');
    const titleElement = document.querySelector('.timer p');
    const backgroundAudio = document.querySelector('.background-audio');
    
    // Reset the video and audio sources
    videoElement.setAttribute('src', videoSrc);
    backgroundAudio.setAttribute('src', audioSrc);
    titleElement.textContent = title;

    // Reload the video and audio
    backgroundVideo.load(); 
    backgroundAudio.load();

    // Show the background video and audio
    backgroundVideo.style.display = 'block';
    backgroundAudio.style.display = 'block';

    // Play the video and audio
    backgroundVideo.play(); 
    backgroundAudio.play();

    // Hide other content (scene container)
    document.querySelector('.scene-container').style.display = 'none';
    pauseTimer();
}

// Close Video and Audio Functionality
function closeVideoAndAudio() {
    const backgroundVideo = document.querySelector('.background-video');
    const backgroundAudio = document.querySelector('.background-audio');
    const backgroundContainer = document.querySelector('.background-container');

    // Pause the video and audio
    backgroundVideo.pause();
    backgroundAudio.pause();

    // Reset the video and audio sources
    backgroundVideo.style.display = 'none';
    backgroundAudio.style.display = 'none';

    // Show scene container again
    document.querySelector('.scene-container').style.display = 'flex';

    // Hide the background container
    backgroundContainer.style.display = 'none';

    // Reset timer if running
    pauseTimer();
    resetTimerDisplay();
}

// Scene Click Event Handler
document.querySelectorAll('.scene-content').forEach((scene) => {
    scene.addEventListener('click', () => {
        const videoSrc = scene.getAttribute('data-video');
        const audioSrc = scene.getAttribute('data-audio');
        const title = scene.getAttribute('data-title');

        // Display the close button
        document.querySelector('.close-btn').style.display = 'flex';

        // Play video and audio
        playVideoAndAudio(videoSrc, audioSrc, title);

        // Show the background container
        document.querySelector('.background-container').style.display = 'block';
    });
});

// Close Button Functionality
document.querySelector('.close-btn').addEventListener('click', closeVideoAndAudio);

// Timer Functionality
const playButton = document.querySelector('.play-btn-bg');
const pauseButton = document.querySelector('.pause-btn-bg');
const timerOptions = document.querySelectorAll('.timer-option');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const audioElement = document.getElementById('timer-audio');

let countdownTimer; // To hold the timer interval
let timeRemaining = 0; // Time in seconds
let isRunning = false; // Timer state

// Function to update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

// Function to start the timer and control video/audio
function startTimer() {
    if (timeRemaining <= 0) return;

    isRunning = true;

    countdownTimer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(countdownTimer);
            isRunning = false;
            playButton.style.display = 'inline-block';
            pauseButton.style.display = 'none';
            audioElement.play(); // Play notification audio when timer ends

            // Pause video and audio when timer ends
            const backgroundVideo = document.querySelector('.background-video');
            const backgroundAudio = document.querySelector('.background-audio');
            backgroundVideo.pause();
            backgroundAudio.pause();
        }
    }, 1000);
    

    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';

    // Start video and audio playback
    const backgroundVideo = document.querySelector('.background-video');
    const backgroundAudio = document.querySelector('.background-audio');
    backgroundVideo.play();
    backgroundAudio.play();
}

// Function to pause the timer and video/audio
function pauseTimer() {
    clearInterval(countdownTimer);
    isRunning = false;

    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';

    // Pause video and audio playback
    const backgroundVideo = document.querySelector('.background-video');
    const backgroundAudio = document.querySelector('.background-audio');
    backgroundVideo.pause();
    backgroundAudio.pause();
}

// Function to reset the timer display
function resetTimerDisplay() {
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
}

// Event listeners for timer options
timerOptions.forEach(option => {
    option.addEventListener('click', () => {
        if (isRunning) return; // Prevent changing time while running

        // Set timeRemaining based on selected option
        timeRemaining = parseInt(option.getAttribute('data-time')) * 60;
        updateTimerDisplay();

        // Start the timer and video/audio
        startTimer();
    });
});

// Event listener for play button
playButton.addEventListener('click', startTimer);

// Event listener for pause button
pauseButton.addEventListener('click', pauseTimer);
