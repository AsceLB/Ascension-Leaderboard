const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Disable particles grab interaction on hover (super laggy)
html = html.replace(/onhover: \{ enable: true, mode: "grab" \}/, 'onhover: { enable: false, mode: "grab" }');

// 2. Remove 3D Holographic Trading Card Tilt JS
const cardTiltStart = html.indexOf('// 3D Holographic Trading Card Tilt');
const cardTiltEnd = html.indexOf('});', html.indexOf('lastHoveredRow3D = row;', cardTiltStart)) + 3;

if (cardTiltStart > -1 && cardTiltEnd > -1) {
    // Find the end of the DOMContentLoaded block
    const fullEnd = html.indexOf('});', cardTiltEnd) + 3;
    html = html.substring(0, cardTiltStart) + html.substring(fullEnd);
    console.log('Removed 3D Card Tilt JS');
} else {
    console.log('Could not find 3D Card Tilt JS bounds');
}

// 3. Remove Logo Magnetic 3D JS
const logoScriptStart = html.indexOf('// --- Magnetic 3D Hover & Idle Effect for Logo & Title ---');
if (logoScriptStart > -1) {
    // find the `<script>` before it
    const scriptTagStart = html.lastIndexOf('<script>', logoScriptStart);
    const scriptTagEnd = html.indexOf('</script>', logoScriptStart) + 9;
    
    if (scriptTagStart > -1 && scriptTagEnd > -1) {
        html = html.substring(0, scriptTagStart) + html.substring(scriptTagEnd);
        console.log('Removed Logo 3D Hover JS');
    }
}

// 4. Update CSS for logo float
const logoCSS = `        .site-logo {
            height: 90px;
            width: auto;
            object-fit: contain; 
            filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.2));
            animation: floatingLogo 4s ease-in-out infinite;
            transition: filter 0.3s ease, transform 0.3s ease;
        }

        .site-logo:hover {
            filter: drop-shadow(0px 5px 15px rgba(0, 229, 255, 0.5));
            transform: scale(1.05) translateY(-5px);
            animation-play-state: paused;
        }

        @keyframes floatingLogo {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }`;

html = html.replace(/\.site-logo \{[\s\S]*?\/\* Animation handled by JS requestAnimationFrame \*\/\s*\}/, logoCSS);

fs.writeFileSync('index.html', html);
console.log('Optimization Phase 2 Complete!');
