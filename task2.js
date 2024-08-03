let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1);
        startStopButton.innerHTML = 'Pause';
        running = true;
    }
}

function pauseStopwatch() {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    startStopButton.innerHTML = 'Resume';
    running = false;
}

function resetStopwatch() {
    clearInterval(tInterval);
    display.innerHTML = '00:00:00';
    startStopButton.innerHTML = 'Start';
    difference = 0;
    running = false;
    lapsContainer.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    let lapTime = display.innerHTML;
    let lapDiv = document.createElement('div');
    lapDiv.innerText = `Lap ${lapsContainer.childElementCount + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapDiv);
}

startStopButton.addEventListener('click', function() {
    if (!running) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
});

resetButton.addEventListener('click', function() {
    resetStopwatch();
});

lapButton.addEventListener('click', function() {
    if (running) {
        recordLap();
    }
});
