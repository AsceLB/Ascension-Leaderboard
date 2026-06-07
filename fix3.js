const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove border-radius: 0 !important to restore the circular crop of icons
const badCSS = `            mix-blend-mode: screen !important;
            filter: contrast(1.5) brightness(0.9) !important;
            border-radius: 0 !important;
            background: transparent !important;`;
const goodCSS = `            mix-blend-mode: screen !important;
            filter: contrast(1.5) brightness(0.9) !important;
            background: transparent !important;`;
html = html.replace(badCSS, goodCSS);

// 2. Fix the state leak in Javascript
const badJS = `if (!effectType || effectType === 'reset') return;`;
const goodJS = `const modal = document.getElementById('playerModal'); modal.style.boxShadow = 'none'; if (!effectType || effectType === 'reset') return;`;

// Only replace if it hasn't been replaced yet
if (html.includes(badJS)) {
    html = html.replace(badJS, goodJS);
}

fs.writeFileSync('index.html', html);
console.log('Fixed CSS border-radius and JS state leak.');
