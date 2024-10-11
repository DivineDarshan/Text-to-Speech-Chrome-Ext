let isProcessing = false;

function handleTextSelection() {
    let selectedText = window.getSelection().toString().trim();

    if (selectedText && !isProcessing) {
        isProcessing = true;
        
        chrome.runtime.sendMessage({
            action: "textSelected",
            text: selectedText
        }, function(response) {
            isProcessing = false;
        });
    } else if (!selectedText && isProcessing) {
        chrome.runtime.sendMessage({
            action: "deselected"
        }, function(response) {
            isProcessing = false;
        });
    }
}

document.addEventListener('mouseup', handleTextSelection);
document.addEventListener('keyup', handleTextSelection);

window.addEventListener('beforeunload', () => {
    chrome.runtime.sendMessage({
        action: "deselected"
    });
});
