document.addEventListener('DOMContentLoaded', function () {
    var startTimerBtn = document.getElementById('startTimer');
    var pauseTimerBtn = document.getElementById('pauseTimer');
    var deleteTimerBtn = document.getElementById('deleteTimer');
    var timerInput = document.getElementById('timerInput');

    startTimerBtn.addEventListener('click', function () {
        var timerMinutes = timerInput.value;
        var timerDuration = timerMinutes * 60;
        chrome.runtime.sendMessage({ startTimer: true, duration: timerDuration });
        window.close();
    });

    pauseTimerBtn.addEventListener('click', function () {
        chrome.runtime.sendMessage({ pauseTimer: true });
    });

    deleteTimerBtn.addEventListener('click', function () {
        chrome.runtime.sendMessage({ deleteTimer: true });
    });
});
