const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startIndex = html.indexOf('window.toggleCursorSettings = function() {');
const endIndex = html.indexOf('})();', startIndex) + 5;

if (startIndex > -1 && endIndex > -1) {
    const replacement = `window.addEventListener('DOMContentLoaded', () => {
        const savedAudioEnabled = localStorage.getItem('audioEnabled');
        if (savedAudioEnabled !== null) {
            document.getElementById('audioToggle').checked = savedAudioEnabled === 'true';
        }
        
        const savedAudioPack = localStorage.getItem('audioPack');
        if (savedAudioPack) {
            document.getElementById('audioPack').value = savedAudioPack;
        }

        window.updateAudioSettings(true);
    });`;
    
    html = html.substring(0, startIndex) + replacement + html.substring(endIndex);
    fs.writeFileSync('index.html', html);
    console.log('Fixed cursor crash');
} else {
    console.log('Could not find cursor logic bounds');
}
