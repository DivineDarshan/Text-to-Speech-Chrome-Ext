# Text-to-Speech-Chrome-Ext# Text-to-Speech Chrome Extension

A Chrome extension that automatically reads selected text aloud from any webpage, with intelligent voice selection and immediate stop functionality when text is deselected.

## Features

- 🎯 Instant text-to-speech conversion of selected text
- 🛑 Automatic speech stopping when text is deselected
- 🗣️ Optimized for Indian English voice (falls back to other English voices if unavailable)
- 🔄 Handles multiple selections seamlessly
- 🎚️ Customized speech settings for clarity
- 🔍 Works on any webpage

## Installation

1. Clone this repository:
```bash
git clone https://github.com/DivineDarshan/text-to-speech-chrome-ext
```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Select any text on any webpage
2. The extension will automatically start reading the selected text
3. Deselect the text or select different text to stop the current reading
4. Close the tab to stop speech immediately

## Technical Details

The extension consists of three main components:

- **Background Script**: Manages the core text-to-speech functionality and voice selection
- **Content Script**: Handles text selection events and communicates with the background script
- **Manifest**: Defines extension permissions and configuration

### Voice Settings

- Speech Rate: 0.9 (90% of normal speed)
- Pitch: 1.1 (slightly higher than normal)
- Volume: 1.0 (maximum)
- Voice Selection: Prioritizes Indian English voices, with fallback to GB/US English

## Permissions

The extension requires minimal permissions:
- `activeTab`: To access the current tab's content
- `tabs`: To manage speech when tabs are closed

## Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests on the [GitHub repository](https://github.com/DivineDarshan/text-to-speech-chrome-ext).

## License

MIT License

## Author

Created and maintained by [DivineDarshan](https://github.com/DivineDarshan)
