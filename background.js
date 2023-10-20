let timerInterval;
let timerDuration;
let timerRunning = false;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.startTimer) {
        timerDuration = request.duration || 300;
        timerRunning = true;
        startTimer();
    }

    if (request.pauseTimer) {
        timerRunning = !timerRunning;
        if (timerRunning) {
            startTimer();
        } else {
            clearInterval(timerInterval);
        }
    }

    if (request.deleteTimer) {
        clearInterval(timerInterval);
        chrome.browserAction.setBadgeText({ text: '' });
        timerRunning = false;
    }
});

function startTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerInterval = setInterval(function () {
            timerDuration--;
            chrome.browserAction.setBadgeText({ text: formatTime(timerDuration) });
            if (timerDuration === 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                chrome.browserAction.setBadgeText({ text: '' });
                chrome.windows.create({ url: 'alert.html', type: 'popup', width: 200, height: 200 });
            }
        }, 1000);
    }
}
