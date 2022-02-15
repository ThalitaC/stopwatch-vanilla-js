const timer = document.getElementById("timer");
const initialTimer = "00:00:00:000";
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const restartButton = document.getElementById("restart");
const lapsButton = document.getElementById("lap");
const lapsList = document.getElementById("laps-list");
let elapsedTime = 0;
let interval;

function formatTimer(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let miliseconds = Math.floor((time % 60000) % 1000);
  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);
  miliseconds = ("00" + miliseconds).slice(-3);
  timer.innerHTML = `${hours}:${minutes}:${seconds}:${miliseconds}`;
};

function incrementTimer() {
  let startTime = Date.now() - elapsedTime;
  interval = setInterval(function () {
    let time = Date.now() - startTime;
    elapsedTime = time;
    timerFormat(elapsedTime);
  }, 1);
};

function startStopTimer() {
  if ( timer.innerHTML === initialTimer || startButton.innerHTML === "Start") {
    incrementTimer();
    startButton.innerHTML = "Stop";
    startButton.id = "stop";
  } else {
    clearInterval(interval);
    startButton.innerHTML = "Start";
    startButton.id = "start";
  }
};

function logLaps() {
  if ( timer.innerHTML === initialTimer || startButton.innerHTML === "Start") {
    return;
  }
  let li = document.createElement("li");
  li.innerHTML = timer.innerHTML;
  lapsList.appendChild(li);
};

function resetTimerAndLaps() {
  clearInterval(interval);
  startButton.innerHTML = "Start";
  timer.innerHTML = initialTimer;
  lapsList.innerHTML = "";
  startButton.id = "start";
  elapsedTime = 0;
};

function restartTimer() {
  if (timer.innerHTML === initialTimer) {
    return;
  } else {
  reset();
  startStop();
  }
}

startButton.addEventListener("click", startStopTimer);
resetButton.addEventListener("click", resetTimerAndLaps);
restartButton.addEventListener("click", restartTimer);
lapsButton.addEventListener("click", logLaps);
