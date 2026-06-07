const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const bad = `const modal = document.getElementById('playerModal'); modal.style.boxShadow = 'none'; const modal = document.getElementById('playerModal'); modal.style.boxShadow = 'none'; if (!effectType || effectType === 'reset') return;`;
const good = `const modal = document.getElementById('playerModal'); modal.style.boxShadow = 'none'; if (!effectType || effectType === 'reset') return;`;

html = html.replace(bad, good);

fs.writeFileSync('index.html', html);
console.log('Fixed duplicated JS.');
