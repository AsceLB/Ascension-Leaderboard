const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const badCSS = `        img[style*="mix-blend-mode: screen"],
        .tab img,
        .position-circle img,
        .tier-item img,
        .title img,
        #modalOverallIcon {
            mix-blend-mode: screen !important;
            filter: contrast(1.5) brightness(0.9) !important;
            border-radius: 0 !important;
            background: transparent !important;
        }`;

const goodCSS = `        img[style*="mix-blend-mode: screen"],
        .tab img,
        .position-circle img,
        .tier-item img,
        .title img,
        #modalOverallIcon {
            mix-blend-mode: screen !important;
            filter: contrast(1.5) brightness(0.9) !important;
            background: transparent !important;
        }`;

if (html.includes(badCSS)) {
    html = html.replace(badCSS, goodCSS);
    fs.writeFileSync('index.html', html);
    console.log('Fixed border-radius 0.');
} else {
    console.log('Could not find badCSS block.');
}
