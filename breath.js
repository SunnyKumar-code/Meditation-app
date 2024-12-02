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

// Select buttons and exercise divs

const startButtonLight = document.querySelector(".start-button2");
const deepBrathexDiv = document.querySelector(".deep-brathex");






// Text cycles for breathing exercises


// Function to start breathing exercises

// Close exercise divs
// closeIcons.forEach(icon => {
//     icon.addEventListener("click", () => {
//         const div = icon.closest("div");
//         div.style.display = "none";
//         clearInterval(div.getAttribute("data-intervalId"));
//     });
// });






const startButtonDeep = document.getElementById('startButtonDeep');


function startExercise1() {
    // Apply animation to the breathing circle
    deepBrathexDiv.style.display="flex";
    const breathCircle = document.querySelector('.breathing-circle');
    breathCircle.style.animation = 'breathe 12s linear infinite';
    console.log("Deep breathing exercise started.");
    // Start text cycle for deep breathing exercise
    let deepBreathCycle =['Inhale','Hold','Exhale'];
    const circletext= document.querySelector('.breathing-circle')
    let cycleIndex = 0;
    const intervalId = setInterval(() => {
        cycleIndex = (cycleIndex + 1) % deepBreathCycle.length;
        circletext.textContent = deepBreathCycle[cycleIndex];
    }, 4000);

    deepBrathexDiv.setAttribute("data-intervalId", intervalId);
    const closeIcons = document.querySelector(".close-icon");
    closeIcons.addEventListener("click", () => {
        deepBrathexDiv.style.display = "none"
        clearInterval(intervalId)
    
    })


circletext.textContent = "Inhale";

}

// Add event listener to start button for Deep Breathing
startButtonDeep.addEventListener("click", () => {
    startExercise1();
});

const fourSevenEightDiv = document.querySelector(".four-seven-eight");
const startButton478 = document.getElementById("startButton478");

function start478Exercise() {
    // Show the breathing modal
    fourSevenEightDiv.style.display = "flex";
    const breathCircle = document.querySelector(".breathing-circle1");
    breathCircle.style.animation = "breathe478 19s linear infinite";
    console.log("4-7-8 breathing exercise started.");
    const circleText = document.querySelector(".circle-text1");
    const timerDisplay = document.querySelector(".timer1");

    // Define the 4-7-8 breathing cycle
    const breathCycle = [
        { text: "Inhale", duration: 4 },
        { text: "Hold", duration: 7 },
        { text: "Exhale", duration: 8 },
    ];

    let cycleIndex = 0;
    let intervalId; // Declare intervalId here

    function updateCycle() {
        const { text, duration } = breathCycle[cycleIndex];
        circleText.textContent = text;

        // Start the timer for the current phase
        let remainingTime = duration;
        timerDisplay.textContent = remainingTime;

        intervalId = setInterval(() => {
            remainingTime--;
            timerDisplay.textContent = remainingTime;
            if (remainingTime === 0) {
                clearInterval(intervalId); // Clear the interval for the current phase
                cycleIndex = (cycleIndex + 1) % breathCycle.length;
                updateCycle(); // Move to the next phase
            }
        }, 1000);
    }

    updateCycle();

    // Add event listener for close button
    const closeIcon = document.querySelector("#close-icon");
    closeIcon.addEventListener("click", () => {
        // Stop the exercise and hide the modal
        fourSevenEightDiv.style.display = "none";
        clearInterval(intervalId); // Stop the timer
        breathCircle.style.animation = "none"; // Stop the animation
        console.log("4-7-8 breathing exercise closed.");
    });
}


// Add event listener to start button for 4-7-8 breathing
startButton478.addEventListener("click", () => {
    start478Exercise();
});