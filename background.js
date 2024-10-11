const speechSynth = window.speechSynthesis;
let currentUtterance = null;
let isSpeaking = false;
let currentTabId = null;

function getIndianEnglishVoice() {
    const voices = speechSynth.getVoices();
    if (!voices || voices.length === 0) return null;

    let indianVoice = voices.find(voice => 
        (voice.lang === 'en-IN') || 
        (voice.name.includes('Indian')) || 
        (voice.lang === 'en-GB') || 
        (voice.lang === 'en-US')
    );
    
    return indianVoice || voices[0];
}

function stopSpeechImmediately() {
    if (speechSynth.speaking) {
        speechSynth.cancel();
    }
    if (currentUtterance) {
        currentUtterance = null;
    }
    isSpeaking = false;
    currentTabId = null;
    console.log("Speech stopped immediately");
}

function startSpeaking(text, tabId) {
    stopSpeechImmediately();
    
    try {
        currentUtterance = new SpeechSynthesisUtterance(text);
        currentTabId = tabId;

        currentUtterance.rate = 0.9;
        currentUtterance.pitch = 1.1;
        currentUtterance.volume = 1.0;

        const selectedVoice = getIndianEnglishVoice();
        if (selectedVoice) {
            currentUtterance.voice = selectedVoice;
        }

        currentUtterance.onstart = () => {
            isSpeaking = true;
            console.log("Started speaking");
        };

        currentUtterance.onend = () => {
            stopSpeechImmediately();
            console.log("Finished speaking");
        };

        currentUtterance.onerror = (event) => {
            console.error("Speech error:", event);
            stopSpeechImmediately();
        };

        speechSynth.speak(currentUtterance);
        return true;
    } catch (error) {
        console.error("Error starting speech:", error);
        stopSpeechImmediately();
        return false;
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case "textSelected":
            const success = startSpeaking(request.text, sender.tab.id);
            sendResponse({ success: success });
            break;
            
        case "deselected":
            stopSpeechImmediately();
            sendResponse({ success: true });
            break;
            
        case "checkStatus":
            sendResponse({ isSpeaking: speechSynth.speaking });
            break;
    }
    return true;
});

chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabId === currentTabId) {
        stopSpeechImmediately();
    }
});

let isProcessing = false;
let lastSelectedText = "";

function stopSpeech() {
    chrome.runtime.sendMessage({ action: "deselected" }, () => {
        isProcessing = false;
    });
}

function handleTextSelection(event) {
    const selectedText = window.getSelection().toString().trim();
    
    if (!selectedText || selectedText !== lastSelectedText) {
        // Always stop current speech first
        stopSpeech();
        
        if (selectedText && !isProcessing) {
            isProcessing = true;
            lastSelectedText = selectedText;
            
            chrome.runtime.sendMessage({
                action: "textSelected",
                text: selectedText
            }, (response) => {
                if (!response.success) {
                    isProcessing = false;
                    lastSelectedText = "";
                }
            });
        } else {
            lastSelectedText = "";
        }
    }
}

document.addEventListener('mouseup', handleTextSelection);
document.addEventListener('keyup', handleTextSelection);
document.addEventListener('selectionchange', () => {
    if (!window.getSelection().toString().trim()) {
        stopSpeech();
    }
});

window.addEventListener('beforeunload', () => {
    stopSpeech();
});

setInterval(() => {
    if (!window.getSelection().toString().trim() && isProcessing) {
        stopSpeech();
    }
}, 100);

