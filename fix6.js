const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/filter: contrast\(1\.5\) brightness\(0\.9\) !important;\s*border-radius: 0 !important;/g, 'filter: contrast(1.5) brightness(0.9) !important;');

fs.writeFileSync('index.html', html);
console.log('Regex removed border-radius 0.');
