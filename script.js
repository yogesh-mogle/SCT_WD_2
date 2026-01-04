let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", toggleStartPause);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", lap);

function toggleStartPause() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
    toggleBtn.textContent = "Pause";
  } else {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    toggleBtn.textContent = "Start";
  }
}

function reset() {
  clearInterval(timerInterval);
  display.textContent = "00:00:00";
  elapsedTime = 0;
  isRunning = false;
  toggleBtn.textContent = "Start";
  laps.innerHTML = "";
}

function lap() {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
}

function updateTime() {
  elapsedTime = Date.now() - startTime;

  let milliseconds = Math.floor((elapsedTime % 1000) / 10);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

  display.textContent =
    `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(unit) {
  return unit < 10 ? "0" + unit : unit;
}

