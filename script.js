let timer = document.getElementById("timer");
let startButton = document.getElementById("start");
let resetButton = document.getElementById("reset");
let restartButton = document.getElementById("restart");
let lapsButton = document.getElementById("lap");
let lapsList = document.getElementById("laps-list");
let elapsedTime = 0;
let interval;

function timerFormat(time) {
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
    console.log(time);
    elapsedTime = time;
    timerFormat(elapsedTime);
  }, 1);
};

function startStop() {
  if ( timer.innerHTML === "00:00:00:000" || startButton.innerHTML === "Start") {
    incrementTimer();
    startButton.innerHTML = "Stop";
    startButton.id = "stop";
  } else {
    clearInterval(interval);
    startButton.innerHTML = "Start";
    startButton.id = "start";
  }
};

function laps() {
  if(timer.innerHTML === "00:00:00:000") {
    lapsList.innerHTML = "";
  } else {
    let lap = document.createElement("li");
    lap.innerHTML = timer.innerHTML;
    lapsList.appendChild(lap);
  }
};

function reset() {
  clearInterval(interval);
  startButton.innerHTML = "Start";
  timer.innerHTML = "00:00:00:000";
  lapsList.innerHTML = "";
  startButton.id = "start";
  elapsedTime = 0;
};

function restart() {
  if (startButton.innerHTML === "Start") {
    return;
  } else {
  reset();
  startStop();
  }
}

startButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
restartButton.addEventListener("click", restart);
lapsButton.addEventListener("click", laps);
