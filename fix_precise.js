const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the old SVG filter with a mathematically precise one
// The JPG icons have background color #161616 = rgb(22,22,22) = 22/255 ≈ 0.0863
// We need to linearly remap [0.0863, 1.0] -> [0.0, 1.0]
// Formula: output = (input - 0.0863) / (1 - 0.0863) = input * 1.0944 - 0.0944
// This precisely zeroes out the #161616 background while preserving bright colors almost perfectly
html = html.replace(
    /<svg width="0" height="0" style="position: absolute; pointer-events: none;">\s*<filter id="remove-img-bg">\s*<feColorMatrix type="matrix" values="\s*1 0 0 0 -0\.09\s*0 1 0 0 -0\.09\s*0 0 1 0 -0\.09\s*0 0 0 1 0\s*" \/>\s*<\/filter>\s*<\/svg>/,
    `<svg width="0" height="0" style="position: absolute; pointer-events: none;">
        <filter id="remove-img-bg" color-interpolation-filters="sRGB">
            <feComponentTransfer>
                <feFuncR type="linear" slope="1.0944" intercept="-0.0944"/>
                <feFuncG type="linear" slope="1.0944" intercept="-0.0944"/>
                <feFuncB type="linear" slope="1.0944" intercept="-0.0944"/>
                <feFuncA type="identity"/>
            </feComponentTransfer>
        </filter>
    </svg>`
);

fs.writeFileSync('index.html', html);
console.log('SVG filter updated successfully.');
