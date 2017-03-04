chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'create_warning') {
        chrome.tabs.create({
            url: chrome.extension.getURL('triggerwarning.html'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true
                // incognito, top, left, ...
            });
            chrome.runtime.sendMessage({type: "fill_warning_page", "triggers":request.triggers, "num":request.num})
        });
    }
});
function goback(){
    window.history.back();
}
