chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.storage.local.set({ timerRunning: false });
        chrome.browserAction.setBadgeText({ text: '' });
        chrome.browserAction.setBadgeBackgroundColor({ color: [190, 190, 190, 230] });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.startTimer) {
        chrome.storage.local.set({ timerRunning: true });
        chrome.browserAction.setBadgeText({ text: '5:00' });
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 230] });
        var timer = 300;
        var intervalId = setInterval(function () {
            timer--;
            var minutes = Math.floor(timer / 60);
            var seconds = timer % 60;
            var text = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            chrome.browserAction.setBadgeText({ text: text });
            if (timer === 0) {
                clearInterval(intervalId);
                chrome.windows.create({
                    'url': 'alert.html',
                    'type': 'popup',
                    'width': 250,
                    'height': 150
                });
                chrome.storage.local.set({ timerRunning: false });
                chrome.browserAction.setBadgeText({ text: '' });
                chrome.browserAction.setBadgeBackgroundColor({ color: [190, 190, 190, 230] });
            }
        }, 1000);
    } else if (request.restartTimer) {
        chrome.storage.local.set({ timerRunning: false });
        chrome.runtime.sendMessage({ startTimer: true });
    }
});