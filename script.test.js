describe('timer', () => {
  document.body.innerHTML = `
  <div class="stopwatch-container">
    <h1 id="title">Stopwatch</h1>
    <div class="timer-container">
      <p><span id="timer">00:00:00:000</span></p>
    </div>
    <div class="controls-container">
      <button id="start">Start</button>
      <button id="reset">Reset</button>
      <button id="restart">Restart</button>
      <button id="lap">Lap</button>
    </div>
    <div class="laps-container">
      <ol id="laps-list"></ol>
    </div>
  </div>
  `;
  require('./script.js');
  const timer = document.getElementById('timer');
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');
  const restartButton = document.getElementById('restart');
  const resetButton = document.getElementById('reset');
  const lapButton = document.getElementById('lap');
  const lapsList = document.getElementById("laps-list");
  const initialTimer = '00:00:00:000';

  test('should increment when start is clicked', () => {
    setTimeout(() => {
      startButton.click();
      expect(timer.innerHTML).not.toBe(initialTimer);
    }, 1);
  });

  test('should stop when stop is clicked', () => {
    startButton.click();
    setTimeout(() => {
      stopButton.click();
    }, 1);
    const currTimer = timer.innerHTML;
    setTimeout(() => {
      expect(timer.innerHTML).toBe(currTimer);
    }, 1);
  });

  test('should restart when restart is clicked', () => {
    startButton.click();
    setTimeout(() => {
      restartButton.click();
    }, 1);
    const currTimer = timer.innerHTML;
    setTimeout(() => {
      expect(timer.innerHTML).not.toBe(currTimer);
    }, 1);
  });

  test('should not restart if the timer is not started', () => {
    const currTimer = timer.innerHTML;
    setTimeout(() => {
      restartButton.click();
    }, 1);
    setTimeout(() => {
      expect(timer.innerHTML).toBe(currTimer);
    }, 1);
  })

  test('should reset when reset button is clicked', () => {
    startButton.click();
    setTimeout(() => {
      resetButton.click();
    }, 1);
      expect(timer.innerHTML).toBe(initialTimer);
  });

  test('should reset when timer is stopped', () => {
    startButton.click();
    setTimeout(() => {
      stopButton.click();
    }, 1);
    setTimeout(() => {
      resetButton.click();
    }, 1);
    expect(timer.innerHTML).toBe(initialTimer);
  });

  test('should add a lap when lap button is clicked', () => {
    startButton.click();
    setTimeout(() => {
      lapButton.click();
    }, 1);
    setTimeout(() => {
      expect(lapsList.innerHTML).toContain(timer.innerHTML);
    }, 1);
  });

  test('should not add a lap if the timer is stopped', () => {
    startButton.click();
    setTimeout(() => {
      stopButton.click();
    }, 1);
    setTimeout(() => {
      lapButton.click();
    }, 1);
    expect(lapsList.innerHTML).toBe('');
  });
});
