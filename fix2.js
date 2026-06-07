const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. CSS
html = html.replace(/background:\s*#111;\s*border:\s*1px solid rgba\(255,\s*255,\s*255,\s*0\.05\);/g, 'background: transparent; border: none;');

// 2. JS
html = html.replace("if (!effectType || effectType === 'reset') return;", "const modal = document.getElementById('playerModal'); modal.style.boxShadow = 'none'; if (!effectType || effectType === 'reset') return;");

fs.writeFileSync('index.html', html);
console.log('Fixed CSS and JS.');
