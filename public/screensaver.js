let sentences = [];
let currentIndex = 0;
let intervalId;
let screensaverActive = false;

const screensaver = document.getElementById('screensaver');
const box = document.getElementById('sentence-box');

const fonts = [
    "Font1","Font2","Font3","Font4","Font5",
    "Font6","Font7","Font8","Font9","Font10",
    "Font11","Font12","Font13","Font14","Font15",
    "Font16","Font17","Font18","Font19","Font20",
    "Font21","Font22","Font23","Font24","Font25",
    "Font26","Font27","Font28"
];

// Load sentences
fetch('text-1.txt')
    .then(res => res.text())
    .then(data => {
        sentences = data.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 0);
    });

// Screensaver logic
function startScreensaver() {
    if (!sentences.length) return;
    screensaverActive = true;
    screensaver.style.display = 'flex';
    currentIndex = 0;

    // Show first sentence
    box.textContent = sentences[currentIndex];
    box.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
    screensaver.classList.add('dark');

    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % sentences.length;
        box.textContent = sentences[currentIndex];
        box.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];

        // Full inversion
        if (screensaver.classList.contains('dark')) {
            screensaver.classList.remove('dark');
            screensaver.classList.add('light');
        } else {
            screensaver.classList.remove('light');
            screensaver.classList.add('dark');
        }
    }, 500);
}

function stopScreensaver() {
    if (screensaverActive) {
        clearInterval(intervalId);
        screensaverActive = false;
        screensaver.style.display = 'none';
    }
}

// Inactivity detection — 5 seconds
let timeoutId;
function resetTimer() {
    stopScreensaver(); // hide if active
    clearTimeout(timeoutId);
    timeoutId = setTimeout(startScreensaver, 5000); // show after 5s idle
}

// Events that reset inactivity timer
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);
document.addEventListener('scroll', resetTimer);

// Start the timer immediately
resetTimer();